# SAT Vocabulary Trainer

This Python project is an interactive vocabulary trainer designed to help students prepare for the SAT by mastering vocabulary words across different levels of difficulty. The program presents words at random, asks the user for the definition, and tracks progress by removing known words and repeating unfamiliar ones.

## Features

- **Randomized Questions**: Words are selected randomly from a predefined list.
- **Multiple Difficulty Levels**: Select from multiple levels of SAT vocabulary difficulty.
- **Repetition for Mastery**: Words you get wrong will appear again until you know them.
- **Progress Tracking**: The program keeps track of words you've mastered.

## Getting Started

### Prerequisites

- Python 3.x

### Running the Program

1. Clone the repository:

    ```bash
    git clone https://github.com/hamza-69/sat-vocab.git
    cd sat-vocab
    ```

2. Run the script:

    ```bash
    python vocab_trainer.py
    ```

3. Enter the level you wish to play and start practicing.

4. After being shown a word, you will be asked if you know its meaning. If you answer "yes," the word is removed from the list. If you answer "no," the word will appear again later.

### Example:

```bash
number = 1
```

```text
Abhor
0 / 20
```

```bash
continue: 
```

```text
Abhor
hate
1 / 20
```

```bash
known or not: yes
```

This process will continue until you have mastered all the words in the selected level.

### Future Features

- Add more levels of vocabulary.
- Implement a scoring system to track improvement over time.
- Implement a GUI.

## Contributing

Feel free to fork the repository, submit issues, or create pull requests for any improvements or new features.
