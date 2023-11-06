import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button';
import { Table, Row } from 'react-native-table-component';

const CommandDetails = ({ navigation }) => {

    const CommandDetailsScreen = ({ route }) => {
        const { commandData } = route.params; // Receive data of the selected command
        // State to store the selected products and their checkboxes
        const [selectedProducts, setSelectedProducts] = useState({});
        // Function to handle checkbox selection
        const toggleCheckbox = (productId) => {
            setSelectedProducts({
                ...selectedProducts,
                [productId]: !selectedProducts[productId],
            });
        };
        // Function to handle confirming the command
        const confirmCommand = () => {
            // Implement the logic to confirm the command with selected products and comments
        };
        // Function to handle deleting the command
        const deleteCommand = () => {
            // Implement the logic to delete the command
        };
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // Navigate back when the button is pressed
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </Pressable>
                <Image source={require('../assets/logopic.png')} style={styles.logo} />
            </View>
            <View style={styles.content}>
                <Table>
                    <Row data={['Product Name', 'Status', 'Quantity', 'Add to Cart']} />
                    {/* Map through commandData.products and create rows in the table */}
                </Table>

                <TextInput placeholder="Add a comment" />

                <View>
                    <Button title="Confirm Command"  />
                    <Button title="Delete Command" />
                </View>
            </View>
        </SafeAreaView>
    )

}
export default CommandDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    logo: {
        width: 120, // Adjust the width and height as needed
        height: 120, // Adjust the width and height as needed
    },
    content : {
        flex:1,
        justifyContent :'center',
        paddingHorizontal: 30,
    },

    listHeader: {
        fontSize: 20,
        marginTop: 20,
    },

    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1, // Ensure the button appears above other components
    },
});
