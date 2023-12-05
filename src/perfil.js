import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import BottomBar from "./componentes/bottombar";
import styles from "./style";
import { Card, Avatar, Text, Button } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, signOut } from 'firebase/auth';
import { ScrollView } from "react-native";

export default function Perfil() {
  const navigation = useNavigation();
  const auth = getAuth(); // Obtener la instancia de autenticación

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (

    <View style={styles.container}>
    <ScrollView>
      <View>
        <Card style={styles.CenterContainer}>
          <Card.Title h3>Técnico Autorizado SEC CLASE 3</Card.Title>
          <TouchableOpacity>
            <Avatar
              size={64}
              rounded
              source={require('../src/imagenes/avatar.png')}
              title="WC"
              containerStyle={{ backgroundColor: 'grey' }}
            >
              <Avatar.Accessory size={23} />
            </Avatar>
          </TouchableOpacity>
          <Card.Divider/>
          <Text h4>Nombre: </Text>
          
          {/* Mostrar datos del usuario */}
          <Card.Divider/>
          <Text h4>e-RNI QR SEC </Text>
          <Card.Image style={{ width: 320, height: 350, borderRadius: 18, justifyContent: 'center', alignItems: 'stretch',}}
            source={require('../assets/qr_sec.png')}></Card.Image>
          <Button onPress={handleLogout}>Cerrar Sesión</Button>
        </Card>
      </View>
      <View style={{ height: 80 }}></View>
      </ScrollView>
      <View style={styles.bottomBar}><BottomBar /></View>
    </View>
  );
}


