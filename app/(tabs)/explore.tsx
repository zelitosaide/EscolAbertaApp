import EACard from "@/components/card";
import { Word, loadWords } from "@/utils/spacedRepetition";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const loadedWords = await loadWords();
      setWords(loadedWords.filter(word => word.difficult === true)); // Filtrar palavras marcadas como dificeis
    };
    fetchWords();
  });

  return (
    <View style={styles.container}>
      <EACard index="C" title={`Total de Palavras DESCONHECIDAS: ${words.length}`} />
      {words.length > 0 ? (
        words.map(w => {
          return (
            <View style={{ flexDirection: "row", gap: 5 }} key={w.id}>
              <Text style={{ fontWeight: "900" }}>{w.id} {". "} {w.word.toUpperCase()}</Text>
              <Text>({w.translation})</Text>
            </View>
          );
        })
      ) : null}
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
