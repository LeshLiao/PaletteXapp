import {Button,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function Menu(){
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ['Watch Ads', 'Go Premium', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 1:
          console.log('Watch Ads');
          break;

        case destructiveButtonIndex:
          console.log('Go Premium');
          break;

        case cancelButtonIndex:
          console.log('Cancel');
      }});
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={require('./images/cloud_download.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});