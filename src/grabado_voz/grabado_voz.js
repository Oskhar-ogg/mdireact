import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Card } from '@rneui/base'
import { StatusBar } from 'expo-status-bar'

const recordingDir = FileSystem.documentDirectory + 'grabadora/'

const ensureDirExists = async (dir) => {
  const dirInfo = await FileSystem.getInfoAsync(dir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
  }
}

const RecordingUploader = ({ uri, recordingName, duration, onDelete }) => {
  const [uploading, setUploading] = useState(false)

  const uploadRecording = async () => {
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', {
        uri: uri,
        name: recordingName,
        type: 'audio/mpeg',
      })
      formData.append('duration', duration)

      const response = await fetch(process.env.EXPO_PUBLIC_API_URL +'/subir/grabacion', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.ok) {
        setUploading(false)
        Alert.alert('Éxito', 'La grabación ha sido respaldada con éxito.')
      } else {
        throw new Error('Error al subir la grabación')
      }
    } catch (error) {
      setUploading(false)
      Alert.alert('Error', 'Hubo un problema al respaldar la grabación. Inténtalo de nuevo.')
    }
  }
  return (
    <TouchableOpacity onPress={uploadRecording}>
      <Card style={styles.container}>
        <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
          <Text style={{ flex: 1 }}>{recordingName}</Text>
          <Ionicons.Button name="cloud-upload" onPress={uploadRecording} />
          <Ionicons.Button name="trash" onPress={() => onDelete(uri)} />
        </View>
      </Card>
      {uploading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
    </TouchableOpacity>
  )
}

const Grabadora = () => {
  const [recording, setRecording] = useState()
  const [recordings, setRecordings] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadRecordings()
  }, [])

  const loadRecordings = async () => {
    await ensureDirExists(recordingDir)
    const recordingFiles = await FileSystem.readDirectoryAsync(recordingDir)
    if (recordingFiles.length > 0) {
      setRecordings(recordingFiles.map((f) => ({ file: recordingDir + f })))
    }
  }

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync()

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        })

        await ensureDirExists(recordingDir)

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        )

        setRecording(recording)
      } else {
        setMessage('Please grant permission to the app to access the microphone')
      }
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  const stopRecording = async () => {
    setRecording(undefined)

    if (recording) {
      await recording.stopAndUnloadAsync()

      let updatedRecordings = [...recordings]
      const { sound, status } = await recording.createNewLoadedSoundAsync()

      const filename = 'Grabación ' + new Date().getTime() + '.mp3'
      const dest = recordingDir + filename

      await FileSystem.moveAsync({
        from: recording.getURI(),
        to: dest,
      })

      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: dest,
        format: 'mp3',
      })

      setRecordings(updatedRecordings)
    }
  }

  const deleteRecording = async (uri) => {
    await FileSystem.deleteAsync(uri)
    setRecordings(recordings.filter((rec) => rec.file !== uri))
  }

  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60
    const minutesDisplay = Math.floor(minutes)
    const seconds = Math.round((minutes - minutesDisplay) * 60)
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds
    return `${minutesDisplay}:${secondsDisplay}`
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ height: 120 }}></View>
        <Text style={{ color: '#fff' }}>{message}</Text>
        <Button
          title={recording ? 'Detener grabación' : 'Comenzar a grabar'}
          onPress={recording ? stopRecording : startRecording}
        />
        <ScrollView>
          {recordings.map((recordingLine, index) => (
            <RecordingUploader key={index} uri={recordingLine.file} recordingName={recordingLine.file.split('/').pop()} onDelete={deleteRecording} />
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      <View style={{ height: 80 }}></View>
    </View>
  )
}

export default Grabadora

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#033542',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
