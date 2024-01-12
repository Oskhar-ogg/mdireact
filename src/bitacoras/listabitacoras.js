import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { View, FlatList, RefreshControl, SafeAreaView } from "react-native"
import styles from "../style"
import { Card, Text, Button } from "@rneui/base"
import { useIsFocused, useFocusEffect } from "@react-navigation/native"
import BottomBar from "../componentes/bottombar"
import { useNavigation } from "@react-navigation/native"

// CONEXIÓN A LA API
import { getBitacora } from "../../api"

// Función para capitalizar la primera letra de una cadena
function capitalizarPrimeraLetra(cadena) {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1)
}

export default function ListaBitacoras() {
  const [refreshing, setRefreshing] = useState(false)
  const [listabitacora, setListabitacora] = useState([])
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const cargarBitacora = async () => {
    try {
      const data = await getBitacora()
      setListabitacora(data)
    } catch (error) {
      console.error(error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await cargarBitacora()
    setRefreshing(false)
  }

  const handleVerbitacora = (bitacora_id) => {
    navigation.navigate("Ver bitácora", { bitacora_id })
  }

  useFocusEffect(
    React.useCallback(() => {
      cargarBitacora()
    }, [isFocused])
  )

  const getColor = (estado) => {
    if (estado === "Finalizado") {
      return "green" // Color verde para el estado "Finalizado"
    } else if (estado === "En proceso") {
      return "yellow" // Color amarillo para el estado "En progreso"
    } else {
      return "red" // Color rojo para el estado "No iniciado" o cualquier otro estado
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.FlatList}
        data={listabitacora}
        keyExtractor={(item) => item.bitacora_id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title h3>{capitalizarPrimeraLetra(item.bitacora_title)}</Card.Title>
            <Card.Title h4>
              {new Date(item.bitacora_fecha).toLocaleDateString("es-ES", {
                timeZone: "UTC", // Ajusta esto según el huso horario correcto
              })}
            </Card.Title>
            <Text h3 style={{ color: getColor(item.bitacora_estado) }}>
              {item.bitacora_estado}
            </Text>
            <Card.Divider />
            <Text h4 style={{ color: "#000000", flexDirection: "row", justifyContent: "space-around", alignItems: "center", fontSize: 16 }}>
              ${item.bitacora_valor_cobrado}
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Button
                title="Ver mas detalles"
                icon={{ name: "eye", type: "font-awesome", size: 15, color: "white" }}
                iconCenter
                iconContainerStyle={{ marginLeft: 5 }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                  backgroundColor: "rgba(128, 128, 196, 1)",
                  borderColor: "transparent",
                  borderWidth: 2,
                  borderRadius: 50,
                }}
                containerStyle={{
                  width: 175,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                onPress={() => handleVerbitacora(item.bitacora_id)}
              />
            </View>
          </Card>
        )}
        refreshControl={ // Componente RefreshControl para FlatList
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        nestedScrollEnabled={true} // Habilitar desplazamiento interno de FlatList
      />
      <View style={{ height: 20 }}></View>
      <BottomBar />
    </SafeAreaView>
  )
}