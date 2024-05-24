import { Stack } from 'expo-router'
import React from 'react'

const OrdersLayout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ title: 'Orders' }} />
		</Stack>
	)
}

export default OrdersLayout
