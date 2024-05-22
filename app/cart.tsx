import Button from '@/components/Button'
import CartListItem from '@/components/CartIListIem'
import { useCart } from '@/providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, Text, View } from 'react-native'

const CartScreen = () => {
	const { items, totalPrice } = useCart()

	return (
		<View>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cart={item} />}
				contentContainerStyle={{ padding: 10, gap: 10 }}
			/>
			<Text>total price: {totalPrice}</Text>
			<Button text='Checkout' />
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	)
}

export default CartScreen
