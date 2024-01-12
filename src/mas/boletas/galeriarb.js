import React, { useState, useEffect } from 'react'
import { View, Image, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import BottomBar from '../../componentes/bottombar'
import { Card, Button, Text } from '@rneui/base'
import styles from '../../style'

const Galeriaboletas = () => {
  const [photos, setPhotos] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_API_URL + '/boletas')
      .then(response => response.json())
      .then(data => setPhotos(data))
      .catch(error => console.error(error))
  }, [])

  const toggleModal = (imageURL) => {
    setSelectedImage(imageURL)
    setIsModalVisible(!isModalVisible)
  }

  const renderPhoto = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleModal(item.imageURL)}>
      <Card>
        <Card.Title>{new Date(item.fecha).toLocaleDateString()}</Card.Title>
        <Image source={{ uri: item.imageURL }} style={{ width: 150, height: 150 }} key={index} />
        <Card.Title>${item.valor}</Card.Title>
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item, index) => index.toString()} // Utiliza el índice como clave
        numColumns={2}
      />
    <Modal visible={isModalVisible} transparent={true} onRequestClose={() => toggleModal(null)}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#08546c', width: 400, height: 575 }}>
            {selectedImage && (
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={{ uri: selectedImage }}
              />
            )}
           <Button title="Cerrar" onPress={() => toggleModal(null)} />
          </View>
        </View>
      </Modal>
      <View style={{ height: 70 }}></View>
      <BottomBar />
    </View>
  )
}


export default Galeriaboletas
