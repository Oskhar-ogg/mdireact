import { StatusBar } from 'expo-status-bar'
import {View, TouchableOpacity, Alert, ScrollView, Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Card , Text} from '@rneui/themed'
import BottomBar from '../componentes/bottombar'
import styles from '../style'


export default function MenuInventario () {

    const navigation = useNavigation()

    const handleCalderaPress = () => {
        navigation.navigate('Calderas')
    }
    const handleCalefontPress = () => {
        navigation.navigate('Calefont')
    }
    const handleBombaPress = () => {
        navigation.navigate('Bombas de agua')
    }
    const handleEquipoPress = () => {
        navigation.navigate('Aire Acondicionado')
    }
    const handleGasPress = () => {
        navigation.navigate('Redes de gas')
    }

    return(
        <View style={styles.container}>
            <View style = {styles.CenterContainer}> 
            <ScrollView>     
            <TouchableOpacity onPress={handleCalderaPress}>  
            <Card>
            <Card.Title h3>CALDERAS</Card.Title>
            <Card.Divider />
            <Card.Image style={{  
                flex: 1,
                width: 320,
                height: 350,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',}} source={require('../recursosvisuales/baxi.jpg')}>
            </Card.Image>
            <Card.Divider />
            <Text h4 style={{ marginBottom: 10 }}>Calderas murales y de pie. </Text>   
            <Text h4 style={{ marginBottom: 10 }}>Uso domiciliario e industrial.</Text>
            <Text h4 style={{ marginBottom: 10 }}>Combustibles: gas licuado, gas natural, petróleo y electricidad.</Text>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCalefontPress}>
            <Card>
            <Card.Title h3>CALEFONT</Card.Title>
            <Card.Divider />
            <Card.Image style={{ 
                flex: 1,
                width: 320,
                height: 440,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',}} source={require('../recursosvisuales/albin_trotter.jpg')}>
            </Card.Image>
            <Card.Divider />
            <Text h4 style={{ marginBottom: 10 }}>Calefonts de uso domiciliario a gas de tipo tiro forzado y tiro natural.</Text>
            <Text h4 style={{ marginBottom: 10 }}>Combustibles: gas licuado y gas natural.</Text>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEquipoPress}>
            <Card>
            <Card.Title h3>AIRE ACONDICIONADO</Card.Title>
            <Card.Divider />
            <Card.Image style={{ 
                flex: 1,
                width: 320,
                height: 440,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',}} source={require('../recursosvisuales/AC.jpg')}>
            </Card.Image>
            <Card.Divider />
            <Text h4 style={{ marginBottom: 10 }}>Plantas manejadoras y aires acondiconados </Text>
            <Text h4 style={{ marginBottom: 10 }}>Filtros, gas r134, equipos nuevos y más</Text>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBombaPress}>
            <Card>
            <Card.Title h3>BOMBAS DE AGUA</Card.Title>
            <Card.Divider />
            <Card.Image style={{ 
                flex: 1,
                width: 320,
                height: 440,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',}} source={require('../recursosvisuales/bagua.png')}>
            </Card.Image>
            <Card.Divider />
            <Text h4 style={{ marginBottom: 10 }}>Bombas de agua</Text>
            <Text h4 style={{ marginBottom: 10 }}>Rodamientos, hélices impulsoras, carbones y mas </Text>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGasPress}>
            <Card>
            <Card.Title h3>REDES DE GAS</Card.Title>
            <Card.Divider />
            <Card.Image style={{ 
                flex: 1,
                width: 320,
                height: 440,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'stretch',}}source={require('../recursosvisuales/gas.png')}>
            </Card.Image>
            <Card.Divider />
            <Text h4 style={{ marginBottom: 10 }}>Materiales: Cobre y bronce.</Text>
            <Text h4 style={{ marginBottom: 10 }}>Cañerías, codos, tee y más...</Text>
            </Card>
            </TouchableOpacity>
        </ScrollView>
        </View>
        <View style={{height: 60}}></View>
        <BottomBar styles = {styles.bottomBar}/>
    </View>)
}