//SECTOR DE IMPORTS UTILIZADOS
import React from 'react'
import { View} from 'react-native'
import styles from './style'
import BottomBar from './componentes/bottombar'
import { Button, Text, Card} from '@rneui/base'
import Tarjeta from './componentes/tarjeta'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
//----------------------------------------------------------------------------------------
//SECTOR VENTANA INICIO 
export default function Inicio () {
    const navigation = useNavigation();
    const handleAgregarBitacoraPress = () => {
        navigation.navigate('Agregar Bitácora')
        }
    
        const handleAgregarCitapress = () => {
        navigation.navigate('Agregar Nueva Cita')
        }
    
        const handleListaClientesPress = () => {
        navigation.navigate('Clientes')
        }
    return(
        <View style={styles.container}>
            <View style={styles.TopContainer}>
                <View style={styles.imageContainer}>
                    <Tarjeta />
                </View>
            </View>
            <View style ={styles.BottomContainer}>
                <Card style ={styles.Cardinit}>
                <Card.Title h3>Accesos Frecuentes</Card.Title>
                <Button
                    icon={<AntDesign name="addfile" size={24} color="white" />}
                    style={styles.buttonInit}
                    title=" Agregar Bitácora"
                    onPress={handleAgregarBitacoraPress}
                    color={'#08546c'}
                    size='md'
                    />
                <Text style={styles.TextCard}></Text>
                <Button
                    icon={<FontAwesome name="calendar-plus-o" size={24} color="white" />}
                    style={styles.buttonInit}
                    title=" Registrar Cita"
                    onPress={handleAgregarCitapress}
                    color={'#08546c'}
                    size='md'
                />
                <Text style={styles.TextCard}></Text>
                <Button
                    icon={<FontAwesome name="user" size={24} color="white" />}
                    style={styles.buttonInit}
                    title=" Lista de clientes"
                    onPress={handleListaClientesPress}
                    color={'#08546c'}
                    size='md'
                />                   
                </Card>
                <View style={{ height: 80 }}></View>
            </View>
        <View style={styles.bottomBar}><BottomBar/></View>            
        </View>
    );
};
//----------------------------------------------------------------------------------------