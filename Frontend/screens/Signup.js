//We need to create functions that make HTTP requests to our Django API endpoints for registration and login.

import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // Navigate back when the button is pressed
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </Pressable>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        marginTop: 30,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>
                </View>

                <View style={{ marginBottom: 9 }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Full Name</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your full name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss(); // This line dismisses the keyboard
                            }}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 9 }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email Adress</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Email Adress'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss(); // This line dismisses the keyboard
                            }}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 9 }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 7,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 20
                    }}>
                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss(); // This line dismisses the keyboard
                            }}
                            style={{
                                width: "80%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 9 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss(); // This line dismisses the keyboard
                            }}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 9 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>City</Text>
                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your City'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss(); // This line dismisses the keyboard
                            }}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                
                </View>


                <View style={{
                    flexDirection: 'row',
                    marginVertical: 4
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        marginTop: 10,
                        marginBottom: 4,
                    }}
                    
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 13 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10,
                    
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 47,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/auth/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 47,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/auth/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 12
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}

                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 22,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1, // Ensure the button appears above other components
    },

});

export default Signup