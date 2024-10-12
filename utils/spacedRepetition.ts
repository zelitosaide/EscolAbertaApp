import data from "@/db/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Word {
  id: number;
  word: string;
  translation: string;
  familiarity: number;
  nextReview: Date;
  difficult?: boolean;  // Indica se uma palavra foi marcada como fácil
}

export function updateReviewInterval(word: Word, score: number): Word {
  const now = new Date();
  let familiarity = word.familiarity;

  if (score >= 3) {
    familiarity += 1;
    const days = Math.pow(2, familiarity); // Intervalo dobra a cada acerto
    const nextReview = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return { ...word, familiarity, nextReview };
  } else {
    familiarity = Math.max(0, familiarity - 1);
    const nextReview = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // Revisar no próximo dia
    return { ...word, familiarity, nextReview, difficult: true };
  }
}

const STORAGE_KEY = "words";

export async function loadWords(): Promise<Word[]> {
  const storedWords = await AsyncStorage.getItem(STORAGE_KEY);  
  if (storedWords) {
    return JSON.parse(storedWords);
  } else {
    // Se não houver palavras armazenadas, use as palavras iniciais
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
}

export async function saveWords(words: Word[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export async function resetWords(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}