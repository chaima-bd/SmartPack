import { View, Text, Pressable, Image , StyleSheet} from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { CamInterface } from '.';

const CamInterface = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >

            <Text>hello</Text>
        </LinearGradient>
    )
}


export default CamInterface