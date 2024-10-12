import { Word, loadWords, resetWords, saveWords, updateReviewInterval } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [timer, setTimer] = useState(5); // Timer inicial em segundos para exibir a tradução

  useEffect(() => {
    (async () => {
      const loadedWords = await loadWords();
      setWords(loadedWords);
    })();
  }, []);

  useEffect(() => {
    // Timer decrescente para mostrar a tradução
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setShowTranslation(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentWordIndex]);

  const handleNextWord = () => {
    setShowTranslation(false);
    setTimer(5); // Reinicia o timer para a próxima palavra
    setCurrentWordIndex((prevIndex) =>
      prevIndex === words.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleReview = (score: number) => {
    const updatedWord = updateReviewInterval(words[currentWordIndex], score);
    const updatedWords = [...words];
    updatedWords[currentWordIndex] = updatedWord;
    setWords(updatedWords);
    saveWords(updatedWords);
    handleNextWord();
  };

  const handleReset = async () => {
    await resetWords();
    const initialWords = await loadWords();
    setWords(initialWords);
    setCurrentWordIndex(0);
    setShowTranslation(false);
    setTimer(5);
  };

  const currentWord = words[currentWordIndex];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Memorization App</Text>
      {currentWord && (
        <>
          <Text style={{ fontSize: 30 }}>{currentWord.word}</Text>
          <Text style={{ fontSize: 18, color: "gray" }}>Time left: {timer}s</Text>
          {showTranslation && (
            <Text style={{ fontSize: 20, color: "blue" }}>{currentWord.translation}</Text>
          )}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Button title="Forgot" onPress={() => handleReview(1)} />
            <Button title="Hard" onPress={() => handleReview(2)} />
            <Button title="Good" onPress={() => handleReview(3)} />
            <Button title="Easy" onPress={() => handleReview(4)} />
          </View>
        </>
      )}
      <Button title="Reset Words" onPress={handleReset} />
    </View>
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
