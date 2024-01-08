import React, { useState } from "react";
import { View, SafeAreaView, ImageBackground, TouchableOpacity, Alert, TextInput, Dimensions } from "react-native";
import { Card, Text, Button } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import styles from "./style";

// Configura tu objeto de configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-F1B0H7KPQR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        console.info("Ingreso exitoso");
        const user = userCredential.user;
        navigation.navigate('Inicio');
        setEmail("");
        setContraseña("");
      })
      .catch(error => {
        let errorMessage = "Error al pasar la autenticación. Revisa las credenciales e intenta nuevamente.";
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
          errorMessage = "Usuario no encontrado o formato de correo electrónico inválido.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Contraseña incorrecta. Verifica la contraseña e intenta nuevamente.";
        }
        Alert.alert("Error", errorMessage);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ImageBackground source={require('../assets/login.png')} style={{ height: Dimensions.get('window').height / 2.5 }} />
      <View style={styles.bottomView}>
        <Card>
          <Card.Title style={{ fontSize: 34, fontWeight: '300', color: 'blue', marginBottom: 15, padding: 20 }}>Bienvenido</Card.Title>
          <Card.Divider />
          <View style={{ marginTop: 20 }}>
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
              style={{ fontFamily: 'Roboto-Medium', fontSize: 30, fontWeight: '300', color: '#333', marginBottom: 30, borderColor: 'gray', borderWidth: 0.2, borderRadius: 5 }}
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
