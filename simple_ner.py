import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# Define a function to perform NER on the text and render the entities


def ner(text):
    doc = nlp(text)
    entities = []
    print('starting')
    for ent in doc.ents:
        print('working')
        entities.append((ent.text, ent.label_))
    print('done')
    return entities


sample = 'Google is a large company headquarted in California worth billions of dollars according to this sentence Ayush Basu wrote at 11:48 PM on 5/23/2023'
print(ner(sample))
