import React, {useState} from 'react'
import { SafeAreaView, View, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../componentes/bottombar'
import styles from '../style'
import { Card, Text, CheckBox } from '@rneui/themed'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import Calendario from '../componentes/calendario'
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
        agenda_hora: '09:00', // Formato HH:mm
        agenda_fecha: new Date().toLocaleDateString(), // Formato yyyy-mm-dd
        tecnico_id: 1,
    })
    const handleInputChange = (key, value) => {
          setCitaData({ ...citaData, [key]: value })
        }
      
      
// IMPLEMENTACIÓN FUNCIONES DATETIMEPICKER DE ANDROID
const handleDateConfirm = (event, selectedDate) => {
    if (selectedDate) {
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const formattedDate = `${day}-${month}-${year}`
    handleInputChange('agenda_fecha', formattedDate)
    }
    hideDatePicker()
    }

    const handleTimeConfirm = (event, selectedTime) => {
    if (selectedTime) {
    const hours = String(selectedTime.getHours()).padStart(2, '0')
    const minutes = String(selectedTime.getMinutes()).padStart(2, '0')
    const formattedTime = `${hours}:${minutes}`
    handleInputChange('agenda_hora', formattedTime)
    }
    hideTimePicker();
    };
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
      try {
        // Verificar errores antes de guardar la cita
        if (
          !citaData.agenda_cliente ||
          !citaData.agenda_direccion ||
          !citaData.agenda_comuna ||
          !citaData.agenda_motivo
        ) {
          console.error("Faltan campos obligatorios 🚫🚫");
          return;
        }
    
        // Guardar la cita
        saveAgenda(citaData);
        navigation.navigate('Agenda');
        Calendario.cargarItems();
      } catch (error) {
        console.error("Error al agregar la cita en la agenda 🚫🚫", error);
      }
    };
    

    return(
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.CitaList} >
            <Card style={styles.Card}>
            <Text h4>Nombre del cliente</Text>   
            <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={citaData.agenda_nombre}
            onChangeText={(text) => handleInputChange('agenda_cliente', text)}
            /><Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Dirección de reunión</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Collao 1202"
            value={citaData.agenda_direccion}
            onChangeText={(text) => handleInputChange('agenda_direccion', text)}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4>Comuna</Text>
            <CheckBox
              title="Talcahuano"
              checked={citaData.agenda_comuna === 'Talcahuano'}
              onPress={() => handleInputChange('agenda_comuna', 'Talcahuano')}
            />
            <CheckBox
              title="Concepción"
              checked={citaData.agenda_comuna === 'Concepción'}
              onPress={() => handleInputChange('agenda_comuna', 'Concepción')}
            />
            <CheckBox
              title="Hualpén"
              checked={citaData.agenda_comuna === 'Hualpén'}
              onPress={() => handleInputChange('agenda_comuna', 'Hualpén')}
            />
            <CheckBox
              title="San pedro de la paz"
              checked={citaData.agenda_comuna === 'San pedro de la paz'}
              onPress={() => handleInputChange('agenda_comuna', 'San pedro de la paz')}
            />

            <CheckBox
              title="Penco "
              checked={citaData.agenda_comuna === 'Penco'}
              onPress={() => handleInputChange('agenda_comuna', 'Penco')}
            />
            <CheckBox
              title="Tomé"
              checked={citaData.agenda_comuna=== 'Tomé'}
              onPress={() => handleInputChange('agenda_comuna', 'Tomé')}
            />
            <CheckBox
              title="Chiguayante"
              checked={citaData.agenda_comuna === 'Chiguayante'}
              onPress={() => handleInputChange('agenda_comuna', 'Chiguayante')}
            />
            <Text style={{ color: 'red' }}>*Obligatorio</Text>
            <Card.Divider />
            <Text h4 >Motivo de la cita</Text>
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
            display="calendar"
            onChange={handleDateConfirm}
            minimumDate={new Date()}
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
                display="spinner"
                onChange={handleTimeConfirm}
                is24Hour={true}
                minuteInterval={5}
              />
              )}
            <Card.Divider />
            <Button title="Agregar Cita" onPress={handleAgregarCita} />
            </Card>
            </View>
            </ScrollView>
            <View style={{ height: 50 }}></View>
        <BottomBar styles = {styles.bottomBar}/>
    </View>
   )   
}