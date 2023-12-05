import { View } from 'react-native'
import BottomBar from '../componentes/bottombar'
import Calendario from '../componentes/calendario'
import styles from '../style'

export default function Agenda () {
    
    return(
    <View style = {styles.container}><Calendario/>
    <BottomBar styles = {styles.bottomBar}/>
    </View>
    )
}