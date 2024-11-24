import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert,ScrollView } from 'react-native';
import { TextInput, Menu, Button, Provider, Portal, Card } from 'react-native-paper';
import instance from '../../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenses = () => {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const fetchId = async () => {
      const idUser = await AsyncStorage.getItem('id');
      setId(idUser);
    };
    fetchId();

  }, [])

  const Submit = () => {
    const data = {
      userId: id,
      category: category,
      amount: amount,
    };

    console.log('Payload being sent:', data);

    instance.post('/api/v1/expens/add', data)
      .then((res) => {
        console.log('Expense added successfully!');

        setAmount('');
        setCategory('');
        Alert.alert(
          "Success",
          "Expense added successfully!",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );


      })
      .catch((err) => {
        if (err.response) {
          console.error('Server responded with error:', err.response.data);
        } else {
          console.error('Error adding expense:', err.message);
        }
        console.log('Failed to add expense.');
      });
  };




  const categories = ['food', 'education', 'transport', 'other', 'entertainment', 'shopping'];

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Expense Form</Text>

        {/* Amount Input */}
        <TextInput
          label="Enter Amount"
          mode="outlined"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        {/* Category Dropdown */}
        <Card style={styles.dropdownCard}>
          <Text onPress={() => setVisible(true)} style={styles.dropdownText}>
            {category || 'Select Category'}
          </Text>
        </Card>

        {/* Menu (Dropdown) */}
        
          <Portal>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={<Text />}
            >
              {categories.map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setCategory(item);
                    setVisible(false);
                  }}
                  title={item}
                />
              ))}
            </Menu>
          </Portal>
        
        {/* Submit Button */}
        <Button mode="contained" onPress={Submit} style={styles.submitButton}>
          Submit
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  dropdownCard: {
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: 'gray',
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AddExpenses;
