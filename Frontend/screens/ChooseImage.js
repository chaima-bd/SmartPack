import {View, Text, Pressable, Image , StyleSheet, TouchableOpacity} from 'react-native'
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
          const image = await result.assets[0];
         
          if (image) {
             // Convert the image data to base64
             const imageData = await FileSystem.readAsStringAsync(image.uri, { encoding: FileSystem.EncodingType.Base64 });
          //   console.log('ImageData : !!!!!! ', imageData)
           // const imageData = await image.uri.toDataURL();
          //  console.log('Image selected successfully imageData : ', imageData);
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
        // Convert the local file URI to a base64 string
        const imageData = await FileSystem.readAsStringAsync(image.uri, { encoding: FileSystem.EncodingType.Base64 });

        // Send the base64 image data to your Django API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/', {
          image: imageData,
        });
        console.log('wa khdam lah yrdi 3lik ')
  
        if (response.status === 200) {
          console.log('Image uploaded successfully');
          setImage(null);
        } else {
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
    width: "60%" ,
    height: "60%",
    
  },
};
export default ChooseImage