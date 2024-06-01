import { OrderItemListItem } from '@/components/OrderItemListItem'
import { OrderListItem } from '@/components/OrderListItem'
import { useOrderItemById } from '@/hooks/order/useOrderItemById'
import { useUpdateOrderSubscription } from '@/hooks/subscriptions'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

const OrdersIdScreen = () => {
	const { id } = useLocalSearchParams()

	// const order = orders.find(o => o.id.toString() === id)
	const { data: order, isLoading, isError } = useOrderItemById(Number(id))

	if (isLoading) return <ActivityIndicator />

	if (isError || !order) return <Text>Failed to fetch</Text>

	useUpdateOrderSubscription(Number(id))

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${id}` }} />
			<OrderListItem order={order} />
			<FlatList
				data={order?.order_items}
				renderItem={({ item }) => <OrderItemListItem order={item} />}
				contentContainerStyle={{ padding: 10, gap: 10 }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 20
	}
})

export default OrdersIdScreen
