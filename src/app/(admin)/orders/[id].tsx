import OrderItemListItem from '@/components/OrderItemListItem'
import { OrderListItem } from '@/components/OrderListItem'
import Colors from '@/constants/Colors'
import { OrderStatusList } from '@/types'
import orders from '@assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

const OrdersIdScreen = () => {
	const { id } = useLocalSearchParams()

	const order = orders.find(o => o.id.toString() === id)

	const [orderStatus, setOrderStatus] = useState(order?.status)

	if (!order) return <Text>Order not found</Text>

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${id}` }} />
			<OrderListItem order={order} orderStatus={orderStatus} />
			<FlatList
				data={order?.order_items}
				renderItem={({ item }) => <OrderItemListItem order={item} />}
				contentContainerStyle={{ padding: 10, gap: 10 }}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: 'bold' }}>Status</Text>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							{OrderStatusList.map(status => (
								<Pressable
									key={status}
									onPress={() => setOrderStatus(status)}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor: orderStatus === status ? Colors.light.tint : 'transparent'
									}}
								>
									<Text
										style={{
											color: orderStatus === status ? 'white' : Colors.light.tint
										}}
									>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
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
