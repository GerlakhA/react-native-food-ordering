import orders from '@/assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import { OrderListItem } from '@/components/OrderListItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const OrdersIdScreen = () => {
	const { id } = useLocalSearchParams()

	const order = orders.find(o => o.id.toString() === id)

	if (!order) return <Text>Order not found</Text>

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
