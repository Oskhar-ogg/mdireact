import React from "react"
import { View, TouchableOpacity} from "react-native"
import { Card, Text } from "@rneui/base"
import { FontAwesome } from "@expo/vector-icons"
import styles from "../style"
import { FlatList } from "react-native"



const ListaTrascipciones= () => {

    return (<View style = {styles.container}>
        <Card><Card.Title h3>Transcripciones guardadas</Card.Title>
        <Card.Divider/>
        <FlatList>

        </FlatList>
        </Card>
    </View>
    )

}

export default ListaTrascipciones