alpha = 10
K = 32

def expected(rating_A: float, rating_B: float) -> float:
    return 1 / (1 + pow(10, (rating_B - rating_A) / 400))


def expected_multiple(place: float, num_competitors: float) -> float:
    return (pow(alpha, (num_competitors - place)) - 1) / ((pow(alpha, (num_competitors - i))) for i in range(num_competitors))


def calculate_k_factor(num_comps_total: float) -> float:
    return 800 / num_comps_total


def update_score(rating_A: float, rating_B: float, player_rating: float, player_comp_total: float) -> float:
    return player_rating + calculate_k_factor(player_comp_total) * (rating_A - expected(rating_A, rating_B))


def update_multiple(rating: float, num_competitors, place: float) -> float:
        return rating + 32 * (num_competitors - 1) * (((num_competitors - place + 1) / num_competitors) - expected_multiple(rating, num_competitors))

