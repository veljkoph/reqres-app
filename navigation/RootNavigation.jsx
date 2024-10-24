import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import GuestStack from './GuestStack'
import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AuthStack from './AuthStack'

const RootNavigation = () => {
    const { top } = useSafeAreaInsets();
    const user = useSelector((state) => state.user);

    return (
        <NavigationContainer>
            {user?.token ? <AuthStack /> : <GuestStack />}
            <Toast topOffset={top < 1 ? 20 : top} visibilityTime={2000} />
        </NavigationContainer>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})