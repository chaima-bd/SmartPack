import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
////////////
import { Pressable, Image , StyleSheet} from 'react-native'
import Button from '../components/Button';

const ChooseImage = () => {
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
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />
                    <Button
                        title="Take Pic"
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