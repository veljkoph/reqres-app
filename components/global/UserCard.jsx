import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../variables/color'
import { useDeleteUserMutation } from '../../features/reqresApi';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserCard = ({ user }) => {
    const [deleteUser] = useDeleteUserMutation();
    const navigation = useNavigation()
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
                        await deleteUser(user.id);
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('User', { user })}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete User</Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

export default UserCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.primaryLight,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderColor: color.highlight,
        borderWidth: 2,
    },
    infoContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: color.primary,
    },

})