import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button';
import { Table, Row } from 'react-native-table-component';

const CommandDetails = ({navigation }) => {

    const CommandDetailsScreen = ({ route }) => {
        const [tableData, setTableData] = useState([]);
        const [extractedText, setExtractedText] = useState('');
        // State to store the selected products and their checkboxes
        const [selectedProducts, setSelectedProducts] = useState({});
        // Function to handle checkbox selection
        const toggleCheckbox = (productId) => {
            setSelectedProducts({
                ...selectedProducts,
                [productId]: !selectedProducts[productId],
            });
        };

        useEffect(() => {
            // Process the OCR data from the commandData
            // Process the OCR data from the response
            const response = route.params.responseData;
            const ocrData = response.ocrData;
            const rawExtractedText = response.extractedText;  // Optional: Include raw extracted text

            // Set the extracted text state
            setExtractedText(rawExtractedText);

            // Create table rows from the OCR data
            const rows = ocrData.map((item) => [
            item.nom_produit,
            item.quantite.toString(),
            item.status,
            'Add to Cart', // You can customize this part based on your requirements
        ]);
  
        setTableData(rows);
        }, [route.params]);
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
                    <Row data={['Product Name', 'Quantity', 'Status', 'Add to Cart']} />
                    {tableData.map((rowData, index) => (<Row key={index} data={rowData} />))}
                </Table>
                <Text>{extractedText}</Text>

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
