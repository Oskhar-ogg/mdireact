import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SubirImagen = () => {
    const [imagenes, setImagenes] = useState([]);

    const guardarImagen = async (imagen) => {
        // Aquí debes llamar a tu API para guardar la imagen y obtener la URL
        const url = await tuAPI.guardarImagen(imagen);
        return url;
    };

    const seleccionarImagenes = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permiso denegado para acceder a la biblioteca de medios');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            maxNumberOfFiles: 5 - imagenes.length, // Limitar a un máximo de 5 fotos
        });

        if (!result.cancelled) {
            const url = await guardarImagen(result.uri);
            setImagenes([...imagenes, url]);
        }
    };

    return (
        <View>
            {imagenes.map((imagen, index) => (
                <Image key={index} source={{ uri: imagen }} style={{ width: 200, height: 200 }} />
            ))}
            <Button title="Seleccionar imágenes" onPress={seleccionarImagenes} />
        </View>
    );
};

export default SubirImagen;
