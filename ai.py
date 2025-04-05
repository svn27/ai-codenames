import spacy

nlp = spacy.load("en_core_web_lg")

def similarity(word1, word2):
    return word1.similarity(word2)

def ai_guesser(board, guess_word, n):
    guess_word = nlp(guess_word)
    s = {}
    
    for word in board:
        s[word] = similarity(guess_word, nlp(word))
    
    keys = list(s.keys())
    keys.sort(key = lambda x: s[x], reverse=True) 
    
    return keys[0:n]
        
words = [
    "apple",
    "cat",
    "america",
    "mexico",
    "aeroplane",
    "food",
    "orange",
    "whiteboard",
    "bird"
]

print(ai_guesser(words, "eagle", 2))