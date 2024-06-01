import Colors from '@/constants/Colors'
import { Tables } from '@/database.types'
import { Link, useSegments } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'
import RemoteImage from './RemoteImage'

interface IProductListItem {
	product: Tables<'products'>
}

export const defaultPizzaImage =
	'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export const ProductListItem = ({ product }: IProductListItem) => {
	const segments = useSegments()

	return (
		<Link href={`/${segments[0]}/menu/${product.id}`} asChild>
			<Pressable style={styles.container}>
				<RemoteImage
					fallback={defaultPizzaImage}
					path={product.image}
					style={styles.image}
					resizeMode='contain'
				/>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: '50%',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10
	},
	price: {
		fontSize: 15,
		fontWeight: 'bold',
		color: Colors.light.tint
	},
	image: {
		width: '100%',
		aspectRatio: 1
	}
})
