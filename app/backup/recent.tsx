import { Word, loadWords, resetWords, saveWords, updateReviewInterval } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <WordScreen />
    </SafeAreaView>
  );
}

function WordScreen() {
  const [words, setWords] = useState<Word[]>([]);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const fetchWords = async () => {
      const loadedWords = await loadWords();
      setWords(loadedWords.filter(word => new Date(word.nextReview) <= new Date())); // Filtrar palavras a serem revisadas
    };

    fetchWords();
  }, []);

  const handleKnowWord = () => {
    const updatedWord = updateReviewInterval(words[currentWordIndex], 3);
    updateWords(updatedWord);
  };

  const handleDontKnowWord = () => {
    const updatedWord = updateReviewInterval(words[currentWordIndex], 0);
    updateWords(updatedWord);
  };

  const updateWords = (updatedWord: Word) => {
    const updatedWords = words.map(word => (word.id === updatedWord.id ? updatedWord : word));
    setWords(updatedWords);
    saveWords(updatedWords);
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      Alert.alert("Fim das palavras para revisar!");
      setCurrentWordIndex(0);
    }
  };

  // const handleReset = async () => {
  //   await resetWords();
  //   const initialWords = await loadWords();
  //   setWords(initialWords);
  //   setCurrentWordIndex(0);
  // };



  const [activeButton, setActiveButton] = useState(null); // Controla qual botão está ativo

  const handlePressIn = (buttonIndex) => {
    setActiveButton(buttonIndex); // Quando o botão é pressionado
  };

  const handlePressOut = () => {
    setActiveButton(null); // Quando o botão é solto
  };

  return (
    <View>
      {words.length > 0 ? (
        <>
          <Text>{words[currentWordIndex].id}</Text>
          <Text>{words[currentWordIndex].word}</Text>
          <Text>{words[currentWordIndex].translation}</Text>
          <Button title="Conheço" onPress={handleKnowWord} />
          <Button title="Não conheço" onPress={handleDontKnowWord} />
          {/* <Button title="Reset Words" onPress={handleReset} /> */}
         
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.button, activeButton === 1 && styles.buttonActive]} // Aplica o estilo ativo se o botão for pressionado
              onPressIn={() => handlePressIn(1)}
              onPressOut={handlePressOut}
              activeOpacity={1}
            >
              <Text style={styles.answerNumber}>1</Text>
              <Text style={styles.answerChoice}>Mi abu posee ocho restoráns.</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, activeButton === 2 && styles.buttonActive]}
              onPressIn={() => handlePressIn(2)}
              onPressOut={handlePressOut}
              activeOpacity={1}
            >
              <Text style={styles.answerNumber}>2</Text>
              <Text style={styles.answerChoice}>Mi abuelo tiene dos restaurantes.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, activeButton === 3 && styles.buttonActive]}
              onPressIn={() => handlePressIn(3)}
              onPressOut={handlePressOut}
              activeOpacity={1}
            >
              <Text style={styles.answerNumber}>3</Text>
              <Text style={styles.answerChoice}>Mi abue dos sándwiches tiene.</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderBottomWidth: 6,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    // transition: 'all 0.1s',
  },
  buttonActive: {
    backgroundColor: '#ddf4ff',
    borderColor: '#1cb0f6',
    borderBottomWidth: 2,
  },
  answerNumber: {
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  answerChoice: {
    fontSize: 19,
    color: '#4b4b4b',
    textAlign: 'center',
    flex: 1,
  },
});

