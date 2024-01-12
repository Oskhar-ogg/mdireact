import React, { useState } from 'react'
import { View, TextInput, Button, FlatList, Text } from 'react-native'

const BusquedaCliente = () => {

    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState('')

    const URL = 'https://jsonplaceholder.typicode.com/users'

    const mostrarUsuarios = async () => {
        const response = await fetch(URL)
        const usuarios = await response.json()
        console.log(usuarios)
        setUsuarios(usuarios)
    }
    mostrarUsuarios()
}
export default BusquedaCliente
