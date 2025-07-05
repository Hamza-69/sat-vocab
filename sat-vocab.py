import random
import json

def greeting():
    print(f"{'-'*12}Welcome to SAT Vocab!!{'-'*12}\n")

def type_choose():
    while True:
        choice = input("Choose type to revise (v for vocabulary, s for suffixes): ")
        if choice.lower() == "v" or choice.lower() == "s":
            return choice
        elif choice.lower() == "q":
            return "q"
        else:
            print("Please enter either v or s!")

def dictionary_choose(choice):
    while True:
        level = input("What level do you want? (50 vocabulary levels and 14 suffix levels): ")
        if level.isdigit():
            level = int(level)
        elif level == "q":
            return "q"
        else:
            print("Please enter an integer! ")
            continue
        if choice == "v":
            if level > 50 or level < 1:
                print("Please choose a level between 1 and 50!")
                continue
            return f'level{level}'
        elif choice == "s":
            if level > 14 or level < 1:
                print("Please choose a level between 1 and 14!")
                continue
            return f'level{level+50}'

def loop_list(vocab_dictionary):
    vocab_list = list(vocab_dictionary.items())
    wrong_list = []
    while True:
        if not vocab_list:
            break
        random_index = random.randint(0, len(vocab_list) - 1)
        print(f"""
{vocab_list[random_index][0]}
{len(vocab_dictionary) - len(vocab_list)}/{len(vocab_dictionary)}
""")
        if input("continue: ") == "q":
            return "q"
        print(f"""
{vocab_list[random_index][0]} {vocab_list[random_index][1]}
{len(vocab_dictionary) - len(vocab_list)}/{len(vocab_list)}
""")
        choice = input("known or not: ")
        if choice in ["y", "yes", "yeah", "known", ""] and vocab_list[random_index] not in wrong_list:
            vocab_list.pop(random_index)
        elif vocab_list[random_index] in wrong_list:
            wrong_list.remove(vocab_list[random_index])
        elif choice == "q":
            return "q"
        else:
            wrong_list.append(vocab_list[random_index])

def json_load(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def main():
    greeting()
    vocabs = json_load('vocab.json')
    while True:
        type_ = type_choose()
        if type_ == "q":
            break
        else:
            choice = dictionary_choose(type_)
            if choice == "":
                continue
            elif choice == "q":
                break
            elif loop_list(vocabs[choice]) == "q":
                break

if __name__ == "__main__":
    main()
