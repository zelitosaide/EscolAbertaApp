import EAButton from "@/components/button";
import EACard from "@/components/card";
import EAItem from "@/components/item";
import { Word, loadDifficultWords, resetDifficultWords } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FilteredList() {
  const [difficultWords, setDifficultWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchDifficultWords = async () => {
      const loadedDifficultWords = await loadDifficultWords();
      setDifficultWords(loadedDifficultWords);
    };
    fetchDifficultWords();
  });

  // Example button to trigger the reset
  const handleResetDifficultWords = async () => {
    await resetDifficultWords(); // Reset the difficult words
    setDifficultWords([]); // Clear the state as well
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingTop: 80 }}>
        <EAButton index="A" title="Reiniciar palavras difíceis" handlePress={handleResetDifficultWords} />
      </View>

      <EACard index="C" title={`Total de Palavras DESCONHECIDAS: ${difficultWords.length}`} />

      {difficultWords.length > 0 ? (
        difficultWords.map(w => {
          const text = `${w.id}. ${w.word.toUpperCase()} (${w.translation}) ${w.examples ? "😎": ""}`;
          const examples = w.examples ? w.examples.map((ex, i, arr) => {
            return `${i + 1}. ${ex}\n`;
          }).join("") : "Não tem exemplos ainda 🥺";

          console.log({ examples });

          return (
            <EAItem 
              key={w.id} 
              text={text}
              onPress={function() {
                Alert.alert("Exemplos", examples);
              }}
            />
          );
        })
      ) : null}
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
