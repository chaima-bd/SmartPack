import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import { detectFromUri } from 'rn-text-detector';
import COLORS from '../constants/colors';
import TextRecognition from 'react-native-text-recognition';
import * as FileSystem from 'expo-file-system';


const ExtractedText = ({ route }) => {
  const { imageUri } = route.params;
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectText = async () => {
      try {
        const localUri = await FileSystem.copyAsync({
          from: imageUri,
          to: `${FileSystem.cacheDirectory}tempImage.jpg`,
        });

       // console.log('Image URI:', imageUri);
       // const visionResp = await detectFromUri(imageUri);
        //const visionResp = await TextRecognition.recognize(imageUri);
      //  console.log(visionResp);
      const visionResp = await TextRecognition.recognize(localUri);
      console.log(visionResp);

        
        if (visionResp && visionResp.length > 0) {
          const extractedText = visionResp.map(block => block.value).join(' ');
          setExtractedText(extractedText); // Set the extracted text to the state
          setLoading(false); // Set loading to false when text is extracted
        } else {
          setExtractedText('No text detected'); // Set a message if no text is detected
          setLoading(false); // Set loading to false
        }
      } catch (e) {
        //console.warn(e);
        console.warn('Error detecting text:', e);
        setExtractedText('Error detecting text'); // Set an error message in case of an error
        setLoading(false); // Set loading to false
      }
    };

    detectText(); // Call the detectText function
  }, [imageUri]);


  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color={COLORS.primary} />
        ) : (
          <Text>{extractedText}</Text>
        )}

      </View>
    </LinearGradient>
  );
};

export default ExtractedText;
