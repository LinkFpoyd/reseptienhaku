import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {

  const [hakusana, setHakusana] = useState("");
  const [data, setData] = useState([]);

  const haeResepti = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
    .then(response => response.json())
    .then(responseJson => setData(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error.toString()); 
    });    
  }



  return (
    <View style={styles.container}>
      <FlatList style={styles.list} 
        data={data}
        renderItem={({item}) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={styles.image} source={{uri: (item.strMealThumb + '/preview')}} />
          </View>}
        keyExtractor={(item, index) => index.toString()}   
        /> 
      <TextInput style={styles.input} onChangeText={input => setHakusana(input)} value={hakusana} placeholder='Hakusana (englanniksi)'/>  
      <Button onPress={haeResepti} title='Hae reseptiä'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 100
  },
  image: {
    width: 100,
    height: 100
  },
  input: {
    marginTop: 10,
    textAlign: 'center',
    height: 40,
    width: 200,
    borderWidth: 1
  }
});
