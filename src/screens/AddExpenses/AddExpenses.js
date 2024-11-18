import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Menu, Button, Provider, Portal, Card } from 'react-native-paper';

const Form = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);

  // Category options
  const categories = ['Food', 'Education', 'Transport', 'Other', 'Entertainment'];

  const handleSubmit = () => {
    if (!amount || !category) {
      alert('Please fill out both fields');
    } else {
      alert(`Amount: ${amount}, Category: ${category}`);
    }
  };

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
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
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

export default Form;
