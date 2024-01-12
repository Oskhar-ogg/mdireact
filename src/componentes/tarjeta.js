// SECTOR DE IMPORTS UTILIZADOS
import React, { useEffect, useState } from 'react'
import { View, ImageBackground } from 'react-native'
import { Text } from '@rneui/base'
// conexión api
import { MontoMesBitacora, MontoBitacora, gastoMesBoletasApi, gastoMesFacturasApi } from '../../api.js'
import styles from '../style'

const Tarjeta = () => {
  const [montoMes, setMontoMes] = useState('')
  const [montoTotal, setMontoTotal] = useState('')
  const [mesBoletas, setGastoMesBoletas] = useState('')
  const [mesFacturas, setGastoMesFacturas] = useState('')

  useEffect(() => {
    obtenerMontoMes()
    obtenerMontoTotal()
    obtenerGastoMesBoletas()
    obtenerGastoMesFacturas()
  }, []) 

  const obtenerMontoMes = async () => {
    try {
      const monto = await MontoMesBitacora()
      if (monto >= 0) {
        setMontoMes(monto)
      } else {
        console.error('La respuesta de obtenerMontoMes no es válida:', monto)
      }
    } catch (error) {
      console.error('Error al obtener el monto del mes:', error)
    }
  }

  const obtenerGastoMesBoletas = async () => {
    try {
      const monto = await gastoMesBoletasApi()
      console.log(monto)
      if (monto >= 0) {
        setGastoMesBoletas(monto)
      } else {
        console.error('La respuesta de gastoMesBoletas no es válida:', monto)
      }
    } catch (error) {
      console.error('Error al obtener el monto del mes:', error)
    }
  }

  const obtenerGastoMesFacturas = async () => {
    try {
      const monto = await gastoMesFacturasApi()
      console.log(monto)
      if (monto >= 0) {
        setGastoMesFacturas(monto)
      } else {
        console.error('La respuesta de gastoMesFacturas no es válida:', monto)
      }
    } catch (error) {
      console.error('Error al obtener el monto del mes:', error)
    }
  }

  const obtenerMontoTotal = async () => {
    try {
      const monto = await MontoBitacora()
      if (monto >= 0) {
        setMontoTotal(monto)
      } else {
        console.error('La respuesta de obtenerMontoTotal no es válida:', monto)
      }
    } catch (error) {
      console.error('Error al obtener el monto total:', error)
    }
  }

  const SumGastos = () => {
    const gastoMesBoletasNumero = parseInt(mesBoletas, 10)
    const gastoMesFacturasNumero = parseInt(mesFacturas, 10)
  
    // Sumar los números
    const sumaGastos = gastoMesBoletasNumero + gastoMesFacturasNumero
  
    return sumaGastos
  }

  const Balance = () => {
    const montoMesNumero = parseInt(montoMes, 10)
    const sumaGastosNumero = parseInt(SumGastos(), 10)
  
    // Sumar los números
    const balance = montoMesNumero - sumaGastosNumero
  
    return balance
  }
  

  return (
    <ImageBackground source={require('../../assets/tarjeta.jpg')} style={styles.image}>
      <View style={styles.textContainer}>
        <Text h3 style={styles.Text}>
          Bienvenido
        </Text>
        <Text h4 style={styles.TextCardBottom}>
          Ingreso acumulado = ${montoTotal}
        </Text>
        <Text h4 style={styles.TextCardBottom}>
          Ingreso mes = ${montoMes}
        </Text>
        <Text h4 style={styles.TextCardBottom2}>
          Gastos mes = ${SumGastos() ?? 0 }
        </Text>
        <Text h4 style={styles.Text}>
        Balance mes = ${(Balance() ?? 0)}
        <Text style={{ color: (Balance()) >= 0 ? 'green' : 'red' }}>
        {(Balance()) >= 0 ? ' (Superávit)' : ' (Déficit)'}
        </Text>
        </Text>
        <View style={{ height: 80 }}></View>
      
      </View>
    </ImageBackground>
  )
}
export default Tarjeta
