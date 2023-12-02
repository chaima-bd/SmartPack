import { StyleSheet, Text, View, Image } from 'react-native'

//////////////////
import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';
import * as MediaLibrary from 'expo-media-library';
//import ExtractedText from './ExtractedText'; 
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function CamPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const onCameraReady = () => {
    console.log('Camera is ready');
    setIsCameraReady(true);
  };
  

  const takePicture = async () => {
    if (cameraRef && isCameraReady) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('Picture taken:', data);
        if (data.uri) {
          setImage(data.uri);
         // savePicture(); 
        } else {
          console.error('No URI in the picture data.');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      console.warn('Camera not ready yet.');
    }
  };
  
  

  const uploadImage = async () => {
    if (image) {
      try {
        const imageData = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const response = await axios.post('http://localhost:8000/api/upload', {
          //image: imageData,
          image: 'data:image/jpeg;base64,${imageData}',
        });
  
        if (response.status === 200) {
          console.log('Image uploaded successfully');
          setImage(null);
        } else {
          console.error('Error uploading image:', response.data);
        }
      } catch (error) {
        console.error('Error sending image to server:', error);
      }
    } else {
      console.log('Image is undefined');
    }
  };
  
  
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        console.log('saved successfully', asset);
       // await uploadImage();
      //  setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////

//   const uploadImage = async (title, image) => {
//     console.log('start upload')
//     const formData = new FormData();
//     formData.append('title', title);
//     console.log()
//     formData.append('image_url', {
//         uri: image.uri,
//         type: 'image/jpeg', // or the actual mime type of the image
//         name: 'image.jpg',
//     });

//     try {
//         const response = await fetch('http://localhost:8000/api/upload', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         if (response.ok) {
//             console.log('Image uploaded successfully');
//         } else {
//             console.error('Failed to upload image');
//         }
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// };
  /////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={['your_color1', 'your_color2']}
    >
      <View style={styles.container}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={flash}
            onCameraReady={onCameraReady} // Wait for 'onCameraReady' event
          >
  <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}

<View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
     </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});

