import React, { useState, useEffect } from 'react'
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
  TouchableOpacity
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import Ionicons from '@expo/vector-icons/Ionicons'
import styles from '../../style'
import BottomBar from '../../componentes/bottombar'
import { Card } from '@rneui/base'

const imgDir = FileSystem.documentDirectory + 'imagenes/boletas/'

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
  }
}

export default function ListaBoletas() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    await ensureDirExists()
    const files = await FileSystem.readDirectoryAsync(imgDir)
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f))
    }
  }

  const selectImage = async (useLibrary) => {
    let result
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.75
    }

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options)
    } else {
      await ImagePicker.requestCameraPermissionsAsync()
      result = await ImagePicker.launchCameraAsync(options)
    }

    // Save image if not cancelled
    if (!result.canceled) {
      saveImage(result.assets[0].uri)
    }
  }

  // Save image to file system
  const saveImage = async (uri) => {
    await ensureDirExists()
    const filename = new Date().getTime() + '.jpeg'
    const dest = imgDir + filename
    await FileSystem.copyAsync({ from: uri, to: dest })
    setImages([...images, dest])
  }

  // Upload image to server
  const uploadImage = async (uri) => {
    setUploading(true)

    await FileSystem.uploadAsync('http://192.168.1.93:3001/subir/boleta', uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file'
    })

    setUploading(false)
  }

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri)
    setImages(images.filter((i) => i !== uri))
  }
  
  const renderItem = ({ item }) => {
    const filename = item.split('/').pop()
    return (
      <TouchableOpacity onPress={() => setSelectedImage(item)}>
        <Card>
          <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
            <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
            <Text style={{ flex: 1 }}>{filename}</Text>
            <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item)} />
            <Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor:'#033342' }}>
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
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}

      <Modal visible={selectedImage !== null} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={{ uri: selectedImage }}
          />
          <Button  title="Cerrar" onPress={() => setSelectedImage(null)} color="red" />
        </View>
        <View style={{ height: 80 }}></View>
      </Modal>

      <View style={{ height: 40 }}></View>
      <BottomBar />
    </SafeAreaView>
  )
}
