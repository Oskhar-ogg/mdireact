import React, { useEffect, useState } from "react"
import { View, Dimensions, StyleSheet } from "react-native"
import { Card, Avatar, Text, Button } from "@rneui/base"
import { useNavigation } from "@react-navigation/native"
import { getAuth, signOut } from 'firebase/auth'
import { ScrollView } from "react-native"
import { getTecnico } from "../api"
import BottomBar from "./componentes/bottombar"

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

export default function Perfil() {
  const navigation = useNavigation()
  const auth = getAuth() // Obtener la instancia de autenticación
  const [tecnico, setTecnico] = useState({
    tecnico_nombre: '',
    tecnico_correo: '',
    tecnico_telefono: '',
  })

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigation.navigate('Login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const cargarTecnico = async () => {
    try {
      const [tecnicoData] = await getTecnico() // Desestructura el array
      console.log('Datos del técnico:', tecnicoData)
      setTecnico({
        tecnico_nombre: tecnicoData.tecnico_nombre,
        tecnico_correo: tecnicoData.tecnico_correo,
        tecnico_telefono: tecnicoData.tecnico_telefono,
      })
    } catch (error) {
      console.error('Error al cargar el técnico:', error)
    }
  }
  
  

  useEffect(() => {
    cargarTecnico()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Card style={styles.CenterContainer}>
            <Card.Title h3>Técnico Autorizado SEC CLASE 3</Card.Title>
            <Avatar
              size={64}
              source={require('./imagenes/profile.jpg')}
              containerStyle={{ backgroundColor: 'grey' }}
              rounded
            />
            <Card.Divider />
            <Text h4>Nombre: {tecnico.tecnico_nombre}</Text>
            <Card.Divider />
            <Text h4>Correo: {tecnico.tecnico_correo}</Text>
            <Card.Divider />
            <Text h4>Teléfono: {tecnico.tecnico_telefono}</Text>
            <Card.Divider />
            <Text h4>e-RNI QR SEC: </Text>
            <Card.Image
              style={{
                width: 320,
                height: 350,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
              source={require('./imagenes/qr_sec.png')}
            ></Card.Image>
            <Card.Divider />
            <Button onPress={handleLogout}>Cerrar Sesión</Button>
          </Card>
        </View>
        <View style={{ height: 80 }}></View>
      </ScrollView>
      <View>
        <BottomBar />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022534',
  },
  CenterContainer: {
    flex: screenWidth * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
