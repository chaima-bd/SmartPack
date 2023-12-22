import { View, Text, Pressable, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
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
      });

      if (!result.cancelled) {
        const selectedImage = result.uri;
        setImage(selectedImage);
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
      const formData = new FormData();
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('image', {
        uri: image,
        name: filename,
        type,
      });

      const response = await axios.post('http://localhost:8000/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Image uploaded successfully');
        setImage(null);
      } else {
        console.log('Status:', response.status);
        console.error('Error uploading image:', response.data);
      }
    } catch (error) {
      console.error('Error sending image to server:', error);
    }
  };

  
   console.log('valeure de image ', image)
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