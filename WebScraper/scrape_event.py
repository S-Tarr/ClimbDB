from os import read
import unicodedata
from datetime import datetime
from time import sleep
from typing import Iterable

import concurrent.futures
from multiprocessing import Pool

import pickle

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException

from tqdm import tqdm

from event import Event
from climber import Climber
from rank import Rank


NUM_WORKERS = 20

DELAY = 1  # number of seconds to wait until timeout for WebDriverWait
BETWEEN = 0  # number of seconds to wait between separate scrapes

climberIDs = list()

def scrape_result(driver, event_id, result_id) -> list[tuple]:
    """
    Scrapes an IFSC event by event id by selenium, and returns a pandas dataframe of the results.
    Importantly, the standard URL for results does not suffice, and we have to essentially go through another route.
    For competitors that did not move on, we give an NA to those sections.
    :param driver: Selenium driver
    :param event_id: ID of the event, found in URL.
    :param result_id: Second ID of the event, also found in URL.
    :return pd.DataFrame: DataFrame representing the results.
    """
    driver.get(f'https://components.ifsc-climbing.org/result-complete/?event={event_id}&result={result_id}')
    WebDriverWait(driver, DELAY).until(EC.presence_of_element_located((By.ID, 'table_id_wrapper')))
    html = driver.page_source

    return parse_results(html)


def parse_results(html) -> list[tuple[str, ...]]:
    """All rows in the table containing actual competitor data (we currently disregard the header row) have the class
    of either even or odd.
    We look for all <tr/> tags with said class, and then consider each <td/> tag for the row.
    Each entry, if non-empty, is comprised by a <div/> tag.
    Should the entry be non-empty, we then grab the text in the <div/> tag.
    We then store the result as a list of tuples, with the tuples as id, then scores
    """
    data = []  # list of dictionary of rank, first/last name, scores
    soup = BeautifulSoup(html, 'html.parser')
    for row in soup.find_all('tr', class_=['even', 'odd']):
        tds = row.find_all('td')
        rank, first_name, _, _, *scores = [td.find('div') for td in tds]

        # we pretend "do not score" participants did not attend
        if not rank:
            continue

        user_id = first_name.find('a')['href'].split('id=')[1]
        if user_id not in climberIDs: climberIDs.append(user_id)

        scores = ['NA' if not score else unicodedata.normalize('NFKC', score.text.strip()) for score in scores]
        data.append((user_id, *scores))

    return data


def competitor_competitions(driver: webdriver, user_id: int | str) -> list[Event]:
    """
    Given a user_id from the IFSC website, returns a list of all event_ids for the competitions the competitor
    participated in.
    :param driver: Selenium driver
    :param user_id: int or string for the competitor's user_id
    :return: list of ints for the events the competitor participated in
    """
    page = requests.get(f'https://www.ifsc-climbing.org/index.php?option=com_ifsc&task=athlete.display&id={user_id}')
    soup = BeautifulSoup(page.text, 'html.parser')
    events = []
    for event in tqdm(soup.find_all('div', class_='result')):
        datestr = event.find('div', class_='date').text.strip()
        date = datetime.strptime(datestr, '%A, %d %B %Y')
        location = event.find('div', class_='event').getText().strip().split('-')[-1].split(')')[0].strip()
        if location.isnumeric():
            location = event.find('div', class_='event').getText().strip().split('- ')[-2].split(')')[0].strip()
        location += ')'
        event_id, result_id = event.find('a')['href'].split('event=')[1].split('&result=')

        results = scrape_result(driver, event_id, result_id)
        event_type = "Speed"
        if len(results[0]) > 1:
            if 'z' in results[0][1]: 
                event_type = "Boulder"
            elif '[' in results[0][1]:
                event_type = "Lead"

        events.append(Event(event_id, result_id, event_type, location, date, results))
        sleep(BETWEEN)

    return events


def scrape_climber(driver: webdriver, user_id: int | str) -> Climber:  
    """
    Given a user_id from the IFSC website, returns a Climber with specified scraped from the website.
    :param driver: Selenium driver
    :param user_id: int or string for the competitor's user_id
    :return: Climber object with personal info from website
    """
    driver.get(f'https://www.ifsc-climbing.org/index.php?option=com_ifsc&task=athlete.display&id={user_id}')
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    name = soup.find('h1', class_='name').getText()

    agehtml = soup.find('span', class_='age')
    age = agehtml.getText().split(": ")[1]

    homehtml = soup.find('span', class_='hometown')
    hometown = homehtml.getText().split(": ")[1]

    outerheightdiv = soup.find('div', class_='personal-info')
    heighthtml = outerheightdiv.find('p', class_='paragraph')
    height = -1
    if heighthtml:
        heightstr = heighthtml.getText()
        height = [int(s) for s in heightstr.split() if s.isdigit()][0]
    
    return Climber(user_id, name, age, int(height), hometown)




