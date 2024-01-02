//SECTOR IMPORTACIÓN DE ELEMENTOS DE REACT-NATIVE
import React from 'react'
import {Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { TouchableOpacity, View, SafeAreaView, ImageBackground, TextInput, Dimensions, StyleSheet} from 'react-native'
import { NavigationContainer, useNavigation} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'
import { Text, Card, Button  } from '@rneui/base'

//-----------------------------------------------------------------
//SECTOR IMPORTACIÓN DE VENTANAS UTILIZADAS POR LA APP
//PRIMERAS VENTANAS
import Login from './src/login'
import Inicio from './src/inicio'
import Perfil from './src/perfil'
import Grabadora from './src/grabado_voz/grabado_voz'
//SEGUNDAS VENTANAS
import MenuInventario from './src/inventario/menuinventario'
import BombaInventario from './src/inventario/bombainventario'
import CalderaInventario from './src/inventario/calderainventario'
import CalefontInventario from './src/inventario/calefontinventario'
import EquipoInventario from './src/inventario/equipoinventario'
import GasInventario from './src/inventario/gasinventario'
//TERCERAS VENTANAS
import ListaBitacoras from './src/bitacoras/listabitacoras'
import AgregarBitacora from './src/bitacoras/addbitacora'
import VerBitacora from './src/bitacoras/verbitacora'
//CUARTAS VENTANAS
import Agenda from './src/calendario/agenda'
import AgregarCita from './src/calendario/addcita'
//QUINTAS VENTANAS
import ListaMas from './src/mas/listamas'
import Opciones from './src/mas/opciones/opciones'
import Mapa from './src/mas/mapa/mapa'
import ListaCliente from './src/mas/clientes/listaclientes'
import AgregarCliente from './src/mas/clientes/addclientes'
import HistoricoCliente from './src/mas/clientes/mant_cliente'
import ListaMantenciones from './src/mas/mantenciones/listamantenciones'
import AgregarMantencion from './src/mas/mantenciones/addmantenciones'
import ListaBoletas from './src/mas/boletas/listaboletas'
import SubirBoletas from './src/mas/boletas/subirboletas'
import ListaFacturas from './src/mas/facturas/listafacturas'
import SubirFacturas from './src/mas/facturas/subirfacturas'
//-----------------------------------------------------------------
//CÓDIGO CONTROLADOR DE LA APLICACIÓN
 export default function App() {
    const Stack = createNativeStackNavigator()
    return (
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: "#08546c"}, headerTitleStyle: { color: "#ffffff"}, headerTitleAlign: "center"}}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Inicio" component ={Inicio} options={({navigation}) => ({
          headerRight: () => (
            <View style ={{ flexDirection: 'row', marginRight: 15}}>
              <TouchableOpacity onPress={()=>{ navigation.navigate('Perfil Especialista')}}><FontAwesome size={24} color="#fff" name='user' /></TouchableOpacity>
            </View>
          ),
            headerLeft: () =>(
              <TouchableOpacity onPress={() => navigation.navigate('Grabadora')}>
                <FontAwesome size = {24} color= "#fff" name ='microphone'/>
              </TouchableOpacity>
            ),
        })}/>
        <Stack.Screen name='Inventario' component={MenuInventario} />
        <Stack.Screen name='Bombas de agua' component={BombaInventario} />
        <Stack.Screen name='Calderas' component={CalderaInventario} />
        <Stack.Screen name='Calefont' component={CalefontInventario} />
        <Stack.Screen name='Aire Acondicionado' component={EquipoInventario} />
        <Stack.Screen name='Redes de gas' component={GasInventario} />
        <Stack.Screen name='Bitácoras' component={ListaBitacoras} options={({navigation}) => ({ headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Agregar Bitácora')}>
            <FontAwesome size = {24} color= "#fff" name = 'plus-square'/>
          </TouchableOpacity>
        ),
        })}/>
        <Stack.Screen name='Agregar Bitácora' component={AgregarBitacora}/>
        <Stack.Screen name='Ver bitácora' component={VerBitacora}/>
        <Stack.Screen name='Agenda' component={Agenda} options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Agregar Nueva Cita')}>
              <FontAwesome name='calendar-plus-o' size={30} color='white' />
            </TouchableOpacity>
          ),
        })}/>
        <Stack.Screen name='Agregar Nueva Cita' component={AgregarCita}/>
        <Stack.Screen name='Más' component={ListaMas}/>
        <Stack.Screen name='Boletas' component={ListaBoletas} /*options={({navigation}) => ({ headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Subir Boletas')}>
            <FontAwesome size = {24} color= "#fff" name = 'plus-square'/>
          </TouchableOpacity>
        ),
        })}*/
        />
        <Stack.Screen name='Subir Boletas' component={SubirBoletas}/>
        <Stack.Screen name='Facturas' component={ListaFacturas} /*options={({navigation}) => ({ headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Subir Facturas')}>
            <FontAwesome size = {24} color= "#fff" name = 'plus-square'/>
          </TouchableOpacity>
        ),
        })}*//>
        <Stack.Screen name='Subir Facturas' component={SubirFacturas}/>
        <Stack.Screen name='Clientes' component={ListaCliente}options={({navigation}) => ({ headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Agregar Cliente')}>
            <FontAwesome size = {24} color= "#fff" name = 'plus-square'/>
          </TouchableOpacity>
        ),
        })}/>
        <Stack.Screen name='Agregar Cliente' component={AgregarCliente}/>
        <Stack.Screen name='Histórico Cliente' component={HistoricoCliente}/>
        <Stack.Screen name='Mapa' component={Mapa}/>
        <Stack.Screen name='Opciones' component={Opciones}/>
        <Stack.Screen name='Perfil Especialista' component={Perfil}/>
        <Stack.Screen name='Mantenciones Realizadas' component={ListaMantenciones}/>
        <Stack.Screen name='Agregar Mantenimiento' component={AgregarMantencion}/>
        <Stack.Screen name='Grabadora' component={Grabadora}/>
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )
}



