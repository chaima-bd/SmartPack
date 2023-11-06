import { View, Text, StyleSheet, Image, Pressable} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button';
//import ScanScreen from './ScanScreen';


const HomeScreen = ({ navigation }) => {

    const userName = 'Yasmine Takatart';

    const navigateToCommandDetails = (commandNumber) => {
        // Navigate to the CommandDetails screen with the specific command number
        navigation.navigate('CommandDetails', { commandNumber });
    };

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
                <Text style={styles.userName}>Welcome, {userName}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.listHeader}>List of Commands (2)</Text>
                <Button title="Command 1" onPress={() => navigation.navigate("CommandDetails")}  />
                <Button title="Command 2" onPress={() => navigation.navigate("CommandDetails")}  />
                {/* Add buttons for other commands */}
                <Button
                    title="Add a Command"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen

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
      marginTop: -50,
    },
    logo: {
      width: 120, // Adjust the width and height as needed
      height: 120, // Adjust the width and height as needed
    },
    userName: {
      fontSize: 17,
    },
    content : {
        flex:1,
        justifyContent :'center',
        paddingHorizontal: 30,
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
    addCommandButton: {
        fontSize: 16,
        color: COLORS.primary, // You can define the color you want
        textAlign: 'center',
        marginTop: 20, // Added margin for separation
      },
  });