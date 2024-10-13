import EAButton from "@/components/button";
import EACard from "@/components/card";
import { Word, loadDifficultWords, resetDifficultWords } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
      <EAButton index="A" title="Reset Difficult Words" handlePress={handleResetDifficultWords} />

      <EACard index="C" title={`Total de Palavras DESCONHECIDAS: ${difficultWords.length}`} />
      {difficultWords.length > 0 ? (
        difficultWords.map(w => {
          return (
            <View style={{ flexDirection: "row", gap: 5 }} key={w.id}>
              <Text style={{ fontWeight: "900" }}>{w.id} {". "} {w.word.toUpperCase()}</Text>
              <Text>({w.translation})</Text>
            </View>
          );
        })
      ) : null}
    </ScrollView>
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
