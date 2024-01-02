import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import BottomBar from '../componentes/bottombar';
import { Card } from '@rneui/base';

const recordingDir = FileSystem.documentDirectory + 'grabadora/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(recordingDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(recordingDir, { intermediates: true });
  }
};

const Grabadora = () => {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState('');

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        await ensureDirExists();

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage('Please grant permission to the app to access the microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    const filename = new Date().getTime() + '.mp3';
    const dest = recordingDir + filename;

    await FileSystem.moveAsync({
      from: recording.getURI(),
      to: dest,
    });

    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: dest,
      format: 'mp3',
    });

    setRecordings(updatedRecordings);

    // Transcribe and upload the recording
    await transcribeAndUpload(dest);
  }

  async function transcribeRecording(uri) {
    try {
      const googleCloudAPIKey = process.env.EXPO_PUBLIC_MAPS_KEY_API;
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${googleCloudAPIKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: {
              content: await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              }),
            },
            config: {
              encoding: 'LINEAR16',
              sampleRateHertz: 16000,
              languageCode: 'en-US',
            },
          }),
        }
      );

      const result = await response.json();
      const transcription = result.results
        ? result.results[0].alternatives[0].transcript
        : 'Transcription no disponible';

      setMessage(`Transcription: ${transcription}`);
    } catch (error) {
      console.error('Error transcribing recording', error);
      setMessage('Fallo al transcribir, intente nuevamente');
    }
  }

  async function uploadRecording(uri) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'recording.mp3',
        type: 'audio/mp3',
      });

      const response = await fetch('http://localhost:3001/subir/grabacion', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log(result);

      setMessage('Recording uploaded successfully!');
    } catch (error) {
      console.error('Error uploading recording', error);
      setMessage('Fallo al subir, intente nuevamente');
    }
  }

  async function transcribeAndUpload(uri) {
    await transcribeRecording(uri);
    await uploadRecording(uri);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
        <Card>
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <View>
            <Button
              style={styles.button}
              onPress={() => recordingLine.sound.replayAsync()}
              title="Reproducir"
            ></Button>
            <Button
              style={styles.button}
              onPress={() => uploadRecording(recordingLine.file)}
              title="Subir"
            ></Button>
            <Button
              style={styles.button}
              onPress={() => transcribeRecording(recordingLine.file)}
              title="Transcribir"
            ></Button>
            <Button
              style={styles.button}
              onPress={() => Sharing.shareAsync(recordingLine.file)}
              title="Compartir"
            ></Button>
          </View>
        </View>
        </Card>
    ));
  }
  


  return (
    <View style={styles.container}>
      <View>
      <View style={{ height: 120 }}></View>
        <Text style={{color: '#fff'}}>{message}</Text>
        <Button
          title={recording ? 'Detener grabación' : 'Comenzar a grabar'}
          onPress={recording ? stopRecording : startRecording}
        />
        <ScrollView>
        {getRecordingLines()}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      <View style={{ height: 80 }}></View>
      <BottomBar />
    </View>
  );
};

export default Grabadora;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#033542',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
