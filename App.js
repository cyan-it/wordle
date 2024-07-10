import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  const handleGuess = () => {
    if (guess.length === 5) {
      setGuesses([...guesses, guess]);
      setGuess("");
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Wordle Clone</Text>
        <View style={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => (
              <View key={index} style={styles.row}>
                {(guesses[index] || "     ").split("").map((char, i) => (
                    <View key={i} style={styles.cell}>
                      <Text style={styles.cellText}>{char.toUpperCase()}</Text>
                    </View>
                ))}
              </View>
          ))}
        </View>
        <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            maxLength={5}
        />
        <Button title="Submit Guess" onPress={handleGuess} />
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
