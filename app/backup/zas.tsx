import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const App = () => {
  const [activeButton, setActiveButton] = useState(null); // Controla qual botão está ativo
  const animations = useRef([new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]).current; // Referências para animação dos botões

  const handlePressIn = (buttonIndex) => {
    setActiveButton(buttonIndex); // Quando o botão é pressionado

    // Animação para botão ativo
    Animated.timing(animations[buttonIndex - 1], {
      toValue: 0.95, // Reduz o tamanho
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setActiveButton(null); // Quando o botão é solto

    // Animação para restaurar o tamanho original
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1, // Retorna ao tamanho original
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {['Mi abu posee ocho restoráns.', 'Mi abuelo tiene dos restaurantes.', 'Mi abue dos sándwiches tiene.'].map((choice, index) => (
        <Animated.View key={index} style={{ transform: [{ scale: animations[index] }] }}>
          <TouchableOpacity
            style={[styles.button, activeButton === index + 1 && styles.buttonActive]} // Aplica o estilo ativo se o botão for pressionado
            onPressIn={() => handlePressIn(index + 1)}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <Text style={styles.answerNumber}>{index + 1}</Text>
            <Text style={styles.answerChoice}>{choice}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderBottomWidth: 6,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    // Note que a transição é gerida pelo Animated, não é necessário o CSS transition aqui.
  },
  buttonActive: {
    backgroundColor: '#ddf4ff',
    borderColor: '#1cb0f6',
    borderBottomWidth: 2,
  },
  answerNumber: {
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  answerChoice: {
    fontSize: 19,
    color: '#4b4b4b',
    textAlign: 'center',
    flex: 1,
  },
});

export default App;