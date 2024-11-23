import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import instance from '../../../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewTable() {
    const [getExpense, setGetExpense] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const userId = await AsyncStorage.getItem('id'); // Retrieve user ID from AsyncStorage
                if (userId) {
                    getAll(userId); // Pass the user ID to the getAll method
                } else {
                    console.error('User ID not found in AsyncStorage');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const getAll = (userId) => {
        instance
            .get(`/api/v1/expens/get/${userId}`) // Use the correct userId passed as an argument
            .then((res) => {
                setGetExpense(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching expenses:', err);
                setLoading(false);
            });
    };

    const deleteExpence = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this expense?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => {
                        instance
                            .delete(`/api/v1/expens/delete/${id}`)
                            .then(() => {
                                setGetExpense((prevExpenses) =>
                                    prevExpenses.filter((expense) => expense.id !== id)
                                );
                                Alert.alert("Success", "Expense deleted successfully.");
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error("Error deleting expense:", err);
                                Alert.alert("Error", "Failed to delete the expense.");
                            });
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#6e8efb" />
            </View>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.header}>No</DataTable.Title>
                        <DataTable.Title style={styles.header}>Category</DataTable.Title>
                        <DataTable.Title style={styles.header}>Amount</DataTable.Title>
                        <DataTable.Title style={styles.header}>Date</DataTable.Title>
                        <DataTable.Title style={styles.header}>Action</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView style={styles.containerScroller}>
                        {getExpense.map((val, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={styles.rowData}>{index + 1}</DataTable.Cell>
                                <DataTable.Cell style={styles.rowData}>{val.category}</DataTable.Cell>
                                <DataTable.Cell style={styles.rowData}>{val.amount}</DataTable.Cell>
                                <DataTable.Cell style={styles.rowData}>{val.date}</DataTable.Cell>
                                <DataTable.Cell style={styles.rowData}>
                                    <Button
                                        mode="text"
                                        onPress={() => deleteExpence(val.id)}
                                    >
                                        Delete
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </ScrollView>
                </DataTable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 700,
    },
    containerScroller: {
        marginBottom: 60,
    },
    header: {
        justifyContent: 'center',
    },
    rowData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
