import random
from models import BoardWord, Board, Team, GameState, Operative, SpyMaster

with open("words.txt", "r") as f:
    words = f.read().splitlines()

board_words = random.sample(words, k=25)

red_words = [BoardWord(word=w, used=False, role="red") for w in board_words[:9]]
blue_words = [BoardWord(word=w, used=False, role="blue") for w in board_words[9:17]]
neutral_words = [BoardWord(word=w, used=False, role="neutral") for w in board_words[17:24]]
black_word = [BoardWord(word=board_words[24], used=False, role="assassin")]

red_operative = Operative(name="red")
blue_operative = Operative(name="blue")
red_spy_master = SpyMaster(name="red")
blue_spy_master = SpyMaster(name="blue")

red_team = Team(name="red", operative=red_operative, spy_master=red_spy_master)
blue_team = Team(name="blue", operative=blue_operative, spy_master=blue_spy_master)

all_words = red_words + blue_words + neutral_words + black_word
random.shuffle(all_words)

board = Board(words=all_words)
game_state = GameState(board=board, red_team=red_team, blue_team=blue_team, current_team_name="red")

print(game_state.model_dump())