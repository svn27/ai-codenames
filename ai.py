import gensim.downloader as api
import numpy as np
import random


# model = api.load("word2vec-google-news-300")


model = api.load("glove-wiki-gigaword-100")


def ai_spymaster(ai_words: list[str]):
    main_word = random.choice(
        ai_words
    )  # Selecting an arbitrary word to main for the round
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
        chosen_ai_words[main_word]

    ai_words_vecs = []

    print("The chosen words are", chosen_ai_words)

    for word in chosen_ai_words:
        if word in model:
            ai_words_vecs.append(model[word])
        else:
            print("How the hell does this dataset not have the word", word + "?!")

    average_vector = np.mean(ai_words_vecs, axis=0)
    optimal_words = model.similar_by_vector(average_vector, topn=len(ai_words) + 1)
    print(optimal_words)

    for word, _ in optimal_words:
        if word not in ai_words:
            return (word, min(len(ai_words), 3))

    return "Uh oh!"


def ai_guesser(board, guess_word, n):
    s = {}

    for word in board:
        s[word] = model.similarity(guess_word, word)

    keys = list(s.keys())
    keys.sort(key=lambda x: s[x], reverse=True)

    return keys[0:n]


ai_words = [
    "pool",
    "day",
    "orange",
    "joker",
    "bark",
    "glacier",
    "kick",
    "flood",
    "forest",
]
ai_words2 = ["beach", "sun"]

print(ai_spymaster(ai_words))
