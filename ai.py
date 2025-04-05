import spacy

nlp = spacy.load("en_core_web_lg")


def similarity(word1, word2):
    return word1.similarity(word2)


words = [
    "apple",
    "cat",
    "america",
    "mexico",
    "aeroplane",
    "food",
    "orange",
    "whiteboard",
]

key = nlp("animal")

for word in words:
    print("animal", word, similarity(key, nlp(word)))
