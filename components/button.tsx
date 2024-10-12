import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface EAButtonProps {
  index: string | number,
  title: string; // The text displayed on the button
  handlePress: () => void; // Function to be called when the button is pressed
}

export default function EAButton({ index, title, handlePress }: EAButtonProps) {
  const [activeButton, setActiveButton] = useState(false);

  function handlePressIn() {
    setActiveButton(true);
  }

  function handlePressOut() {
    setActiveButton(false);
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.button, activeButton && styles.buttonActive]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Text style={styles.answerNumber}>{index}</Text>
      <Text style={styles.answerChoice}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    // transition: 'all 0.1s',
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