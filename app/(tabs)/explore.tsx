import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: 'white' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Conteúdos de Matemática</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Álgebra</ThemedText>
        <ThemedText>
          Em Álgebra, são estudadas equações e inequações, incluindo soluções de equações lineares e quadráticas e sistemas de equações, além de polinômios e suas operações, fatoração e raízes. Também se analisa funções, abordando definição, domínio, imagem e tipos diversos como lineares, quadráticas e exponenciais.
        </ThemedText>

        <ThemedText type="subtitle">Geometria</ThemedText>
        <ThemedText>
          A Geometria inclui a planimetria, que estuda figuras planas como triângulos e quadriláteros, a trigonometria, que trata das relações entre ângulos e lados de triângulos e funções trigonométricas, e a geometria analítica, que usa um sistema de coordenadas para estudar figuras geométricas e suas equações.
        </ThemedText>

        <ThemedText type="subtitle">Cálculo</ThemedText>
        <ThemedText>
          O Cálculo abrange derivadas, que medem a taxa de variação instantânea de uma função, integrais, que calculam a área sob a curva de uma função, limites, que descrevem o comportamento de uma função perto de um ponto, e séries, que são somatórias de termos de uma sequência.
        </ThemedText>

        <ThemedText type="subtitle">Probabilidade e Estatística</ThemedText>
        <ThemedText>
          Probabilidade e Estatística envolvem o estudo da incerteza e eventos aleatórios, incluindo espaço amostral e eventos independentes e dependentes, além da estatística descritiva, que coleta, analisa e representa dados, e da estatística inferencial, que lida com estimação e testes de hipóteses e distribuições normais.
        </ThemedText>

        <ThemedText type="subtitle">Álgebra Linear</ThemedText>
        <ThemedText>
          Álgebra Linear foca em vetores e matrizes, suas operações e determinantes, e sistemas lineares. Também inclui o estudo de espaços vetoriais, subespaços, bases e dimensões, e transformações lineares, que são mapeamentos que preservam a estrutura linear entre espaços vetoriais.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#0a7ea4',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
