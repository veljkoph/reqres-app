import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LineInput from '../components/inputs/TextInput'
import { ActivityIndicator } from 'react-native-paper'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { color } from '../variables/color'
import { LoginSchema } from '../validation/LoginSchema'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useGetUsersQuery, useLoginMutation } from '../features/reqresApi'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { setUser } from '../features/userSlice'

const LoginScreen = () => {
    const navigation = useNavigation();


    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();



    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardOpeningTime={10}
            extraScrollHeight={100}
        >
            <Text style={styles.title}>Login</Text>
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                    try {
                        const userResponse = await login(values).unwrap();

                        Toast.show({
                            type: "success",
                            text1: `Logged in!`,
                            visibilityTime: 3000,
                        });
                        dispatch(setUser({ user: values.email, token: userResponse.token }))
                        navigation.navigate('Home');
                    } catch (error) {
                        Toast.show({
                            type: "error",
                            text1: error?.data?.error,
                            visibilityTime: 10000000,
                        });
                    }
                }}
            >
                {(props) => (

                    <View style={styles.form}>
                        <LineInput
                            onChangeText={props.handleChange("email")}
                            value={props.values.email}
                            label="Email"
                            error={props.errors.email}
                            onBlur={props.handleBlur("email")}
                            touched={props.touched.email}
                        />
                        <LineInput
                            label='Password'
                            password
                            onChangeText={props.handleChange("password")}
                            value={props.values.password}
                            error={props.errors.password}
                            onBlur={props.handleBlur("password")}
                            touched={props.touched.password}
                        />


                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={() => props.handleSubmit()}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.submitBtnText}>Login</Text>
                            )}
                        </TouchableOpacity>

                        <Text>Don't have an account yet? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={styles.underinedText}>Register</Text></TouchableOpacity>
                    </ View>
                )}
            </Formik>

        </KeyboardAwareScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: color.white,

    },
    form: {
        rowGap: 24,
    },
    submitBtn: {
        backgroundColor: color.primary,
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
    },
    submitBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.white
    },
    underinedText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 40,

    }
})