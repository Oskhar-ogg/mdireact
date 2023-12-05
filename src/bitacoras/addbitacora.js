import React, { useState, useEffect } from "react"
import { ScrollView, SafeAreaView, View, Button, TouchableOpacity, TextInput, Switch } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { Card, Text, CheckBox } from "@rneui/base"
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import BottomBar from "../componentes/bottombar"
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'


import styles from "../style"
//CONEXIÓN DE LA API
import { saveBitacora } from "../../api"

export default function AgregarBitacora() {

  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState([])
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const navigation = useNavigation()
  const handleBitacoraPress = () => {
    navigation.navigate('Bitácoras')
  }

  const [bitacoraData, setBitacoraData] = useState({
    bitacora_title: '',
    bitacora_description: '',
    bitacora_trabajo: '',
    bitacora_estado: '',
    bitacora_valor_cobrado: '0',
    bitacora_fecha: new Date().toISOString().split('T')[0], // Formato yyyy-mm-dd
    tecnico_id: 1,
  });

  const handleInputChange = (key, value) => {
    setBitacoraData({ ...bitacoraData, [key]: value })
  };

  const handleAgregarBitacora = () => {
    if (
      !bitacoraData.bitacora_title ||
      !bitacoraData.bitacora_description ||
      !bitacoraData.bitacora_trabajo ||
      !bitacoraData.bitacora_estado
    ) {
      // Mostrar un mensaje de error o alerta
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }
    const data = {
      ...bitacoraData,
      media: selectedMedia, // Cambié el nombre de 'images' a 'media' para abarcar tanto imágenes como videos
    }
    console.log(data)
    try {
      saveBitacora(data)
      handleBitacoraPress()
      // Lógica adicional después de agregar la bitácora (por ejemplo, actualizar la lista de bitácoras)
    } catch (error) {
      console.log(error)
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
  };

  const handleSelectImages = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newMedia = [...selectedMedia, { uri: result.uri, type: 'image' }]
        setSelectedMedia(newMedia)
      }
    } catch (error) {
      console.log("Error al seleccionar imágenes:", error)
    }
  }

  const handleSelectMedia = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Permite seleccionar tanto imágenes como videos
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        const newMedia = [...selectedMedia, { uri: result.uri, type: 'image' }]
        setSelectedMedia(newMedia)
      }
    } catch (error) {
      console.log("Error al seleccionar media:", error)
    }
  }

  // Asegúrate de solicitar los permisos al cargar la pantalla
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Se necesita permiso para acceder a la galería de imágenes.")
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.addList}>
        <Card style={styles.Card}>
          <Card.Title h3>REGISTRO DE TRABAJO</Card.Title>
          <Card.Divider />
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
          <View>
            <Text h4>Selecciona un estado:</Text>
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
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
          </View>
          <Card.Divider />
          <View>
          <Text h4>Subir imagen o Video:</Text>
            <TouchableOpacity onPress={handleSelectImages}>
              <AntDesign name="camera" size={55} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectMedia}>
              <AntDesign name="picture" size={55} color="black" />
            </TouchableOpacity>
            <ScrollView horizontal>
              {selectedMedia.map((media, index) => (
                <View key={index} style={{ marginRight: 10 }}>
                  {media.type.startsWith("image/") ? (
                    <Image source={{ uri: media.uri }} style={{ width: 100, height: 100 }} />
                  ) : (
                    <Video
                      source={{ uri: media.uri }}
                      style={{ width: 100, height: 100 }}
                      useNativeControls
                      resizeMode="contain"
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
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
            />
          )}
          <Card.Divider />
          <Button title="Agregar registro" onPress={handleAgregarBitacora} />
        </Card>
        <View style={{ height: 80 }}></View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}
