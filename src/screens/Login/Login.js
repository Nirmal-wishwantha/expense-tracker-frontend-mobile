import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import instance from '../../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const [email, setEmail] = useState();

    const [password, setPassword] = useState();



    const loginPage = () => {

       


            instance('/api/v1/user/login', data)
                .then((res) => {
                    console.log(res);

                })
                .catch((err) => {
                    console.log(err);
                })

        




    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                mode="outlined"
                style={styles.input}
                secureTextEntry
            />
            <Button mode="contained" style={styles.button}
                onPress={loginPage}
            >
                Login
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerPrompt}>
                    Not registered? Go to Register
                </Text>
            </TouchableOpacity>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,

    },
    registerPrompt: {
        marginTop: 15,
        textAlign: 'center',
        color: '#6200ee',
        textDecorationLine: 'underline',
    },
});
