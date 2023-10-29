import { View, Text, StyleSheet, Image, Pressable} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button';

const ScanScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.header}>
            <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // Navigate back when the button is pressed
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </Pressable>
                <Image source={require('../assets/logopic.png')} style={styles.logo} />
            </View>
            <View style={styles.content}>
                <Text style={styles.listHeader}>SCAN SCREEN</Text>
            </View>
        </SafeAreaView>
    )

}
export default ScanScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
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
  });
