import random
import json

def greeting():
    print(f"{'-'*12}Welcome to SAT Vocab!!{'-'*12}\n")
    
def type_choose():
    while True:
        choice = input("Choose type to revise (vocabulary, suffixes): ")
        if choice.lower() == "vocabulary":
            return True
        elif choice.lower() == "suffixes":
            return False
        else:
            print("Please enter either vocabulary or suffixes!")
            
def dictionary_choose(choice):
    level = int(input("What level do you want? "))
    if choice:
        return f'level{level}'
    else:
        return f'level{level+50}'
    
def loop_list(vocab_dictionary):
    vocab_list = list(vocab_dictionary.items())
    wrong_list = []
    while True:
        random_index = random.randint(0, len(vocab_list)-1)
        print(f'''
        {vocab_list[random_index][0]}
        {len(vocab_dictionary)-len(vocab_list)} / {len(vocab_dictionary)}
        ''')
        input("continue: ")
        print(f'''
            {vocab_list[random_index][0]}
            {vocab_list[random_index][1]}
            {len(vocab_dictionary) - len(vocab_list)} / {len(vocab_list)}
            ''')
        choice = input("known or not: ")
        if choice in ["y", "yes", "yeah", "known", ""] and vocab_list[random_index] not in wrong_list:
            vocab_list.remove(vocab_list[random_index])
        elif vocab_list[random_index] in wrong_list:
            wrong_list.remove(vocab_list[random_index])
        else:
            wrong_list.append(vocab_list[random_index])
        if len(vocab_list) == 0:
            break

def json_load(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def main():
    greeting()
    vocabs = json_load('vocab.json')
    while True:
        loop_list(vocabs[dictionary_choose(type_choose())])

if __name__ == "__main__":
    main()