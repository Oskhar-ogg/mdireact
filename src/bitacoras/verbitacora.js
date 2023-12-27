import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, List, Text } from 'react-native-paper';
import { FlatList, View, Alert } from 'react-native';
import BottomBar from '../componentes/bottombar';
import { getBitacoraID, deleteBitacora  } from '../../api';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';

const LeftContent = props => <Avatar.Icon {...props} icon="book-open-page-variant" theme={{colors: {primary:'white'}}} />

const Verbitacora = ({ route }) => {
    const navigation = useNavigation();
    const { bitacora_id } = route.params;
    console.log('bitacora_id', bitacora_id);
  
    const [bitacora, setBitacora] = useState({});
    const handleDelete = async (bitacora_id) => {
        Alert.alert("Eliminar bitácora", "¿Estás seguro que deseas eliminar esta bitácora?", [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Eliminar",
            onPress: async () => {
              await deleteBitacora(bitacora_id);
              console.log('Bitacora eliminada correctamente');
              navigation.navigate('Bitácoras');
          },
          },
        ])
    };

    useEffect(() => {
    const fetchData = async () => {
      const data = await getBitacoraID(bitacora_id);
      console.log(data);
      setBitacora(data);
    };

    fetchData();
  }, [bitacora_id]);

  return (
    <View style={styles.container}>
    <View style={styles.container}>
    <FlatList
    data={bitacora}
    keyExtractor={(item) => item.bitacora_id.toString()}
    renderItem={({item}) =>( 
    <Card>
        <Card.Title title={new Date(item.bitacora_fecha).toLocaleDateString()} subtitle={item.bitacora_trabajo} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{item.bitacora_title}</Text>
          <Text variant="bodyMedium">{item.bitacora_description}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'http://localhost:3001/images/404' }} />
        <Card.Actions>
          <Button mode='contained' textColor='white' theme={{ colors: { primary: 'red' } }} onPress={() => handleDelete(item.bitacora_id)}>Eliminar</Button>
        </Card.Actions>
      </Card>)}/>
  </View>
  <BottomBar />
  </View>);
};

export default Verbitacora;
