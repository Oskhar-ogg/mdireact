import React from "react"
import { View } from "react-native"
import BottomBar from "../../componentes/bottombar"
import styles from "../../style"

export default function HistoricoCliente (){

    return(<View style={styles.container}>
        <View style={styles.bottomBar}></View>
        <BottomBar/>
        </View>)
}
