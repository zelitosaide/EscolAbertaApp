import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface EAItemProps {
  // children: ReactNode;
  text: string;
  onPress: () => void;
}

export default function EAItem({ text, onPress }: EAItemProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={1}
      onPress={onPress}
    >
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1cb0f6',
    borderBottomWidth: 6,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ddf4ff',
  },
  buttonActive: {
    backgroundColor: '#ddf4ff',
    borderColor: '#1cb0f6',
    borderBottomWidth: 2,
  },
  index: {
    borderWidth: 2,
    borderColor: '#1cb0f6',
    borderRadius: 8,
    minWidth: 30, 
    paddingHorizontal: 5, 
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 19,
    color: '#4b4b4b',
    textAlign: 'center',
    flex: 1,
  },
});