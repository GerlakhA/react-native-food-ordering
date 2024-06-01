import { ProductListItem } from '@/components/ProductListItem'
import { useGetProducts } from '@/hooks/product/useGetProducts'
import React from 'react'
import { FlatList } from 'react-native'

export default function MenuScreen() {
	const { products } = useGetProducts()

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
