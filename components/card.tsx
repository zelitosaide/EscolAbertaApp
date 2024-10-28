import { StyleSheet, Text, View } from "react-native";

interface EACardProps {
  index: string | number,
  title: string;
}

export default function EACard({ index, title }: EACardProps) {  
  return (
    <View style={styles.card}>
      {/* <Text style={styles.index}>{index}</Text> */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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