import { ProductListItem } from '@/components/ProductListItem'
import products from '@assets/data/products'
import React from 'react'
import { FlatList } from 'react-native'

export default function MenuScreen() {
	// const {products} = useGetProducts()

	// console.log(data)
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
