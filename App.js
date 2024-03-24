import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Platform, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [items, setItems] = useState([]);
  axios.defaults.baseURL = 'https://online-store-service.onrender.com';

  const getAllItems = async () => {
    const { data } = await axios.get('/api/items');
    return data;
  };

  useEffect(() => {
    getAllItems().then(items => setItems(items));

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{     uri: item.thumbnail.includes('https') ? item.thumbnail : `https://www.palettex.ca/images/items/${item.itemId}/${item.thumbnail}` }} style={styles.thumbnail} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? StatusBar.height : 100,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemContainer: {
    width: '49%', // Adjust the width as per your layout
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 9 / 16, // Adjusted to 9:16 ratio
    borderRadius: 10, // Rounded corners for images
  },
});
