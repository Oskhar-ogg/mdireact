import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const recordingDir = FileSystem.documentDirectory + 'grabadora/'

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(recordingDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(recordingDir, { intermediates: true })
  }
}

const Grabadora = () => {
  const [recording, setRecording] = useState()
  const [recordings, setRecordings] = useState([])
  const [message, setMessage] = useState("")

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync()

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        })

        await ensureDirExists()

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        )

        setRecording(recording)
      } else {
        setMessage("Please grant permission to the app to access the microphone")
      }
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    setRecording(undefined)
    await recording.stopAndUnloadAsync()

    let updatedRecordings = [...recordings]
    const { sound, status } = await recording.createNewLoadedSoundAsync()

    const filename = new Date().getTime() + '.mp3'
    const dest = recordingDir + filename

    await FileSystem.moveAsync({
      from: recording.getURI(),
      to: dest,
    })

    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: dest,
      format: "mp3"
    })

    setRecordings(updatedRecordings)
    console.log(updatedRecordings)

  }

  async function uploadRecording(uri) {
    try {
      const formData = new FormData()
      formData.append('file', {
        uri,
        name: 'recording.mp3',
        type: 'audio/mp3',
      })

      const response = await fetch('http://example.com/upload_recording.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const result = await response.json()
      console.log(result)

      setMessage("Recording uploaded successfully!")
    } catch (error) {
      console.error('Error uploading recording', error)
      setMessage("Failed to upload recording. Please try again.")
    }
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60
    const minutesDisplay = Math.floor(minutes)
    const seconds = Math.round((minutes - minutesDisplay) * 60)
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds
    return `${minutesDisplay}:${secondsDisplay}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={recording ? 'Stop recording' : 'Start recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  )
}

export default Grabadora

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    margin: 16
  },
  button: {
    margin: 16
  }
})
