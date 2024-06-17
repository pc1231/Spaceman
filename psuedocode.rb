 psuedocode
 
 wrong guesses and the player loses
 - the player needs to guess the hidden word by guessing letters while having a limit to the number of guesses
 - there is a list that has a certain number of words. A random word will be chosen and the player will have to guess the word
 -Start Game
 word_list ->["robot","armstrong", "astronaut","space"]
 guessed_letters-> []
 SET max_wrong_guesses = 5
 FUNCTION new_game()
    SET Word = Random from word_list
    ADD letter_guessed TO guessed_letter
  SET wrong_guesses to 0
  SET display_word to "_" * Length of word_to_guess
  WHILE wrong_guesses < max_wrong_guessses And display_word Contains "_"
  Display display_word
  Display "Guessed Letters: " + guessed_letters
  Display "Wrong guesses left: " + (max_wrong_guesses - wrong_guesses)
  INPUT guess As character
  If guess on guessed_letters
  Display "YOU already guessed that letter."
  Continue WHILE
   Add guess to guessed_letters
   If guess In word_to_guess
    For each index, letter IN word_to_guess
      FOR each index, Letter IN word_to_guess
      IF letter == guess
       Replace display_word[index] with guess
       Else
        INCREMENT wrong_guesses by 1
      IF display_word DOES NOT CONTAIN "_"
    Display "Congratulations! You've guessed the word:" + word_to_guess
    Else
     Display "Game Over! The word was:" + word_to_guess