def scrape_climbers(driver: webdriver) -> list[Climber]:
    """
    Get list of climber IDs from pickle file and scrape their personal info.
    :param driver: Selenium driver
    :return: List of Climber objects with personal data from ifsc website
    """
    climbers = list()
    pickle_in = open("climberIDs.pickle","rb")
    climberIDs = pickle.load(pickle_in) 

    for climberID in tqdm(climberIDs):
        climbers.append(scrape_climber(driver, climberID))

    return climbers


def scrape_rankings(driver: webdriver, year: int, category: int, cup: int) -> list[Rank]:
    driver.get(f'https://components.ifsc-climbing.org/ranking-complete/?cup={cup}&category={category}&year={year}')
    WebDriverWait(driver, DELAY).until(EC.presence_of_element_located((By.ID, 'table_id_wrapper')))
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    event_type = ["Lead", "Speed", "Boulder"]

    ranks = []
    for rank in tqdm(soup.find_all('tr', class_=['odd', 'even'])):
        climber_rank = rank.find('p', class_='rank').getText()
        climber_id = rank.find('a')['href'].split('id=')[1]
        points = rank.find_all('p')[-1].getText()
        print(points)
        ranks.append(Rank(climber_id, climber_rank, points, event_type[category - 1], year))
        sleep(BETWEEN)

    return ranks


def get_rankings(driver: webdriver):
    cup = [59, 61, 63, 66]
    years = [2017, 2018, 2019, 2021]
    ranks = []
    for i, year in enumerate(years):
        for category in range(1, 4):
            ranks.append(scrape_rankings(driver, year, category, cup[i]))

    return ranks


def scrape_event(event_range: list[int], type: int):
    driver = setup_driver()
    types = ["", "Lead", "Speed", "Boulder"]
    events = []
    
    for event_id in tqdm(event_range):
        driver.get(f'https://components.ifsc-climbing.org/result-complete/?event={event_id}&result={type}')
        try:
            WebDriverWait(driver, DELAY).until(EC.presence_of_element_located((By.ID, 'table_id_wrapper')))
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')


            # datestr = soup.find('div', class_='date').text.strip()
            # date = datetime.strptime(datestr, '%A, %d %B %Y')
            date = 0
            location = soup.find('h1', class_='event_title').getText().strip().split('-')[-1].split(')')[0].strip()
            if location.isnumeric():
                location = soup.find('h1', class_='event_title').getText().strip().split('- ')[-2].split(')')[0].strip()
            location += ')'
            # _, result_id = soup.find('a')['href'].split('event=')[1].split('&result=')

            results = parse_results(html)
            events.append(Event(event_id, 0, types[type], location, date, results))

        except TimeoutException: 
            continue

    return events


def iterate_events_threading(event_range, type: int):
    # event range 468-1235

    events = []
    # drivers = [setup_driver() for _ in range(NUM_WORKERS)]
    chunked_events = chunks(event_range, NUM_WORKERS)

    with concurrent.futures.ThreadPoolExecutor(max_workers=NUM_WORKERS) as executor:
        future = executor.map(scrape_event, chunked_events, [type for _ in range(NUM_WORKERS)])
        
        events = [event for event in future]
    
    print(events)
    return events


def iterate_events_multproc(event_range, type: int):
    # event range 468-1235

    events = []
    chunked_events = list(chunks(event_range, NUM_WORKERS))
    types_itr = [type for _ in range(NUM_WORKERS)]

    p = Pool(NUM_WORKERS)
    results = p.starmap(scrape_event, [(a, b) for a, b in zip(chunked_events, types_itr)])
    p.terminate()
    p.join()
    
    events = [event for event in results]
    
    print(events)
    return events



def chunks(lst, n):
    """Yield n successive chunks from lst."""
    size = len(lst)//n
    for i in range(0, len(lst), size):
        yield lst[i:i + size]


def setup_driver() -> webdriver:
    options = Options()
    options.add_argument('--headless')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    return driver


if __name__ == '__main__':
    options = Options()
    options.add_argument('--headless')
    iterate_events_threading([event_id for event_id in range(468, 1236)], 3)

    # with webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options) as chrome_driver:
        # UNCOMMENT LINES IF ClimberIDs pickle file has been populated
        # climbers = scrape_climbers(chrome_driver)
        # pickle_out = open("climbers.pickle", "wb")
        # pickle.dump(climbers, pickle_out)
        # pickle_out.close()
        # baileys = competitor_competitions(chrome_driver, 1741)
        # pickle_out = open("events.pickle","wb")
        # pickle.dump(baileys, pickle_out)
        # pickle_out.close()
        # pickle_out = open("climberIDs.pickle", "wb")
        # pickle.dump(climberIDs, pickle_out)
        # pickle_out.close()

        # for bailey_event in baileys:
        #     bailey_event.to_csv()
        # ranks = get_rankings(chrome_driver)
        # pickle_out = open("ranks.pickle", "wb")
        # pickle.dump(ranks, pickle_out)
        # pickle_out.close()

        
    