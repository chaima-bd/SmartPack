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
      if (!result.canceled) {
        const image = result.assets[0];
        console.log(result)
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
      // Assuming 'image' is a file input, and you can access the file directly
      let imageFile = image;
      console.log(imageFile)
      const response = await fetch(image.uri);
      const blob = await response.blob();
  
      // Create a File from the Blob
      const file = new File([blob], "image.jpg", { type: blob.type });
  
      let formData = new FormData();
      formData.append('image', file);
      const Uploadresponse = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/posts/',
        //url: 'http://127.0.0.1:8000/api/ocr_process/',
        data: formData,
        headers: {

          'Content-Type': 'multipart/form-data'
        }

      });
      console.log("1");

      if (Uploadresponse.status === 201) {
        console.log('Image uploaded successfully');
        // Handle the server response
        if (Uploadresponse.data.status === 'success') {
            console.log('Table data:', Uploadresponse.data.table_data);
            setTableData(Uploadresponse.data.table_data);
        } else {
          console.error('Error processing text:', Uploadresponse.data.message);
        }
        // Assuming setImage is a function to update the image state
        setImage(null);
      } else {
        console.log('status', Uploadresponse.status);
        console.error('Error uploading image:', Uploadresponse.data);
      }

    } catch (error) {
      console.info(error);
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
      <View style={{ flex: 1 }}>


        <View style={{
          paddingHorizontal: 22,
          position: "absolute",
          top: 100,
          width: "100%"
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
    width: "60%",
    height: "60%",

  },
};
export default ChooseImage