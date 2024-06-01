import { ActivityIndicator, FlatList, Text } from 'react-native'

import { OrderListItem } from '@/components/OrderListItem'
import { useGetUserOrders } from '@/hooks/order/useGetUserOrders'
// import { useGetOrders } from '@/hooks/order/useGetOrders'

export default function OrdersScreen() {
	const { data: orders, isLoading, isError } = useGetUserOrders()

	if (isLoading) return <ActivityIndicator />

	if (isError) return <Text>Failed to fetch orders</Text>

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{ padding: 10, gap: 10 }}
		/>
	)
}
