import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import { useGetProductsById } from '@/hooks/product/useGetProductById'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

	const { id } = useLocalSearchParams()
	const { addItem } = useCart()
	const router = useRouter()

	const { product } = useGetProductsById(Number(id))

	if (!product) return <Text>Product not found!</Text>

	const addToCart = () => {
		addItem(product, selectedSize)
		router.push('/cart')
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product.name ?? '' }} />
			<Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size, i) => (
					<Pressable
						key={i}
						onPress={() => setSelectedSize(size)}
						style={[
							styles.size,
							{ backgroundColor: size === selectedSize ? 'gainsboro' : 'white' }
						]}
					>
						<Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>
							{size}
						</Text>
					</Pressable>
				))}
			</View>
			<Text style={styles.price}>${product.price}</Text>
			<Button onPress={addToCart} text='Add to cart' />
		</View>
	)
}

export default ProductDetailScreen

const styles = StyleSheet.create({
	container: { backgroundColor: 'white', flex: 1, padding: 10 },
	image: { width: '100%', aspectRatio: 1 },
	price: { fontSize: 18, fontWeight: 'bold', marginTop: 'auto' },
	sizes: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10
	},
	size: {
		backgroundColor: 'gainsboro',
		borderRadius: 25,
		aspectRatio: 1,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '600'
	}
})
