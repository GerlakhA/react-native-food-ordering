import { ProductListItem } from '@/components/ProductListItem'
import { useGetProducts } from '@/hooks/useGetProducts'
// import products from '@assets/data/products'
import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

export default function MenuScreen() {
	const { products, isProducts } = useGetProducts()

	if (isProducts) return <ActivityIndicator />

	return (
		<FlatList
			data={products}
			renderItem={({ item }) => <ProductListItem product={item} />}
			numColumns={2}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			columnWrapperStyle={{ gap: 10 }}
		/>
	)
}
