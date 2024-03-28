import { StyleSheet, View, Image, SafeAreaView, Platform, ScrollView,Text , Button, Linking, TouchableOpacity, CameraRoll,NativeModules} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function Home() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation(); // Get the navigation object
  let varMyImage = '';
  let varMyVideo = '';

  axios.defaults.baseURL = 'https://online-store-service.onrender.com';

  const getAllItems = async () => {
    const { data } = await axios.get('/api/items');
    return data;
  };

  const {CustomMethods} = NativeModules;

  useEffect(() => {
    getAllItems().then(items => setItems(items));

  }, []);

  const downloadLivePhoto = async () => {
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/digital_file%2FE5712677-FC33-494F-93BB-A525A183C659.HEIC?alt=media&token=2f53a02b-1520-4d40-a9ac-99b5c20b9e0b'; // URL or path to the still image
    const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/digital_file%2FE5712677-FC33-494F-93BB-A525A183C659.MOV?alt=media&token=c9a6bd75-59ac-48e5-900f-4e03dab70270'; // URL or path to the video file

    const imageUri = await saveToCameraRoll(imageUrl,videoUrl);
    // const videoUri = await saveVideo(videoUrl);
  };

  const testNativeModule = () => {
    console.log('call testNativeModule()');
    CustomMethods.MyMethod('this is test');
    console.log('varMyImage='+varMyImage);
    console.log('varMyVideo='+varMyVideo);
    CustomMethods.combineImage(varMyImage, varMyVideo);
    alert('Live photo saved!');
  }

  const saveToCameraRoll = async (image, video) => {
    let cameraPermissions = await MediaLibrary.getPermissionsAsync();
    if (cameraPermissions.status !== 'granted') {
      cameraPermissions = await MediaLibrary.requestPermissionsAsync();
    }

    if (cameraPermissions.status === 'granted') {
      FileSystem.downloadAsync(
        image,
        FileSystem.documentDirectory + 'E5712677-FC33-494F-93BB-A525A183C659.HEIC'
      )
        .then(({ uri }) => {
          console.log('img uri='+uri);
          varMyImage = uri;
          // MediaLibrary.saveToLibraryAsync(uri);
          // alert('Photo Saved to photos');
          saveVideo(video);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Requires camera roll permission');
    }
  };

  const saveVideo = async (video) => {
    let cameraPermissions = await MediaLibrary.getPermissionsAsync();
    if (cameraPermissions.status !== 'granted') {
      cameraPermissions = await MediaLibrary.requestPermissionsAsync();
    }

    if (cameraPermissions.status === 'granted') {
      FileSystem.downloadAsync(
        video,
        FileSystem.documentDirectory + 'E5712677-FC33-494F-93BB-A525A183C659.MOV'
      )
        .then(({ uri }) => {
          console.log('video uri='+uri);
          varMyVideo = uri;
          // MediaLibrary.saveToLibraryAsync(uri);
          testNativeModule();
          // alert('Video Saved to photos');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Requires camera roll permission');
    }
  };

  const handleImagePress = (imageUri) => {
    navigation.navigate('Detail', { imageUri });
  };

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Wallpaper</Text>
      {/* <StatusBar style="auto" /> */}
      <View>
        <Button
          title="Download Live Photo"
          onPress={downloadLivePhoto}
          color={Platform.OS === 'android' ? 'blue' : undefined} // Adjust button color for Android
        />
      </View>

        {items.map((item, index) => (
          // <View key={index} style={styles.itemContainer}>
          //   <Image source={{     uri: item.thumbnail.includes('https') ? item.thumbnail : `https://www.palettex.ca/images/items/${item.itemId}/${item.thumbnail}` }} style={styles.thumbnail} />
          // </View>
          <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => handleImagePress(
            item.thumbnail.includes('https') ? item.thumbnail : `https://www.palettex.ca/images/items/${item.itemId}/${item.thumbnail}`
          )}>
          <Image source={{ uri: item.thumbnail.includes('https') ? item.thumbnail : `https://www.palettex.ca/images/items/${item.itemId}/${item.thumbnail}` }} style={styles.thumbnail} />
        </TouchableOpacity>
        ))}
      </ScrollView>
    // </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // marginTop: Platform.OS === 'android' ? StatusBar.height : 100,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemContainer: {
    width: '50%', // Adjust the width as per your layout
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 9 / 16, // Adjusted to 9:16 ratio
    borderRadius: 10, // Rounded corners for images
  },
  title: {
    fontSize: 25,
  },
});
