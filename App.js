import React, { useState, useEffect } from "react";
import { Alert, StatusBar, StyleSheet, Text, View, TextInput, Button } from "react-native";
import { wordList } from "./words.js";

export default function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [targetWord, setTargetWord] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const wordsArray = wordList;
    setTargetWord(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    setGuesses([]);
    setGuess("");
    setGameOver(false);
  };

  const handleGuess = () => {
    const lowerCaseGuess = guess.toLowerCase();
    if (lowerCaseGuess.length === 5 && wordList.includes(lowerCaseGuess)) {
      const newGuesses = [...guesses, lowerCaseGuess];
      setGuesses(newGuesses);
      setGuess("");

      if (lowerCaseGuess === targetWord) {
        Alert.alert("Congratulations!", "You've guessed the word!", [
          {
            text: "OK",
            onPress: () => {
              resetGame();
            },
          },
        ]);
      } else if (newGuesses.length >= 6) {
        setGameOver(true);
        Alert.alert("Game Over", `The word was: ${targetWord}`, [
          {
            text: "OK",
            onPress: () => {
              resetGame();
            },
          },
        ]);
      }
    } else {
      Alert.alert("Invalid guess", "This word was not found in the list.");
    }
  };

  const getFeedback = (guess) => {
    return guess.split("").map((char, index) => {
      if (char === targetWord[index]) {
        return { char, status: "correct" };
      } else if (targetWord.includes(char)) {
        return { char, status: "misplaced" };
      } else {
        return { char, status: "wrong" };
      }
    });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Wordle Clone</Text>
        <View style={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => (
              <View key={index} style={styles.row}>
                {(guesses[index] || "     ").split("").map((char, i) => {
                  const feedback = guesses[index] ? getFeedback(guesses[index]) : [];
                  return (
                      <View
                          key={i}
                          style={[
                            styles.cell,
                            feedback[i] && feedback[i].status === "correct" && styles.correct,
                            feedback[i] && feedback[i].status === "misplaced" && styles.misplaced,
                            feedback[i] && feedback[i].status === "wrong" && styles.wrong,
                          ]}
                      >
                        <Text style={styles.cellText}>{char.toUpperCase()}</Text>
                      </View>
                  );
                })}
              </View>
          ))}
        </View>
        {!gameOver && (
            <>
              <TextInput
                  style={styles.input}
                  placeholder="Enter your guess"
                  value={guess}
                  onChangeText={setGuess}
                  maxLength={5}
              />
              <Button title="Submit Guess" onPress={handleGuess} />
            </>
        )}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    margin: 2,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 24,
  },
  correct: {
    backgroundColor: "green",
  },
  misplaced: {
    backgroundColor: "yellow",
  },
  wrong: {
    backgroundColor: "gray",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxWidth: 300,
    width: "80%",
  },
});
