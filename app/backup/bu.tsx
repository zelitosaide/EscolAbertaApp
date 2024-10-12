import { Word, loadWords, resetWords, saveWords, updateReviewInterval } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, Text, View } from "react-native";

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

  const handleReset = async () => {
    await resetWords();
    const initialWords = await loadWords();
    setWords(initialWords);
    setCurrentWordIndex(0);
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
          <Button title="Reset Words" onPress={handleReset} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
