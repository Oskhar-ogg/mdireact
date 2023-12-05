import { View } from 'react-native'
import BottomBar from '../componentes/bottombar'
import styles from '../style'

export default function EquipoInventario (){
    return(
        <View style = {styles.container}>
        <BottomBar styles = {styles.bottomBar}/>
        </View>
        )
    
}