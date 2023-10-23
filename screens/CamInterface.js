import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from "expo-linear-gradient";
//import { async } from 'q';

const CamInterface = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState([]);

    const pickImage = async () => {

        try {
            let result = await ImagePicker.launchImageLibraryAsync({

                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        } catch (error) {
            console.log('Error', error)
        };
    }
    /////////////////////////::
    const analyzeImage = async () => {
        try {
            if (!imageUri) {
                alert('Please select an image first!!');
                return;
            }
            // replace your google cloud vision api key with your actual API key
            const apikey = "AIzaSyCxdrHF5jahLZ_bdj6vt3YjNoRYmNcUPsY";
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apikey}`;
            // read the image file from local URI and convert it to base64
            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
                    },
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);
            console.log('API Response:', apiResponse.data); // Check the structure of the response
            //setLabels(apiResponse.data.responses[0].labelAnnotations || []); // Use an empty array as fallback
            setLabels(apiResponse.data.responses[0].labelAnnotations);
        } catch (error) {
            console.error('Error analyzing image: ', error);
            alert('Error analyzing image. Please try again later');
        }
    };


    return (
        <LinearGradient
            style={{
                flex: 1
            }}
        //colors={[COLORS.secondary, COLORS.primary]}
        >

            <View style={styles.container}>
                <Text style={styles.title}>
                    Google Cloud Vision API Demo
                </Text>
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}

                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.button}>
                    <Text style={styles.text}>Pick Image...</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={analyzeImage}
                    style={styles.button}>
                    <Text style={styles.text}>Analyse Image</Text>
                </TouchableOpacity>

                {
                    labels.length > 0 && (
                        <View>
                            <Text style={styles.label}>
                                Labels:
                            </Text>
                            {
                               labels?.map((label) => (
                                    <Text
                                        key={label.mid}
                                        style={styles.outputtext}
                                    >
                                        {label.description}
                                    </Text>
                                ))
                            }
                        </View>
                    )
                }

            </View>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 100,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    outputtext: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default CamInterface;


