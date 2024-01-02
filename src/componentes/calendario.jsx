import React, { useEffect, useState, PureComponent } from 'react'
import { Alert, View, TouchableOpacity, Linking, Platform  } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { Button, Card, Text } from '@rneui/themed'
import * as Notifications from 'expo-notifications'

// CONEXIÓN API
import { getAgenda, deleteAgenda } from '../../api'
import styles from '../style'

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio ',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles ', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
}
LocaleConfig.defaultLocale = 'es'

const Calendario = () => {

  const triggerNotificacion = async () => {
    try {
      const trigger = {
        hour: 9,
        minute: 0,
        repeats: true
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio',
          body: 'Es hora de revisar tu agenda del día',
        },
        trigger,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (agenda_id) => {
    Alert.alert('Eliminar Cita', '¿Estás seguro que deseas eliminar esta cita?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          await deleteAgenda(agenda_id)
          console.log('Cita eliminada correctamente')
        },
      },
    ])
  }

  const [items, setItems] = useState({})

  const handleMapsPress = async (direccion, comuna) => {
    if (direccion && comuna) {
        // Construir la dirección completa para Google Maps
        const direccionCompleta = `${direccion}, ${comuna}`

        // Crear la URL de la API de Google Maps para obtener coordenadas
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccionCompleta)}&key=${process.env.EXPO_PUBLIC_MAPS_KEY_API}`
        console.log(apiUrl)
        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
                console.error('Error en la solicitud a la API de Google Maps:', response.status, await response.text())
                return
            }

            const data = await response.json()
            console.log(data)
            if (data.results && data.results.length > 0) {
                // Obtener la ubicación desde los resultados de la API
                const location = data.results[0].geometry.location

                // Construir el enlace para abrir en la aplicación de Google Maps
                const mapsUrl = `https://www.google.com/maps/place/${location.lat},${location.lng}`
                console.log(mapsUrl)
                // Abrir la URL en la aplicación de mapas
                Linking.openURL(mapsUrl)
            } else {
                console.error('No se encontraron resultados de ubicación')
            }
        } catch (error) {
            console.error('Error al obtener datos de la API de Google Maps', error)
        }
    } else {
        console.error('Dirección o comuna faltantes')
    }
}

  const cargarItems = async () => {
    try {
      const agendas = await getAgenda() // Obtener las citas desde la API

      const formattedItems = {}

      agendas.forEach((agenda) => {
        const date = agenda.agenda_fecha
        const dateString = new Date(date).toISOString().split('T')[0]

        if (!formattedItems[dateString]) {
          formattedItems[dateString] = []
        }

        formattedItems[dateString].push({
          agenda_id: agenda.agenda_id,
          agenda_cliente: agenda.agenda_cliente,
          agenda_direccion: agenda.agenda_direccion,
          agenda_comuna: agenda.agenda_comuna,
          agenda_motivo: agenda.agenda_motivo,
          agenda_hora: agenda.agenda_hora,
          agenda_fecha: agenda.agenda_fecha,
        })
      })

      setItems(formattedItems)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarItems()
    triggerNotificacion(items)
  }, [])

  class Reservation extends PureComponent {
    render() {
      const { item } = this.props
      const {
        agenda_id,
        agenda_cliente,
        agenda_direccion,
        agenda_motivo,
        agenda_hora,
        agenda_fecha,
      } = item
      return (
        <TouchableOpacity style={styles.AgendaList}>
          <Card style={styles.Card}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'justify-center',
              }}>
              <Text h4>Cliente: {agenda_cliente}</Text>
              <Text h4>Lugar: {agenda_direccion}</Text>
              <Text h4>Motivo: {agenda_motivo}</Text>
              <Text h4>Hora: {agenda_hora}</Text>
              <Text h4>Fecha: {new Date(agenda_fecha).toLocaleDateString()}</Text>
              <Button
                title="Ir a la dirección"
                icon={{
                name: 'road',
                type: 'font-awesome',
                size: 20,
                color: 'white',
                }}
                iconLeft
                iconContainerStyle={{ marginLeft: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                backgroundColor: 'rgb(74,128,245)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 50,
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                onPress={() => handleMapsPress(item.agenda_direccion, item.agenda_comuna)}
                />
              <Button
                title="Eliminar cita"
                icon={{ name: 'trash', type: 'font-awesome', size: 20, color: 'white' }}
                iconLeft
                iconContainerStyle={{ marginLeft: 5 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: 'rgba(199, 43, 98, 1)',
                  borderColor: 'transparent',
                  borderWidth: 2,
                  borderRadius: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  alignContent: 'right',
                }}
                onPress={() => handleDelete(agenda_id)}
              />
            </View>
          </Card>
        </TouchableOpacity>
      )
    }
  }
  const renderItem = (item) => {
    return <Reservation item={item} />
  }

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Card style={styles.Cardinit}>
          <Card.Title h2>Ups!!!</Card.Title>
          <Text h3>Aun no tienes una cita agendada para este día</Text>
        </Card>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={cargarItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        showClosingKnob={true}
        theme={{
          agendaDayTextColor: 'blue',
          agendaDayNumColor: 'blue',
          agendaKnobColor: 'blue',
        }}
      />
    <View style={{ height: 50 }}></View>
    </View>
  )
}

export default Calendario
