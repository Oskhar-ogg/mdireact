import React, { useState } from "react"
import { View, SafeAreaView, ImageBackground, TouchableOpacity, Alert, TextInput, Dimensions } from "react-native"
import BottomBar from "./componentes/bottombar"
import { useNavigation } from '@react-navigation/native'
import styles from "./style"
import { Card, Text, Button } from "@rneui/base"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'


export default function Login() {
    const [email, setEmail] = React.useState("");
    const [contraseña, setContraseña] = React.useState("");
    const navigation = useNavigation();
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, contraseña)
        .then((userCredential) => {
          console.info("Ingreso exitoso")
          const user = userCredential.user;
          navigation.navigate('Inicio');
          setEmail("");
          setContraseña("");
        })
        .catch(error => {
          Alert.alert("Error al pasar la autenticación", "Credenciales no válidas.\nRevisar error ortográfico o conexión a internet.\nSi el problema persiste contactar con el administrador.");
        });
    };
  
    //const handleRegistro = () => {
      //createUserWithEmailAndPassword(auth, email, contraseña)
        //.then((userCredential) => {
          //Alert.alert("Cuenta creada con éxito");
         // const user = userCredential.user;
         // console.log(user);
       // })
        //.catch(error => {
          //console.error("NO SE HA PODIDO REALIZAR LA ACCIÓN");
          //Alert.alert(error);
        //});
    //};
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff'}}>
        <ImageBackground source={require('../assets/login.png')} style={{ height: Dimensions.get('window').height / 2.5,}}/>
        <View style={styles.bottomView}>
          <Card>
            <Card.Title style={{ fontSize: 34, fontWeight: '300', color: 'blue', marginBottom: 15, padding: 20 }}>Bienvenido</Card.Title>
            <Card.Divider />
            <View style={{marginTop:20}}>
            <Text style={{ color: 'blue' }}>Correo</Text>
            <TextInput
              style={{ fontSize: 30, fontWeight: '300', color: '#333', marginBottom: 30, borderColor: 'gray', borderWidth: 0.2, borderRadius: 5 }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder='ejemplo@aaaa.cl'
              autoCapitalize="none"
              autoComplete="email"
              inputMode="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              leftIcon={{ type: 'MaterialIcons', name: 'contact-mail' }}
            />
            <Card.Divider />
            <Text style={{ color: 'blue' }}>Contraseña</Text>
            <TextInput
              style={{ fontFamily: 'Roboto-Medium', fontSize: 30, fontWeight: '300', color: '#333', marginBottom: 30, borderColor: 'gray', borderWidth: 0.2, borderRadius: 5}}
              value={contraseña}
              onChangeText={(text) => setContraseña(text)}
              placeholder='*********'
              secureTextEntry={true}
              textContentType="password"
              leftIcon={{ type: 'MaterialIcons', name: 'lock' }}  
            />
            </View>
            <Card.Divider />
            <TouchableOpacity>
              <Button onPress={() => handleSignIn()}>INGRESAR</Button>
            </TouchableOpacity>
          </Card>
          </View>
      </SafeAreaView>
    );
  }
  