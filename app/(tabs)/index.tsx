import EAButton from "@/components/button";
import EACard from "@/components/card";
import { Word, loadDifficultWords, loadWords, resetWords, saveWords, updateReviewInterval, saveDifficultWords } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

const TOTAL_WORDS = 3000;

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
    const updatedWord = updateReviewInterval(words[currentWordIndex], 0);
    updateWords(updatedWord);
    setShowTranslation(false);
  };

  // Update both lists (all words and difficult words)
  const updateWords = async (updatedWord: Word) => {
    const updatedWords = words.map(word =>
      word.id === updatedWord.id ? updatedWord : word
    );
    setWords(updatedWords);
    await saveWords(updatedWords);

    if (updatedWord.difficult) {
      let difficultWords = await loadDifficultWords();
      const isAlreadyDifficult = difficultWords.some(word => word.id === updatedWord.id);

      if (!isAlreadyDifficult) {
        difficultWords.push(updatedWord);
        await saveDifficultWords(difficultWords);
      }
    }

    nextWord(); // Move to the next word
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      Alert.alert("Fim das palavras para revisar!");
      // setCurrentWordIndex(0);
    }
  };

  const handleReset = async () => {
    await resetWords();
    const initialWords = await loadWords();
    setWords(initialWords);
    setCurrentWordIndex(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingTop: 80 }}>
        <EAButton index="A" title="Reiniciar palavras" handlePress={handleReset} />
      </View>

      {words.length > 0 ? (
        <>
          {/* Statistics */}
          <EACard index="B" title={`Total de Palavras aprendidas: ${currentWordIndex < words.length - 1 ? words[currentWordIndex].id : TOTAL_WORDS}`} />
          <EACard index="C" title={`Total de Palavras NÃO aprendidas: ${currentWordIndex < words.length - 1 ? TOTAL_WORDS - words[currentWordIndex].id : 0}`} />
        
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
        <Text style={{ textAlign: "center" }}>RESET THE WORDS</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});