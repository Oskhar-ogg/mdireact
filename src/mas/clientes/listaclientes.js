import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView, View, RefreshControl, FlatList, TouchableOpacity, Linking, Platform } from 'react-native'
import { Card, Text, Button, Image, Avatar } from '@rneui/base'
import { getClientes, getClienteHistoricoCaldera, getClienteHistoricoCalefont } from '../../../api'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import styles from '../../style'
import BottomBar from '../../componentes/bottombar'


export default function ListaCliente (){
    const handleWhatsAppButtonPress = (phoneNumber) => {
        if (phoneNumber) {
          const whatsappUrl = `https://api.whatsapp.com/send/?phone=56${phoneNumber}&text&app_absent=0`
          Linking.openURL(whatsappUrl)
            .then(() => {
              console.log(`URL de WhatsApp abierta con éxito: ${whatsappUrl}`)
            })
            .catch((error) => {
              console.error('Error al abrir la URL', error);
              // Intenta abrir la URL en el navegador del sistema
              const systemBrowserUrl = `https://wa.me/56${phoneNumber}`;
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
            // Construir la dirección completa para Google Maps
            const direccionCompleta = `${direccion}, ${comuna}`
    
            // Crear la URL de la API de Google Maps para obtener coordenadas
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccionCompleta)}&key=${process.env.EXPO_PUBLIC_MAPS_KEY_API}`
            console.log(apiUrl)
            try {
                const response = await fetch(apiUrl);
    
                if (!response.ok) {
                    console.error('Error en la solicitud a la API de Google Maps:', response.status, await response.text())
                    return;
                }
    
                const data = await response.json();
                console.log(data)
                if (data.results && data.results.length > 0) {
                    // Obtener la ubicación desde los resultados de la API
                    const location = data.results[0].geometry.location
    
                    // Construir el enlace para abrir en la aplicación de Google Maps
                    const mapsUrl = `https://www.google.com/maps/place/${location.lat},${location.lng}`
                    console.log(mapsUrl)
                    // Abrir la URL en la aplicación de mapas
                    Linking.openURL(mapsUrl);
                } else {
                    console.error('No se encontraron resultados de ubicación')
                }
            } catch (error) {
                console.error('Error al obtener datos de la API de Google Maps', error)
            }
        } else {
            console.error('Dirección o comuna faltantes')
        }
    };
    
      
      const [refreshing, setRefreshing] = React.useState(false)
      const [cliente, setCliente] = useState([])
      const isFocused = useIsFocused()
   
      const cargarCliente = async () => {
         try {
           const data = await getClientes()
           setCliente(data)
         } catch (error) {
           console.error(error)
           // Manejar el error de la Promesa aquí, por ejemplo, mostrar un mensaje de error al usuario
         }
          }
     
         const onRefresh = React.useCallback(async () => {
         setRefreshing(true)
         await cargarCliente()
         setRefreshing(false)
         }, [])
     
         useEffect(() => {
         cargarCliente();
         }, [isFocused]);  

    const CardClientes = React.memo (({item}) => (
      <Card>
        <Card.Title h3>Información del Cliente</Card.Title>
        <Avatar
          size={64}
          rounded
          source={require('../../imagenes/avatar.png')}
        /><Card.Title h4>{item.cliente_nombre}</Card.Title>
        <Card.Divider />
        <Text h4>Dirección: {item.cliente_direccion}</Text>
        <Text h4>Comuna: {item.comuna_nombre}</Text>
        <Card.Divider />
        <Text h4>Numero telefónico: +56{item.cliente_telefono}</Text>
        <View>
        <Card.Divider />
          <Button
            title="WhatsApp"
            icon={{
            name: 'whatsapp',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          iconLeft
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgb(18, 140, 126)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 50,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => handleWhatsAppButtonPress(item.cliente_telefono)}
          />
          <Button
            title="Ir a la dirección"
            icon={{
            name: 'road',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          iconLeft
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgb(74,128,245)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 50,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => handleMapsPress(item.cliente_direccion, item.comuna_nombre)}
          />
          <Button
            title="Ver histórico de servicios"
            icon={{
            name: 'wrench',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          iconLeft
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => handleVerHistoricoPress(item.cliente_id)}
        />
    </View>
    </Card>
    ))   

    return(
    <SafeAreaView style={styles.container}>
        <FlatList
        style={styles.FlatList}
        data={cliente}
        keyExtractor={(item) => item.cliente_id.toString()}
        renderItem={({ item }) => <CardClientes item={item} />}
        refreshControl={ // Componente RefreshControl para FlatList
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        nestedScrollEnabled={true} // Habilitar desplazamiento interno de FlatList
        />
     <View style={{ height: 20 }}></View>   
    <BottomBar/>
    </SafeAreaView>)
}