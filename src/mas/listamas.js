import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import BottomBar from "../componentes/bottombar"
import styles from "../style";
import { AntDesign } from '@expo/vector-icons';

export default function ListaMas() {

  const navigation = useNavigation()
  // Array con las opciones
  const opciones = [
    'Boletas',
    'Facturas',
    'Clientes',
    'Mantenciones Realizadas',
    'Opciones',
  ];

  const handleMasPress = (opcion) => {
    navigation.navigate(opcion);
  };

  return (
    <View style={styles.OptionsContainer}>
      {/* Iterar sobre el array de opciones */}
      {opciones.map((opcion, index) => (
        <TouchableOpacity key={index}>
          <ListItem bottomDivider>
            <Icon name="chevron-right" type="evilicon" color="#000" />
            <ListItem.Content>
              <ListItem.Title h4 onPress={() => handleMasPress(opcion)}>{opcion}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
      <View style={styles.bottomBar}><BottomBar /></View>
    </View>
  );
}
