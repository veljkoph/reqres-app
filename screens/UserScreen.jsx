import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import { useDeleteUserMutation, usePatchUserMutation } from '../features/reqresApi';
import { TouchableOpacity } from 'react-native';
import { patchUserSchema } from '../validation/PatchUserSchema';
import { color } from '../variables/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import LineInput from '../components/inputs/TextInput'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const UserScreen = ({ route }) => {
    const { user } = route.params;
    const navigation = useNavigation()
    const [patchUser, { isLoading }] = usePatchUserMutation();

    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = () => {
        Alert.alert(
            'Delete User',
            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteUser(user.id).unwrap();
                            Toast.show({
                                type: 'success',
                                text1: 'User deleted successfully',
                                visibilityTime: 1000,
                            });
                            navigation.goBack()
                        } catch (error) {
                            Toast.show({
                                type: 'error',
                                text1: error?.data?.error || 'Failed to delete user',
                                visibilityTime: 1000,
                            });

                        }
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Formik
                initialValues={{ name: user.first_name, job: '' }}
                validationSchema={patchUserSchema}

                onSubmit={async (values) => {
                    try {
                        await patchUser({ id: user.id, name: values.name, job: values.job });
                        Toast.show({
                            type: "success",
                            text1: 'User updated successfully',
                            visibilityTime: 1000,
                        });
                    } catch (error) {
                        Toast.show({
                            type: "error",
                            text1: error?.data?.error || 'Failed to update user',
                            visibilityTime: 1000,
                        });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <LineInput
                            label='Name'
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            touched={touched.name}
                            error={errors.name}
                        />
                        <LineInput
                            label='Job'
                            onChangeText={handleChange('job')}
                            onBlur={handleBlur('job')}
                            value={values.job}
                            touched={touched.job}
                            error={errors.job}

                        />
                        <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={styles.submitBtn}>
                            <Text style={styles.submitBtnText}>Update User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isLoading} onPress={handleDelete} style={[styles.submitBtn, styles.deleteBtn,]}>
                            <Text style={styles.submitBtnText}>Delete User</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        rowGap: 24,

    },
    form: {
        rowGap: 16,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    submitBtn: {
        backgroundColor: color.primary,
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 18,
    },
    deleteBtn: {
        backgroundColor: color.alert,

    },
    submitBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.white
    },
})