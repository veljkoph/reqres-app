import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '../../variables/color'

const Error = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Error with fetching data!</Text>
        </SafeAreaView>
    )
}

export default Error

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 28,
        color: color.secondary
    }
})