import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import products from '@assets/data/products'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const ProductDetailScreen = () => {
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

	const { id } = useLocalSearchParams()
	const { addItem } = useCart()
	const router = useRouter()

	const product = products.find(p => p.id.toString() === id)

	if (!product) return <Text>Product not found!</Text>

	const addToCart = () => {
		addItem(product, selectedSize)
		router.push('/cart')
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link href={`/(admin)/menu/createProduct?id=${id}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={25}
										color={Colors.light.tint}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					)
				}}
			/>
			<Stack.Screen options={{ title: product.name }} />
			<Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

			<Text style={styles.title}>${product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	)
}

export default ProductDetailScreen

const styles = StyleSheet.create({
	container: { backgroundColor: 'white', flex: 1, padding: 10 },
	image: { width: '100%', aspectRatio: 1 },
	price: { fontSize: 18, fontWeight: 'bold' },
	title: { fontSize: 20, fontWeight: 'bold' }
})
