import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: 'white' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Conteúdos de Física</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Mecânica</ThemedText>
        <ThemedText>
          <ThemedText>
            Cinemática: Estudo do movimento sem considerar suas causas. Inclui conceitos de velocidade, aceleração, deslocamento e tempo.
          </ThemedText>
          <ThemedText>
            Dinâmica: Estudo das causas do movimento. Inclui as Leis de Newton:
            <ThemedText>
              <ThemedText>Primeira Lei: Lei da Inércia.</ThemedText>
              <ThemedText>Segunda Lei: F = ma (Força é igual à massa vezes a aceleração).</ThemedText>
              <ThemedText>Terceira Lei: Ação e reação.</ThemedText>
            </ThemedText>
          </ThemedText>
          <ThemedText>
            Trabalho e Energia: Trabalho é a força aplicada sobre um objeto ao longo de uma distância. Energia cinética, potencial e conservação da energia.
          </ThemedText>
          <ThemedText>
            Momentum: Produto da massa e velocidade de um objeto. Conservação do momento linear.
          </ThemedText>
        </ThemedText>

        <ThemedText type="subtitle">Termodinâmica</ThemedText>
        <ThemedText>
          A Termodinâmica envolve o estudo da temperatura e do calor, que são medidas da energia cinética média das partículas e a transferência de energia térmica, respectivamente. As leis da Termodinâmica incluem a conservação da energia, a tendência da entropia de um sistema isolado aumentar, e a definição de entropia zero para um cristal perfeito a zero absoluto.
        </ThemedText>

        <ThemedText type="subtitle">Eletromagnetismo</ThemedText>
        <ThemedText>
          No Eletromagnetismo, estudam-se os campos elétricos e magnéticos gerados por cargas elétricas e correntes. As Leis de Maxwell descrevem o comportamento desses campos, e a análise de circuitos elétricos envolve componentes como resistores, capacitores e indutores.
        </ThemedText>

        <ThemedText type="subtitle">Óptica</ThemedText>
        <ThemedText>
          A Óptica aborda o comportamento da luz, incluindo a reflexão e refração, e fenômenos como a interferência e difração resultantes da natureza ondulatória da luz.
        </ThemedText>

        <ThemedText type="subtitle">Física Moderna</ThemedText>
        <ThemedText>
          Por fim, a Física Moderna inclui a Teoria da Relatividade, que postula que o tempo e o espaço são relativos e descreve a gravidade como curvatura do espaço-tempo, e a Mecânica Quântica, que estuda partículas em escalas atômicas e subatômicas, incorporando princípios de incerteza e a dualidade onda-partícula.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
