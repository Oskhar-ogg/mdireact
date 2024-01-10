import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, List, Text } from 'react-native-paper'
import { FlatList, View, Alert } from 'react-native'
import BottomBar from '../componentes/bottombar'
import { getBitacoraID, deleteBitacora  } from '../../api'
import { useNavigation } from '@react-navigation/native'
import styles from '../style'

const LeftContent = props => <Avatar.Icon {...props} icon="book-open-page-variant" theme={{colors: {primary:'white'}}} />

const Verbitacora = ({ route }) => {
    const navigation = useNavigation()
    const { bitacora_id } = route.params
    console.log('bitacora_id', bitacora_id)
  
    const [bitacora, setBitacora] = useState({})
    const handleDelete = async (bitacora_id) => {
        Alert.alert("Eliminar bitácora", "¿Estás seguro que deseas eliminar esta bitácora?", [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Eliminar",
            onPress: async () => {
              await deleteBitacora(bitacora_id)
              console.log('Bitacora eliminada correctamente')
              navigation.navigate('Bitácoras')
          },
          },
        ])
    }

    useEffect(() => {
    const fetchData = async () => {
      const data = await getBitacoraID(bitacora_id)
      console.log(data)
      setBitacora(data)
    }

    fetchData()
  }, [bitacora_id])

  return (
    <View style={styles.container}>
    <View style={styles.container}>
    <FlatList
    data={bitacora}
    keyExtractor={(item) => item.bitacora_id.toString()}
    renderItem={({item}) =>( 
    <Card>
        <Card.Title title={new Date(item.bitacora_fecha).toLocaleDateString('es-ES', {
                  timeZone: 'UTC', // Ajusta esto según el huso horario correcto
                })} subtitle={item.bitacora_trabajo + ' || ' + item.bitacora_estado} left={LeftContent} />
        <Card.Title title = {item.bitacora_title} />
        <Card.Content>
          <Text variant="bodyMedium" style={{ fontSize: 22 }}>{item.bitacora_description}</Text>
        </Card.Content>
        <Card.Cover
  style={{
    width: 375,
    height: 375,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10
  }}
  source={require('../imagenes/ImagenNoDisponible.png')} />

        <Card.Actions>
          <Button mode='contained' textColor='white' theme={{ colors: { primary: 'red' } }} onPress={() => handleDelete(item.bitacora_id)}>Eliminar</Button>
        </Card.Actions>
      </Card>)}/>
  </View>
  <BottomBar />
  </View>)
}

export default Verbitacora
