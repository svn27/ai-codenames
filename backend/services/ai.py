import gensim.downloader as api
import numpy as np
import random
from typing import List, Tuple


# model = api.load("word2vec-google-news-300")


model = api.load("glove-wiki-gigaword-100")


def ai_spymaster(board: List[str], ai_words: List[str], l: float=0.75) -> Tuple[str, int]:
    board = [word.lower() for word in board]
    ai_words = [word.lower() for word in ai_words]
    
    other_words = list(set(board) - set(ai_words))
    main_word = random.choice(ai_words)  # Selecting an arbitrary word to main for the round
    print("Main word chosen was", main_word)
    ai_words_to_main_words_s = {}

    for word in ai_words:
        if word != main_word:
            ai_words_to_main_words_s[word] = model.similarity(word, main_word)

    keys = list(ai_words_to_main_words_s.keys())
    keys.sort(key=lambda x: ai_words_to_main_words_s[x], reverse=True)

    if len(ai_words) >= 3:
        chosen_ai_words = [main_word, keys[0], keys[1]]
    elif len(ai_words) == 2:
        chosen_ai_words = [main_word, keys[0]]
    else:
        chosen_ai_words = [main_word]

    ai_words_vecs = []

    print("The chosen words are", chosen_ai_words)

    for word in chosen_ai_words:
        if word in model:
            ai_words_vecs.append(model[word])
        else:
            print("How the hell does this dataset not have the word", word + "?!")
            
    other_word_vecs = []
    
    for word in other_words:
        if word in model:
            other_word_vecs.append(model[word])
        else:
            print("How the hell does this dataset not have the word", word + "?!")

    average_vector = np.mean(ai_words_vecs, axis=0)
    average_bad_vector = np.mean(other_word_vecs, axis=0)

    overall_vector = average_vector - (l * average_bad_vector)
    
    optimal_words = model.similar_by_vector(overall_vector, topn=len(ai_words) + 1)
    
    print(optimal_words)

    for word, _ in optimal_words:
        if word not in ai_words:
            return (word, min(len(ai_words), 3))

    return "Uh oh!"


def ai_guesser(board: List[str], guess_word: str, n: int) -> List[str]:
    s = {}
    for word in board:
        s[word] = model.similarity(guess_word, word)

    keys = list(s.keys())
    keys.sort(key=lambda x: s[x], reverse=True)
    return keys[0:n]

# boards = ['PHOENIX',
# 'SERVER',
# 'CASTLE',
# 'HALLOWEEN',
# 'OLIVE',
# 'TRACK',
# 'SWEAT',
# 'BATTLE',
# 'MUMMY',
# 'MAP',
# 'GOLF',
# 'WEREWOLF',
# 'CROW',
# 'BOLT',
# 'LAUNDRY',
# 'DRYER',
# 'BOIL',
# 'COUNTRY',
# 'EGYPT',
# 'FRANCE',
# 'COCONUT',
# 'SWAMP',
# 'BUG',
# 'PUPPET',
# 'SCARECROW']
# boards = [word.lower() for word in boards]
# ai_words = ["halloween", "puppet", "sweat", "egypt", "scarecrow", "france", "bug", "castle"]

# first_word, first_n = ai_spymaster(boards, ai_words, 0.759999999999999909927462830183637829203)
# print(first_word, first_n)
# print(ai_guesser(boards, first_word, first_n))