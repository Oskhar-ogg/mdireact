//SECTOR DE IMPORTS UTILIZADOS
import React, { useEffect, useState} from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { Button, Text, Card} from '@rneui/base';
//conexión api
import {MontoMesBitacora, MontoBitacora} from '../../api.js'

const Tarjeta = () => { 
    const [montoMes, setMontoMes] = useState('');
    const [montoTotal, setMontoTotal] = useState('');
  
    useEffect(() => {
      // Llamar a la función para obtener el monto del mes
      obtenerMontoMes();
      obtenerMontoTotal();
    }, []);
  
    const obtenerMontoMes = async () => {
      try {
        const monto = await MontoMesBitacora();
        if (monto >= 0) {
          setMontoMes(monto);
        }
         else {
          console.error('La respuesta de obtenerMontoMes no es válida:', monto);
        }
      } catch (error) {
        console.error('Error al obtener el monto del mes:', error);
      }
    };

    const obtenerMontoTotal = async () => {
      try {
        const monto = await MontoBitacora();
        if (monto >= 0) {
          setMontoTotal(monto);
        }
         else {
          console.error('La respuesta de obtenerMontoTotal no es válida:', monto);
        }
      } catch (error) {
        console.error('Error al obtener el monto total:', error);
      }
    };

    return (
      <ImageBackground source={require('../../assets/tarjeta.jpg')} style={styles.image}>
        <View style={styles.textContainer}>
          <Text h3 style={styles.Text2}>Bienvenido</Text>
          <Text h4 style={styles.TextCardBottom}>Total = ${montoTotal}</Text>
          <Text h4 style={styles.TextCardBottom}>Mes = ${montoMes}</Text>
          <View style={{ height: 40 }}></View>
        </View>
  
      </ImageBackground>
    );
  };
  
  export default Tarjeta;