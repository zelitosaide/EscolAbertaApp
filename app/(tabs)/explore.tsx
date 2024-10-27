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
      <View style={{ paddingTop: 80 }}>
        <EAButton index="A" title="Reiniciar palavras difíceis" handlePress={handleResetDifficultWords} />
      </View>

      <EACard index="C" title={`Total de Palavras DESCONHECIDAS: ${difficultWords.length}`} />
      {difficultWords.length > 0 ? (
        difficultWords.map(w => {
          return (
            <View style={{ flexDirection: "row", gap: 5 }} key={w.id}>
              <Text style={{ fontWeight: "900" }}>{w.id}{". "}{w.word.toUpperCase()}</Text>
              <Text>({w.translation}) {w.examples && "😎"}</Text>
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
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
