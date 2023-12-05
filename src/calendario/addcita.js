import React, {useState} from 'react'
import { SafeAreaView, View, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../componentes/bottombar'
import styles from '../style'
import { Card, Text } from '@rneui/themed'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
//CONEXIÓN A LA API 
import { saveAgenda } from '../../api'

export default function AgregarCita (){
//ZONA DEFINICIÓN DE PARAMETROS DE LA CITA GUARDADA EN LA AGENDA
    const navigation = useNavigation()
    const [citaData, setCitaData] = useState({
        agenda_cliente: '',
        agenda_direccion:'',
        agenda_motivo: '',
        agenda_comuna: '',
        agenda_hora: '00:00', // Formato HH:mm
        agenda_fecha: new Date().toISOString().split('T')[0], // Formato yyyy-mm-dd
        tecnico_id: 1,
    })
    const [picker, setPicker] = useState();

    const handleInputChange = (key, value) => {
        if (key === 'agenda_comuna') {
          // Si la clave es 'agenda_comuna', asigna directamente el valor seleccionado
          setCitaData({ ...citaData, agenda_comuna: value });
        } else {
          // Para otras claves, asigna el valor normalmente
          setCitaData({ ...citaData, [key]: value })
        }
      }
      
// IMPLEMENTACIÓN FUNCIONES DATETIMEPICKER DE ANDROID
    const handleDateConfirm = (event, selectedDate) => {
    if (selectedDate) {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`
    handleInputChange('agenda_fecha', formattedDate)
    }
    hideDatePicker()
  
    };
    const handleTimeConfirm = (event, selectedTime) => {
       if (selectedTime) {
        const hours = String(selectedTime.getHours()).padStart(2, '0');
        const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`
        handleInputChange('agenda_hora', formattedTime)
       }
          hideTimePicker()
    }
    const [isDatePickerVisible, setDatePickerVisible] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisible(true)
    }

    const hideDatePicker = () => {
    setDatePickerVisible(false)
    }
    
    const [isTimePickerVisible, setTimePickerVisible] = useState(false)

    const showTimePicker = () => {
    setTimePickerVisible(true)
    }

    const hideTimePicker = () => {
    setTimePickerVisible(false)
    }

     const handleAgregarCita = () => {
        try{
            saveAgenda(citaData)
            navigation.navigate('Agenda')
        }
        catch(error){
            console.error("Error al agregar la cita en la agenda 🚫🚫")
        }
     }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.CitaList} >
            <Card>
             <Card.Title h2>Reservación hora visita</Card.Title>
             <Text h4>Nombre</Text>   
            <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={citaData.agenda_nombre}
            onChangeText={(text) => handleInputChange('agenda_cliente', text)}
            /><Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Dirección</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Collao 1202"
            value={citaData.agenda_direccion}
            onChangeText={(text) => handleInputChange('agenda_direccion', text)}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Comuna</Text>
            <Picker
            style={{ color: 'black', borderColor: 'gray', borderWidth: 0.2, bold: true }}
            focus={true}
            selectedValue={picker}
            onValueChange={(itemValue, itemIndex) =>
            handleInputChange('agenda_comuna', itemValue)
            }>
            <Picker.Item label="1 - Talcahuano" value="Talcahuano"/>
            <Picker.Item label="2 - Concepción" value="Concepción"/>
            <Picker.Item label="3 - Hualpén" value="Hualpén"/>
            <Picker.Item label="4 - San Pedro de la paz" value="San pedro de la paz"/>
            <Picker.Item label="5 - Penco" value="Penco"/>
            <Picker.Item label="6 - Tomé" value="Tomé"/>
            <Picker.Item label="7 - Chiguayante" value="Chiguayante"/>
            </Picker>
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4 >Motivo</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Instalación de calefont"
            value={citaData.agenda_motivo}
            onChangeText={(text) => handleInputChange('agenda_motivo', text)}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Fecha de la cita</Text>
            <TouchableOpacity onPress={showDatePicker}>
            <Text h4>{citaData.agenda_fecha || 'Fecha'}</Text>
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
            <Text h4>Hora de la cita</Text>
            <TouchableOpacity onPress={showTimePicker}>
            <Text h4>{citaData.agenda_hora || 'Hora'}</Text>
            </TouchableOpacity>
            {isTimePickerVisible && (
            <DateTimePickerAndroid
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleTimeConfirm}
            />
            )}
             <Card.Divider />
                <Button title="Agregar Cita" onPress={handleAgregarCita} />
            </Card>
            </View>
            </ScrollView>
            <View style={{ height: 80 }}></View>
        <BottomBar styles = {styles.bottomBar}/>
    </SafeAreaView>
   )   
}