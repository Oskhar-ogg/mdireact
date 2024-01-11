import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomBar from '../../componentes/bottombar';
import { Card } from '@rneui/base';

const imgDir = FileSystem.documentDirectory + 'imagenes/facturas/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function ListaBoletas() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleView, setIsModalVisibleView] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists()
    const filename = 'factura ' + new Date().getTime() + '.jpeg'
    const dest = imgDir + filename
    await FileSystem.copyAsync({ from: uri, to: dest })
    setImages([...images, dest])
  }

  const openAmountModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeAmountModal = () => {
    setIsModalVisible(false);
    setInvoiceAmount('');
  };

  const openViewModal = (image) => {
    setSelectedImage(image);
    setIsModalVisibleView(true);
  }

  const closeViewModal = () => {
    setIsModalVisibleView(false);
  }

  const sendData = async () => {
    setUploading(true);
  
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('amount', invoiceAmount);
  
      console.log('Sending formData:', formData);
  
      const response = await fetch('http://146.83.194.142:1414/facturas', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      setInvoiceAmount('');
      setSelectedImage(null);
      closeAmountModal();
      Alert.alert('Éxito', 'La imagen y el monto han sido enviados con éxito.');
    } catch (error) {
      console.error('Error in sendData:', error);
      setUploading(false);
      closeAmountModal();
      Alert.alert(
        'Error',
        'Hubo un problema al enviar la imagen y el monto. Inténtalo de nuevo.'
      );
    }
  };

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  const renderItem = ({ item }) => {
    const filename = item.split('/').pop();
    return (
      <TouchableOpacity onPress={() => openViewModal(item)}>
        <Card>
          <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
            <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
            <Text style={{ flex: 1 }}>{filename}</Text>
            <Ionicons.Button name="cloud-upload" onPress={() => openAmountModal(item)} />
            <Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor: '#033342' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
        <Button title="Subir desde galería" onPress={() => selectImage(true)} />
        <Button title="Capturar imagen" onPress={() => selectImage(false)} />
      </View>
      <FlatList data={images} renderItem={renderItem} />
      {uploading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
      <Modal visible={isModalVisible} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300 }}>
            {selectedImage && (
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'contain', marginBottom: 10 }}
                source={{ uri: selectedImage }}
              />
            )}
            <Text>Ingrese el monto de la factura:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 8 }}
              keyboardType="numeric"
              value={invoiceAmount}
              onChangeText={(text) => setInvoiceAmount(text)}
            />
            <Button title="Enviar" onPress={() => sendData()} />
            <Button title="Cancelar" onPress={() => closeAmountModal()} />
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisibleView} transparent={true} onDismiss={closeViewModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#08546c', padding: 10, borderRadius: 10, width: 375, height: 700 }}>
            {selectedImage && (
              <Image
                style={{ width: '100%', height: '90%', resizeMode: 'center' }}
                source={{ uri: selectedImage }}
              />
            )}
            <Button title="Cerrar" onPress={() => closeViewModal()} />
          </View>
        </View>
      </Modal>
      <View style={{ height: 40 }}></View>
      <BottomBar />
    </SafeAreaView>
  );
}
