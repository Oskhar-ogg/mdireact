import React, { useState, useEffect } from "react"
import { ScrollView, SafeAreaView, View, Button, TouchableOpacity, TextInput, Switch, Image, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { Card, Text, CheckBox } from "@rneui/base"
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import BottomBar from "../componentes/bottombar"
import * as ImagePicker from 'expo-image-picker'
import styles from "../style"
import axios from 'axios'
//CONEXIÓN DE LA API
import { saveBitacora } from "../../api"

export default function AgregarBitacora() {

  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const navigation = useNavigation()
  const handleBitacoraPress = () => {
    navigation.navigate('Bitácoras')
  }

  const estadoInicial = {
    bitacora_title: '',
    bitacora_description: '',
    bitacora_trabajo: '',
    bitacora_estado: '',
    bitacora_valor_cobrado: '0',
    bitacora_fecha: new Date().toLocaleDateString(), // Formato yyyy-mm-dd
    tecnico_id: 1,
  };

  const resetAddbitacora = () => {
    setBitacoraData(estadoInicial)
  }

  const [bitacoraData, setBitacoraData] = useState(estadoInicial)

  const handleInputChange = (key, value) => {
    setBitacoraData({ ...bitacoraData, [key]: value })
  }

  const handleImageUpload = (imageUrl) => {
    setBitacoraData({ ...bitacoraData, bitacora_imageURL: imageUrl })
  }

  const handleAgregarBitacora = async () => {
    if (
      !bitacoraData.bitacora_title ||
      !bitacoraData.bitacora_description ||
      !bitacoraData.bitacora_trabajo ||
      !bitacoraData.bitacora_estado
    ) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }
    try {
      const response = await saveBitacora(bitacoraData)
      if (response.error) {
        console.error(response.error)
        alert('Error al guardar la bitácora. Por favor, inténtalo de nuevo.')
      } else {
        alert('Bitácora guardada exitosamente.')
        resetAddbitacora()
        handleBitacoraPress()
      }
    } catch (error) {
      console.error(error)
      alert('Error al guardar la bitácora. Por favor, inténtalo de nuevo.')
    }
  }

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleDateConfirm = (event, selectedDate) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const formattedDate = `${day}-${month}-${year}`
      handleInputChange('bitacora_fecha', formattedDate)
    }
    hideDatePicker()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.addList}>
        <Card style={styles.Card}>

          <Text h4>Título de trabajo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Instalación de calefont"
            value={bitacoraData.bitacora_title}
            onChangeText={(text) => handleInputChange('bitacora_title', text)}
          /><Text style={{ color: 'red' }}>*Obligatorio</Text>
          <Card.Divider />
          <Text h4>Descripción del trabajo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Instalación calefont en cocina"
            value={bitacoraData.bitacora_description}
            onChangeText={(text) => handleInputChange('bitacora_description', text)}
          /><Text style={{ color: 'red' }}>*Obligatorio</Text>
          <Card.Divider />
          <View>
            <Text h4>Selecciona un trabajo:</Text>
            <CheckBox
              title="Visita de inspección"
              checked={bitacoraData.bitacora_trabajo === 'Visita de inspección'}
              onPress={() => handleInputChange('bitacora_trabajo', 'Visita de inspección')}
            />
            <CheckBox
              title="Mantenimiento"
              checked={bitacoraData.bitacora_trabajo === 'Mantenimiento'}
              onPress={() => handleInputChange('bitacora_trabajo', 'Mantenimiento')}
            />
            <CheckBox
              title="Reparación"
              checked={bitacoraData.bitacora_trabajo === 'Reparación'}
              onPress={() => handleInputChange('bitacora_trabajo', 'Reparación')}
            />
            <CheckBox
              title="Instalación"
              checked={bitacoraData.bitacora_trabajo === 'Instalación'}
              onPress={() => handleInputChange('bitacora_trabajo', 'Instalación')}
            />
            <CheckBox
              title="Toma de medidas"
              checked={bitacoraData.bitacora_trabajo === 'Toma de medidas'}
              onPress={() => handleInputChange('bitacora_trabajo', 'Toma de medidas')}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
          </View>
          <Card.Divider />  
            <Text h4>Selecciona un estado:</Text>
            <ScrollView horizontal>
            <CheckBox
              title="Vigente"
              checked={bitacoraData.bitacora_estado === 'Vigente'}
              onPress={() => handleInputChange('bitacora_estado', 'Vigente')}
            />
            <CheckBox
              title="Finalizado"
              checked={bitacoraData.bitacora_estado === 'Finalizado'}
              onPress={() => handleInputChange('bitacora_estado', 'Finalizado')}
            />
            </ScrollView>
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
          <Card.Divider />
          <View>
            <Text h4>¿Hubo remuneración?</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={toggleSwitch}
            />
            {isSwitchOn && (
              <TextInput
                style={styles.input}
                placeholder="$0"
                keyboardType="numeric"
                value={bitacoraData.bitacora_valor_cobrado}
                onChangeText={(text) => handleInputChange('bitacora_valor_cobrado', text)}
              />)}
          </View>
          <Card.Divider />
          <Text>Fecha</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text h4>{bitacoraData.bitacora_fecha || 'Fecha'}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePickerAndroid
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateConfirm}
              maximumDate={new Date()}
            />
          )}
          <Card.Divider />
          <Button title="Agregar registro" onPress={handleAgregarBitacora} />
        </Card>
      </ScrollView>
      <View style={{ height: 50 }}></View>
      <BottomBar />
    </SafeAreaView>
  )
}
