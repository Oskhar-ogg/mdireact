import React, { useState } from 'react';
import { View, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const SubirImagen = () => {
    const [imagenes, setImagenes] = useState([]);

    const guardarImagen = async (imagen) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imagen,
                type: 'image/jpeg',
                name: 'filename.jpg',
            });

            const response = await axios.post('http://192.168.1.93:3001/subir/bitacora', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;
            return data.url;
        } catch (error) {
            console.error('Error in guardarImagen:', error);

            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    console.error('Network Error - No response received');
                } else {
                    console.error('Request failed with status:', error.response.status);
                }
            } else {
                console.error('Non-Axios error:', error.message);
            }

            throw error; 
        }
    };

    const seleccionarImagenes = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permiso denegado para acceder a la biblioteca de medios');
            return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            maxNumberOfFiles: 10 - imagenes.length, // Limitar a un máximo de 10 fotos
        });
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const url = await guardarImagen(result.assets[0].uri);
            setImagenes([...imagenes, url]);
        }
    };
    
    

    const eliminarImagen = (index) => {
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
                        const nuevasImagenes = imagenes.filter((_, i) => i !== index);
                        setImagenes(nuevasImagenes);
                    },
                    style: 'destructive',
                },
            ],
        );
    };

    return (
        <View>
            <Text h4>Subir imágenes</Text>
            <Text style={{ color: 'red' }}>*Máximo 10 fotos</Text>
            <ScrollView horizontal>
                {imagenes.map((imagen, index) => (
                    <TouchableOpacity onPress={() => eliminarImagen(index)} key={index}>
                        <View>
                            <Image source={{ uri: imagen }} style={{ width: 200, height: 200 }} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={seleccionarImagenes}>
                <AntDesign name="camera" size={55} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default SubirImagen;
