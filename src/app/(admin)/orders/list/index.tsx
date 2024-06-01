import { FlatList } from 'react-native'

import { OrderListItem } from '@/components/OrderListItem'
// import orders from '@assets/data/orders'
import { useGetAdminOrders } from '@/hooks/order/useGetAdminOrders'
import { useInsertOrderSubscription } from '@/hooks/subscriptions'

export default function OrdersScreen() {
	const { data: orders } = useGetAdminOrders({ archived: false })

	useInsertOrderSubscription()

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{ padding: 10, gap: 10 }}
		/>
	)
}
