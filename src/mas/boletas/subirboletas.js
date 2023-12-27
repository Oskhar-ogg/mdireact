import React, { useState } from 'react';
import { View, TextInput, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; // Import axios for making HTTP requests

const SubirBoletas = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imagenes, setImagenes] = useState([]);

  const handleSelectImages = async () => {
    try {
      if (selectedMedia) {
        Alert.alert('Error', 'Solo se permite subir 1 foto.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        // Accede a los activos seleccionados a través de "assets" en lugar de "uri"
        const newMedia = { uri: result.assets[0].uri, type: 'image', name: 'image.jpeg' };
        setSelectedMedia(newMedia);
        setImagenes([newMedia.uri]);
      }
    } catch (error) {
      console.log("Error al seleccionar imágenes:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedMedia) {
      Alert.alert('Error', 'Debes seleccionar una foto antes de subirla.');
      return;
    }

    if (!monto) {
      Alert.alert('Error', 'Debes ingresar un monto antes de subir el archivo.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedMedia,
        type: 'image/jpeg',
        name: 'filename.jpg',});
      formData.append('text', monto);
      formData.append('date', fecha);

      const response = await axios.post('http://192.168.1.93:3001/boletas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Archivo subido exitosamente.');
      } else {
        console.error('Error al subir el archivo:', response.status);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error.message);
      Alert.alert('Error', 'Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const eliminarImagen = () => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estás seguro de que quieres eliminar la imagen seleccionada?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            setSelectedMedia(null);
            setImagenes([]);
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View>
        <Button title="Seleccionar foto" onPress={handleSelectImages} />
        {!!selectedMedia && (
          <TouchableOpacity onPress={eliminarImagen}>
            <View>
              <Image source={{ uri: selectedMedia.uri }} style={{ width: 200, height: 200 }} />
            </View>
          </TouchableOpacity>
        )}
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
    </ScrollView>
  );
};

export default SubirBoletas;
