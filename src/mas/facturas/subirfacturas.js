import React, { useState } from 'react'
import { View, TextInput, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

const SubirFacturas = () => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSelectImages = async () => {
    try {
      if (selectedMedia) {
        alert('Solo se permite subir 1 foto.')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      })

      if (!result.canceled) {
        // Accede a los activos seleccionados a través de "assets" en lugar de "uri"
        const newMedia = { uri: result.assets[0].uri, type: 'image', name: 'image.jpeg' }
        setSelectedMedia(newMedia)
      }
    } catch (error) {
      console.log("Error al seleccionar imágenes:", error)
    }
  }

  const handleUpload = async () => {
    if (!selectedMedia) {
      alert('Debes seleccionar una foto antes de subirla.')
      return
    }

    if (!monto) {
      alert('Debes ingresar un monto antes de subir el archivo.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', selectedMedia)
      formData.append('text', monto)
      formData.append('date', fecha)

      const response = await fetch('https://example.com/upload/facturas', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.ok) {
        console.log('Archivo subido exitosamente.')
      } else {
        console.error('Error al subir el archivo:', response.status)
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error)
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha
    setShowDatePicker(false)
    setFecha(currentDate)
  }

  return (
    <View>
      <Button title="Seleccionar foto" onPress={handleSelectImages} />
      {selectedMedia && <Image source={{ uri: selectedMedia.uri }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder="Monto en CLP"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Subir archivo" onPress={handleUpload} />
    </View>
  )
}

export default SubirFacturas
