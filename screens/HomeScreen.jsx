import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../variables/color';
import { clearUser } from '../features/userSlice';
import { ActivityIndicator } from 'react-native-paper';
import { useGetUsersQuery } from '../features/reqresApi';
import UserCard from '../components/global/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from '../components/global/Error';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [combinedData, setCombinedData] = useState([]);

    const user = useSelector((state) => state.user)

    const { data, error, isLoading, refetch, isFetching } = useGetUsersQuery({ page });

    const handleLogout = () => {
        dispatch(clearUser());
    };

    useEffect(() => {
        if (data?.data && page > 1 && !isFetching && !isLoading) {
            setCombinedData((prevData) => [...prevData, ...data.data]);
        } else if (data?.data && page === 1) {
            setCombinedData(data.data);
        }
    }, [data, page]);

    const fetchNextPage = () => {
        if ((data?.page < data?.total_pages) && !isFetching && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    if (error) return <Error />
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <Ionicons
                        color={color.secondary}
                        name='power-outline'
                        size={25}

                    />
                </TouchableOpacity>
                <Text>{user?.user}</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={[color.primary, color.secondary]}
                        refreshing={false}
                        onRefresh={() => {
                            setPage(1);
                            refetch();
                        }}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                onEndReached={fetchNextPage}
                ListEmptyComponent={
                    !isLoading &&
                    <Text>No data</Text>

                }
                ListFooterComponent={isFetching && <ActivityIndicator />}
                ListHeaderComponentStyle={{
                    paddingHorizontal: 0,
                }}
                contentContainerStyle={{
                    paddingBottom: 150,
                    rowGap: 24,
                    padding: 20,

                }}
                onEndReachedThreshold={0}
                data={combinedData}
                renderItem={({ item }) => <UserCard user={item} />}
            />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})