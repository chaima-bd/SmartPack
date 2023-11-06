import {View, Text, Pressable, Image , StyleSheet, TouchableOpacity} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
////////////
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { async } from 'q';


import Button from '../components/Button';

const ChooseImage = ({ navigation }) => {

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

    return (

        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Choose an Image!</Text>

                
                    <Button
                        title="From Your Phone"
                        onPress={pickImage}
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

export default ChooseImage