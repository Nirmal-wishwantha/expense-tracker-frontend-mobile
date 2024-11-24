import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import ViewTable from '../common/table/ViewTable';

export default function Settings() {
    const Navigation = useNavigation();

    const logOut = async () => {
        try {

            await AsyncStorage.removeItem('expens');
            await AsyncStorage.removeItem('id');
            console.log('User logged out and data removed from AsyncStorage');


            Navigation.navigate('Login');
        } catch (error) {
            console.error('Error removing data from AsyncStorage:', error);
        }
    };

    return (

        
        <View style={styles.container}>
            <Button
                mode="contained"
                style={styles.logoutButton}
                onPress={logOut}
            >
                Log Out
            </Button>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoutButton: {
        marginTop: 20,
    },
});
