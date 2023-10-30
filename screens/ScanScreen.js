import { View, Text, StyleSheet, Image, Pressable} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import React, { useState, useEffect, useRef }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button';

import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';


const ScanScreen = ({ navigation }) => {

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
        setIsCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef && isCameraReady) {
          try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
          } catch (error) {
            console.log(error);
          }
        }
    };

    const savePicture = async () => {
        if (image) {
          try {
            const asset = await MediaLibrary.createAssetAsync(image);
            alert('Picture saved!');
            setImage(null);
            console.log('saved successfully');
            navigation.navigate('CommandDetails', { imageUri: asset.uri });
          
          } catch (error) {
            console.log(error);
          }
        }
      };

      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>
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
</SafeAreaView>
    )

}
export default ScanScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop : -50,
    },
    logo: {
      width: 120, // Adjust the width and height as needed
      height: 120, // Adjust the width and height as needed
    },
    content : {
        flex:1,
        justifyContent :'center',
    },
    camera: {
        flex: 5,
        borderRadius: 20,
    },

    listHeader: {
        fontSize:20,
        marginTop:20,
    },

    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1, // Ensure the button appears above other components
    },
    topControls: {
        flex: 1,
    },
  });
