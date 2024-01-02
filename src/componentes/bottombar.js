//SECTOR DE IMPORTS UTILIZADOS
import React from 'react'
import { View, TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import styles from '../style'
import {Text} from '@rneui/themed'

const BottomBar = () =>{
    const navigation = useNavigation()

    const handleInicioPress = () => {
    navigation.navigate('Inicio')
    }

    const handleInventarioPress = () => {
    navigation.navigate('Inventario')
    }

    const handleAgendaPress = () => {
    navigation.navigate('Agenda')
    }

    const handleMasPress = () => {
    navigation.navigate('Más')
    }

    const handleBitacoraPress = () => {
    navigation.navigate('Bitácoras')
    }
    return( 
    <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleInicioPress}>
          <FontAwesome name="home" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleInventarioPress}>
          <FontAwesome name='list-alt' size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Inventario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton1} onPress={handleBitacoraPress}>
          <FontAwesome name="clipboard" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Bitácora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAgendaPress}>
          <FontAwesome name="calendar" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMasPress}>
          <FontAwesome name="window-restore" size={24} color="#ffffff" />
          <Text style={styles.buttonText}> Más</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    )
}

export default BottomBar