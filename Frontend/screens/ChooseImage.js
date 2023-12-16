import { View, Text, Pressable, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
////////////
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { async } from 'q';
//import { ImagePicker } from 'react-native-image-picker';

import Button from '../components/Button';

const ChooseImage = ({ navigation }) => {

  const [image, setImage] = useState(null);

  const handleImageSelection = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,

      });
      // console.log('Image selected ', result)
      console.log('                            ')
      if (!result.canceled) {
        const image = result.assets[0];

        if (image) {
          setImage(image);
        }

      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }
    try {
      // Send the base64 image data to your Django API endpoint
      //const response = await axios.post('http://10.0.2.2:8000/api/posts', {
      //  data: image,
      //});

      let localUri = image.uri;

      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });

      const response = await axios({
        method: 'POST',
        url: 'http://10.0.2.2:8000/api/posts/',
        data: formData,
        headers: {
          //'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        console.log('Image uploaded successfully');
        setImage(null);
      } else {
        console.log('status', response.status)
        console.error('Error uploading image:', response.data);
      }

    } catch (error) {
      console.error('Error sending image to server:', error);
    }
  };

  // console.log('valeure de image ', image)
  // console.log('la valeure de image.uri', image.uri)

  return (

    <LinearGradient
      style={{
        flex: 1
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >

      <View style={{ flex: 1}}>
        <View style={{
          paddingHorizontal: 20,
          position: "absolute",
          top: 50,
          height: "100%",
          width: "100%", 
          alignItems: 'center' 

        }}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Text>No image selected</Text>
          )}

          <Text style={{
            fontSize: 25,
            fontWeight: 800,
            color: COLORS.white
          }}>Choose an Image!</Text>

          <Button
            title="From Your Phone"
            onPress={handleImageSelection}
            style={{
              marginTop: 22,
              width: "100%"
            }}
          />
          <Button
            title="upload"
            onPress={handleImageUpload}
            style={{
              marginTop: 22,
              width: "100%"
            }}
          />
          <Button
            title="Take Pic"
            onPress={() => navigation.navigate("CamPage")}

            style={{
              marginTop: 22,
              width: "100%"
            }}
          />

        </View>
      </View>
    </LinearGradient>

  )
}
const styles = {
  image: {
    width: "40%",
    height: "40%",

  },
};
export default ChooseImage