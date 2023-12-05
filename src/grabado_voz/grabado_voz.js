import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { SafeAreaView } from "react-native";
import * as Speech from "expo-speech";
import BottomBar from "../componentes/bottombar";
import styles from '../style';

export default function Grabadora() {
    const [transcript, setTranscript] = useState("");

    const startRecording = async () => {
        try {
            await SpeechToText.initializeAsync();
            await SpeechToText.startListeningAsync();
        } catch (error) {
            console.error(error);
        }
    };

    const stopRecording = async () => {
        try {
            const result = await SpeechToText.stopListeningAsync();
            setTranscript(result.transcript);
            sendToApi(result.transcript);
        } catch (error) {
            console.error(error);
        }
    };

    const sendToApi = async (text) => {
        try {
            // Aquí puedes hacer la llamada a tu dirección API para guardar el texto
            // utilizando fetch u otra biblioteca de tu elección
            // Ejemplo:
            // const response = await fetch("https://api.example.com/save", {
            //   method: "POST",
            //   body: JSON.stringify({ text }),
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            // });
            // const data = await response.json();
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Comenzar grabación" onPress={startRecording} />
                <Button title="Detener grabación" onPress={stopRecording} />
                <Text>{transcript}</Text>
            </View>
            <BottomBar/>
        </SafeAreaView>
    );
}


