import EAButton from "@/components/button";
import EACard from "@/components/card";
import { Word, loadWords, resetWords, saveWords, updateReviewInterval } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState(false);

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
    setShowTranslation(false);
  };

  const handleDontKnowWord = () => {
    // console.log("index", words[currentWordIndex].id)
    const updatedWord = updateReviewInterval(words[currentWordIndex], 0);
    updateWords(updatedWord);
    setShowTranslation(false);
  };

  const updateWords = (updatedWord: Word) => {
    const updatedWords = words.map(word => (word.id === updatedWord.id ? updatedWord : word));
    setWords(updatedWords);
    saveWords(updatedWords);
    nextWord();
  };

  console.log(currentWordIndex, words.length - 1);

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
    <View style={styles.container}>
      <EAButton index="A" title="Reset Words" handlePress={handleReset} />

      {words.length > 0 ? (
        <>
          {/* Statistics */}
          <EACard index="B" title={`Total de Palavras aprendidas: ${words[currentWordIndex].id}`} />
          <EACard index="C" title={`Total de Palavras NÃO aprendidas: ${3000 - words[currentWordIndex].id}`} />
        
          {/* Flashcards */}
          <EACard index={`W${words[currentWordIndex].id}`} title={words[currentWordIndex].word.toUpperCase()} />
          {showTranslation && (
            <EACard index={`T${words[currentWordIndex].id}`} title={words[currentWordIndex].translation.toUpperCase()} />
          )}

          {/* Buttons */}
          <EAButton index={1} title="Mostrar tradução" handlePress={() => setShowTranslation(true)} />
          <EAButton index={2} title="Conheço" handlePress={handleKnowWord} />
          <EAButton index={3} title="Não conheço" handlePress={handleDontKnowWord} />
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
    paddingTop: 80,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});