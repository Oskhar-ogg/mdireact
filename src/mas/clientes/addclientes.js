import React, { useState, useEffect } from "react"
import { ScrollView, SafeAreaView, View, Button, TouchableOpacity, TextInput, Switch, Image, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { Card, Text, CheckBox } from "@rneui/base"
import BottomBar from "../../componentes/bottombar"
import styles from "../../style"

import{saveCliente} from "../../../api"

export default function AgregarCliente (){
    const navigation = useNavigation()
    const [clienteData, setClienteData] = useState({
        cliente_nombre: '',
        cliente_direccion: '',
        cliente_telefono: '',
        cliente_tipo: '',
        comuna_id: '',
    })
    const handleInputChange = (key, value) => {
          setClienteData({ ...clienteData, [key]: value })
        }

    const handleAgregarCliente = async () => {
        if (clienteData.cliente_nombre && clienteData.cliente_direccion && clienteData.cliente_telefono && clienteData.cliente_tipo && clienteData.comuna_id) {
          const result = await saveCliente(clienteData)
          if (result.error) {
            Alert.alert('Error', result.error)
          } else {
            Alert.alert('Cliente agregado', 'El cliente ha sido agregado exitosamente')
            navigation.goBack()
          }
        } else {
          Alert.alert('Datos incompletos', 'Por favor, completa todos los datos para continuar')
        }
    }    


    return(
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.CitaList} >
            <Card>
            <Text h4>Nombre</Text>   
            <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={clienteData.cliente_nombre}
            onChangeText={(text) => handleInputChange('cliente_nombre', text)}
            /><Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Dirección</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Collao 1202"
            value={clienteData.cliente_direccion}
            onChangeText={(text) => handleInputChange('cliente_direccion', text)}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Teléfono</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: 9 1111 1111"
            value={clienteData.cliente_telefono}
            maxLength={9}
            keyboardType={'numeric'}
            onChangeText={(text) => handleInputChange('cliente_telefono', text)}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Comuna</Text>
            <CheckBox
              title="Talcahuano"
              checked={clienteData.comuna_id === '1'}
              onPress={() => handleInputChange('comuna_id', '1')}
            />
            <CheckBox
              title="Concepción"
              checked={clienteData.comuna_id === '2'}
              onPress={() => handleInputChange('comuna_id', '2')}
            />
            <CheckBox
              title="Hualpén"
              checked={clienteData.comuna_id === '3'}
              onPress={() => handleInputChange('comuna_id', '3')}
            />
            <CheckBox
              title="San pedro de la paz"
              checked={clienteData.comuna_id === '4'}
              onPress={() => handleInputChange('comuna_id', '4')}
            />
            <CheckBox
              title="Penco "
              checked={clienteData.comuna_id === '6'}
              onPress={() => handleInputChange('comuna_id', '5')}
            />
            <CheckBox
              title="Tomé"
              checked={clienteData.comuna_id === '7'}
              onPress={() => handleInputChange('comuna_id', '6')}
            />
            <CheckBox
              title="Chiguayante"
              checked={clienteData.comuna_id === '5'}
              onPress={() => handleInputChange('comuna_id', '7')}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Tipo de cliente</Text>
            <CheckBox
              title="Particular"
              checked={clienteData.cliente_tipo === 'Particular'}
              onPress={() => handleInputChange('cliente_tipo', 'Particular')}
            />
            <CheckBox
              title="Empresa"
              checked={clienteData.cliente_tipo === 'Empresa'}
              onPress={() => handleInputChange('cliente_tipo', 'Empresa')}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
             <Card.Divider />
                <Button title="Registrar nuevo cliente" onPress={handleAgregarCliente} />
            </Card>
            </View>
            </ScrollView>
            <View style={{ height: 50 }}></View>
        <BottomBar styles = {styles.bottomBar}/>
    </View>
   )   
}