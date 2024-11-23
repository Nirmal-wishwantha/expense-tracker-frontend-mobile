import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import instance from '../../service/Axios';
import ViewTable from '../common/table/ViewTable';

const screenWidth = Dimensions.get('window').width;

function Home() {
  // Example data for the bar chart
  const data = {
    labels: ['Food', 'Education', 'Entertainment', 'Transport', 'Other'], // Categories
    datasets: [
      {
        data: [50, 30, 20, 40, 10], // Data values corresponding to the categories
        colors: [(opacity = 1) => `rgba(134, 65, 244, ${opacity})`], // Color of the bars
      },
    ],
  };




  const getExpense = () => {
    instance.get('')
  }


  return (

    <View>

      <View style={styles.container}>



        {/* <Text style={styles.title}>Expense Categories</Text> */}
        <BarChart
          data={data}
          width={screenWidth - 40} // Set the width of the chart
          height={220} // Set the height of the chart
          yAxisLabel="$" // Y-axis label
          yAxisInterval={1} // Interval for the Y-axis labels
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // Decimal places for the data
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color of the chart line/labels
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color of the labels
            style: {
              borderRadius: 16, // Round corners of the chart
            },
            propsForDots: {
              r: '6', // Size of dots (if used in the line chart)
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>


      <View style={styles.table}>
        <ViewTable />
      </View >






    </View>




  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    // justifyContent:'center'

  },

  table: {
    marginBottom: 400
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default Home;
