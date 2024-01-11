import * as React from 'react'
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import BottomBar from '../componentes/bottombar'
import styles from '../style'
import { DataTable, Card, Button, Portal, Modal, Provider, Text, DefaultTheme } from 'react-native-paper'
import { CheckBox } from '@rneui/base'
// Asegúrate de importar la función correcta desde tu archivo de API
import { getInventarioRedagua, saveInventarioRedagua, deleteInventarioRedagua, updateInventarioRedagua } from '../../api'

const RedaguaInventario = () => {
  const [page, setPage] = React.useState(0)
  const [numberOfItemsPerPageList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0])
  const [items, setItems] = React.useState([])
  const [visibleAgregarModal, setVisibleAgregarModal] = React.useState(false)
  const [visibleEditarModal, setVisibleEditarModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)

  const [inventarioData, setInventarioData] = React.useState({
    inv_red_agua_tipo_repuesto: '',
    inv_red_agua_marca_repuesto: '',
    inv_red_agua_ubicacion: '',
    inv_red_agua_cantidad: 0,
  })

  const handleAgregarRepuesto = async () => {
    try {
      const response = await saveInventarioRedagua(inventarioData)
      console.log(response)
      setInventarioData({
        inv_red_agua_tipo_repuesto: '',
        inv_red_agua_marca_repuesto: '',
        inv_red_agua_ubicacion: '',
        inv_red_agua_cantidad: 0,
      })
      setVisibleAgregarModal(false)
      fetchData() // Refrescar los datos después de agregar un repuesto
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditarRepuesto = async () => {
    try {
      const { inv_red_agua_cantidad } = inventarioData

      // Extract inv_red_agua_id from selectedItem
      const { inv_red_agua_id } = selectedItem

      const response = await updateInventarioRedagua(inv_red_agua_id, inv_red_agua_cantidad)
      console.log(response)

      setInventarioData({
        inv_red_agua_tipo_repuesto: '',
        inv_red_agua_marca_repuesto: '',
        inv_red_agua_ubicacion: '',
        inv_red_agua_cantidad: '',
      })

      setVisibleEditarModal(false)
      fetchData() // Refrescar los datos después de editar un repuesto
    } catch (error) {
      console.error(error)
    }
  }

  const incrementarCantidadEditar = () => {
    setInventarioData((prevData) => ({
      ...prevData,
      inv_red_agua_cantidad: (parseInt(prevData.inv_red_agua_cantidad, 10) + 1).toString(),
    }))
  }

  const decrementarCantidadEditar = () => {
    setInventarioData((prevData) => {
      const cantidad = parseInt(prevData.inv_red_agua_cantidad, 10)
      const nuevaCantidad = cantidad > 0 ? (cantidad - 1).toString() : '0'
      return { ...prevData, inv_red_agua_cantidad: nuevaCantidad }
    })
  }

  const handleBorrarRepuesto = async () => {
    try {
      const { inv_red_agua_id } = selectedItem
      await deleteInventarioRedagua(inv_red_agua_id)
      setVisibleEditarModal(false)
      fetchData() // Refrescar los datos después de borrar un repuesto
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (key, value) => {
    setInventarioData({ ...inventarioData, [key]: value })
  }

  const showAgregarModal = () => setVisibleAgregarModal(true)
  const hideAgregarModal = () => {
    setVisibleAgregarModal(false)
    setInventarioData({
      inv_red_agua_tipo_repuesto: '',
      inv_red_agua_marca_repuesto: '',
      inv_red_agua_ubicacion: '',
      inv_red_agua_cantidad: '',
    })
  }

  const showEditarModal = (item) => {
    setSelectedItem({
      inv_red_agua_id: item.key,
      name: item.name,
      brand: item.brand,
      cantidad: item.cantidad,
      ubicacion: item.ubicacion,
    });
    setInventarioData({
      inv_red_agua_tipo_repuesto: item.name,
      inv_red_agua_marca_repuesto: item.brand,
      inv_red_agua_cantidad: item.cantidad,
      inv_red_agua_ubicacion: item.ubicacion,
    });
    setVisibleEditarModal(true);
  };
  
  const hideEditarModal = () => {
    setVisibleEditarModal(false);
    setInventarioData({
      inv_red_agua_tipo_repuesto: '',
      inv_red_agua_marca_repuesto: '',
      inv_red_agua_ubicacion: '',
      inv_red_agua_cantidad: '',
    });
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await getInventarioRedagua()
      const data = response.map((item) => ({
        key: item.inv_red_agua_id,
        name: item.inv_red_agua_tipo_repuesto,
        brand: item.inv_red_agua_marca_repuesto,
        cantidad: item.inv_red_agua_cantidad,
        ubicacion: item.inv_red_agua_ubicacion,
      }))
      setItems(data)
    } catch (error) {
      console.error(error)
    }
  }

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, items.length)

  React.useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  const customDataTableTheme = {
    ...DefaultTheme, // Include the default theme to ensure all required properties are present
    colors: {
      ...DefaultTheme.colors,
      primary: '#00bcd4', // Color del encabezado
      text: '#000000', // Color del texto
      background: '#ffffff', // Color del fondo
      placeholder: '#aaaaaa', // Color del marcador de posición
      surface: '#033342', // Color de la superficie
      accent: '#ff4081', // Color de acento
    },
  }

  return (
    <Provider theme={customDataTableTheme}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Card
            style={{
              ...styles.CenterContainer,
              backgroundColor: 'white',
              borderBlockColor: 'grey',
            }}
          >
            <Card.Actions>
              <Button
                icon="plus"
                mode="contained-tonal"
                onPress={showAgregarModal}
                style={{ backgroundColor: '#00bcd4' }}
              >
                Agregar item
              </Button>
            </Card.Actions>
            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header style={{ textAlign: 'center' }}>
                  <DataTable.Title style={{ color: 'white' }}>Tipo de repuesto</DataTable.Title>
                  <DataTable.Title style={{ color: 'black' }}>Marca</DataTable.Title>
                  <DataTable.Title style={{ color: 'black' }}>Ubicación</DataTable.Title>
                  <DataTable.Title numeric style={{ color: 'black' }}>
                    Cantidad
                  </DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                  <TouchableOpacity onPress={() => showEditarModal(item)}>
                    <DataTable.Row key={item.key}>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell>{item.brand}</DataTable.Cell>
                      <DataTable.Cell>{item.ubicacion}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.cantidad}</DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                ))}
                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(items.length / itemsPerPage)}
                  onPageChange={(newPage) => setPage(newPage)}
                  label={`${from + 1}-${to} de ${items.length}`}
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(newItemsPerPage) => onItemsPerPageChange(newItemsPerPage)}
                  showFastPaginationControls
                  selectPageDropdownLabel={'Filas por página'}
                />
              </DataTable>
              <View style={{ height: 80 }}></View>
            </ScrollView>
          </Card>
        </View>
        <BottomBar styles={styles.bottomBar} />
      </View>
            <Portal>
              <Modal visible={visibleAgregarModal} onDismiss={hideAgregarModal}>
                <Card
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderColor: '#00bcd4',
                    borderCurve: 'circular',
                  }}
                  mode="outlined"
                >
                  <Card.Title title="Agregar repuesto" titleVariant="headlineMedium" />
                  <Card.Content>
                    <Text style={{ color: 'black' }}>Tipo repuesto:</Text>
                    <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Sensor seguridad caldera"
                      value={inventarioData.inv_red_agua_tipo_repuesto}
                      onChangeText={(text) => handleInputChange('inv_red_agua_tipo_repuesto', text)}
                    />
                    <Text style={{ color: 'red' }}>*Obligatorio</Text>
                    <Text style={{ color: 'black' }}>Marca del repuesto:</Text>
                      <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Marca XYZ"
                      value={inventarioData.inv_red_agua_marca_repuesto}
                      onChangeText={(text) => handleInputChange('inv_red_agua_marca_repuesto', text)}
                    />
                    <Text style={{ color: 'red' }}>*Obligatorio</Text>
                    <Text style={{ color: 'black' }}>Ubicación:</Text>
                    <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Caja N°1"
                      value={inventarioData.inv_red_agua_ubicacion}
                      onChangeText={(text) => handleInputChange('inv_red_agua_ubicacion', text)}
                    />
                    <Text style={{ color: 'red' }}>*Obligatorio</Text>
                    <Text style={{ color: 'black' }}>Cantidad:</Text>
                    <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      keyboardType="numeric"
                      maxLength={4}
                      placeholder="Ej: 9999"
                      value={String(inventarioData.inv_red_agua_cantidad)}  // Convierte el número a cadena
                      onChangeText={(text) => handleInputChange('inv_red_agua_cantidad', text)}
                    />

                    <Text style={{ color: 'red' }}>*Obligatorio</Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      mode="contained"
                      onPress={handleAgregarRepuesto}
                      style={{ backgroundColor: '#00bcd4' }}
                    >
                      Agregar Repuesto
                    </Button>
                  </Card.Actions>
                </Card>
              </Modal>
              {/* Modal Editar */}
              <Modal visible={visibleEditarModal} onDismiss={hideEditarModal}>
                <Card
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    borderColor: '#00bcd4',
                    borderCurve: 'circular',
                  }}
                  mode="outlined"
                >
                  <Card.Title title="Editar repuesto" titleVariant="headlineMedium"  />
                  <Card.Content>
                    <Text style={{ color: 'black' }}>Tipo repuesto:</Text>
                    <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Sensor seguridad caldera"
                      value={inventarioData.inv_red_agua_tipo_repuesto}
                      onChangeText={(text) => handleInputChange('inv_red_agua_tipo_repuesto', text)}
                      editable={false} // No permitir editar el nombre al editar
                    />
                    <Text style={{ color: 'black' }}>Marca del repuesto:</Text>
                      <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Marca XYZ"
                      value={inventarioData.inv_red_agua_marca_repuesto}
                      onChangeText={(text) => handleInputChange('inv_red_agua_marca_repuesto', text)}
                    />
                    <Text style={{ color: 'black' }}>Ubicación:</Text>
                    <TextInput
                      style={{ ...styles.input, color: 'black' }}
                      placeholder="Ej: Caja N°1"
                      value={inventarioData.inv_red_agua_ubicacion}
                      onChangeText={(text) => handleInputChange('inv_red_agua_ubicacion', text)}
                      editable={false} // No permitir editar la ubicación al editar
                    />
                    <Text style={{ color: 'black' }}>Cantidad:</Text>
                    <ScrollView horizontal>
                      <Button
                        icon="minus"
                        mode="contained"
                        onPress={decrementarCantidadEditar}
                        style={{ marginRight: 20 }}
                      >
                      </Button>
                      <TextInput
                      style={{ color: 'black', borderColor:'blue', borderWidth: 1, width: 100, alignContent: 'center', textAlign: 'center', borderRadius: 15, marginRight: 20 }}
                      keyboardType="numeric"
                      maxLength={4}
                      placeholder="Ej: 9999"
                      value={String(inventarioData.inv_red_agua_cantidad)}
                      onChangeText={(text) => handleInputChange('inv_red_agua_cantidad', text)}
                      />
                      <Button
                        icon="plus"
                        mode="contained"
                        onPress={incrementarCantidadEditar}
                        style={{ marginRight: 20 }}
                      />
                      </ScrollView>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      mode="contained"
                      onPress={handleEditarRepuesto}
                      style={{ backgroundColor: '#00bcd4' }}
                    >
                      Guardar Cambios
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={handleBorrarRepuesto}
                      style={{ borderColor: '#ff4081', marginLeft: 10 }}
                      color="#ff4081"
                    >
                      Borrar Repuesto
                    </Button>
                  </Card.Actions>
                </Card>
              </Modal>
            </Portal>
          </Provider>
        )
      }

export default RedaguaInventario
