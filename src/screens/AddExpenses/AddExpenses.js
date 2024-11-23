import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Menu, Button, Provider, Portal, Card } from 'react-native-paper';
import instance from '../../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenses = () => {
  const [id,setId]=useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);


useEffect(() => {
 const idUser = AsyncStorage.getItem('id');
 setId(idUser);

 Submit();

}, [])

  const Submit = () => {
    const data={
      userId:id,
      category:category,
      amount:amount
    }
    instance.post('/api/v1/expens/add',data)
    .then((res)=>{
      console.log(res);
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  };


  const categories = ['Food', 'Education', 'Transport', 'Other', 'Entertainment'];

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
    justifyContent: 'center',
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
