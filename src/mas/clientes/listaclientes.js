import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView, View, RefreshControl, FlatList, TouchableOpacity, Linking } from 'react-native'
import { Card, Text, Button, Avatar, IconButton } from 'react-native-paper' // Cambiado a React Native Paper
import { getClientes, deleteCliente, getClienteHistoricoCaldera, getClienteHistoricoCalefont } from '../../../api'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import styles from '../../style'
import BottomBar from '../../componentes/bottombar'
import { Alert } from 'react-native';

export default function ListaCliente() {
  const navigation = useNavigation()
  const handleCallButtonPress = (phoneNumber) => {
    if (phoneNumber) {
      const telUrl = `tel:${phoneNumber}`
      Linking.openURL(telUrl)
        .then(() => {
          console.log(`Aplicación de llamadas abierta con éxito: ${telUrl}`)
        })
        .catch((error) => {
          console.error('Error al abrir la aplicación de llamadas', error)
        })
    }
  }

  const handleWhatsAppButtonPress = (phoneNumber) => {
    if (phoneNumber) {
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=56${phoneNumber}&text&app_absent=0`
      Linking.openURL(whatsappUrl)
        .then(() => {
          console.log(`URL de WhatsApp abierta con éxito: ${whatsappUrl}`)
        })
        .catch((error) => {
          console.error('Error al abrir la URL', error)
          // Intenta abrir la URL en el navegador del sistema
          const systemBrowserUrl = `https://wa.me/56${phoneNumber}`
          Linking.openURL(systemBrowserUrl)
            .then(() => {
              console.log(`URL abierta en el navegador del sistema: ${systemBrowserUrl}`)
            })
            .catch((systemBrowserError) => {
              console.error('Error al abrir la URL en el navegador del sistema', systemBrowserError)
            })
        })
    }
  }

  const handleMapsPress = async (direccion, comuna) => {
    if (direccion && comuna) {
      const direccionCompleta = `${direccion}, ${comuna}`
      const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(direccionCompleta)}`
      Linking.openURL(mapsUrl)
    } else {
      console.error('Dirección o comuna faltantes')
    }
  }

  const [refreshing, setRefreshing] = useState(false)
  const [cliente, setCliente] = useState([])
  const [clienteAEliminar, setClienteAEliminar] = useState(null)
  const isFocused = useIsFocused()

  const cargarCliente = async () => {
    try {
      const data = await getClientes()
      const clientesOrdenados = data.sort((a, b) =>
      a.cliente_nombre.localeCompare(b.cliente_nombre)
    )
    setCliente(clientesOrdenados)
    } catch (error) {
      console.error(error)
    }
  }

  const borrarCliente = async (clienteId) => {
    try {
      // Show confirmation alert
      Alert.alert(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este cliente?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              // Lógica para eliminar el cliente con la ID proporcionada
              await deleteCliente(clienteId);
              // Actualizar la lista de clientes después de la eliminación
              await cargarCliente();
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error(error);
    }
  };


  const customCardTheme = {
    colors: {
      primary: '#ffffff', // Color del encabezado
      text: '#000000', // Color del texto
      background: '#000000', // Color del fondo
      placeholder: '#000000', // Color del marcador de posición
      surface: '', // Color de la superficie
      accent: '#ffffff', // Color de acento
    },
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await cargarCliente()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    cargarCliente()
  }, [isFocused])

  const CardClientes = React.memo(({ item }) => {
  const handleEliminarCliente = async (clienteId) => {
    await borrarCliente(clienteId);
  };
  return (
    <Card theme={customCardTheme} style={{ alignItems: 'center' }} mode='outlined'>
      <Card.Title title={'Nombre: ' + item.cliente_nombre } titleVariant='bodyLarge' />
      <Avatar.Image size={64} source={require('../../imagenes/avatar.png')} />
      <Card.Title title={'Número Telefónico: +56' + item.cliente_telefono} />
      <Card.Content>
        <Text>Tipo cliente: {item.cliente_tipo}</Text>
        <Text>Dirección: {item.cliente_direccion}</Text>
        <Text>Comuna: {item.comuna_nombre}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="phone"
          mode="contained"
          style={{ backgroundColor: 'yellow' }}
          onPress={() => handleCallButtonPress(item.cliente_telefono)}>
          Llamar
        </Button>
        <Button
          icon="whatsapp"
          mode="contained"
          style={{ backgroundColor: '#25D366' }}
          onPress={() => handleWhatsAppButtonPress(item.cliente_telefono)}>
          WhatsApp
        </Button>
      </Card.Actions>
      <Card.Actions>
        <Button
          icon="map"
          mode="contained"
          style={{ backgroundColor: '#34B7F1' }}
          onPress={() => handleMapsPress(item.cliente_direccion, item.comuna_nombre)}>
          GPS
        </Button>
        <Button
          icon="wrench"
          mode="contained"
          style={{ backgroundColor: 'orange' }}
          onPress={() => navigation.navigate('Histórico Cliente', { clienteId: item.cliente_id })}>
          Historial de servicios
        </Button>
      </Card.Actions>
      <Card.Actions>
        {/* Botón de eliminar */}
        <IconButton
          icon="delete"
          color="#ff0000"
          size={20}
          onPress={() => handleEliminarCliente(item.cliente_id)}
        />
      </Card.Actions>
    </Card>
  );
});
return (
  <SafeAreaView style={styles.container}>
    <FlatList
      style={styles.FlatList}
      data={cliente}
      keyExtractor={(item) => item.cliente_id.toString()}
      renderItem={({ item }) => <CardClientes item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      nestedScrollEnabled={true}
    />
    <View style={{ height: 20 }}></View>
    <BottomBar />
  </SafeAreaView>
);
}
