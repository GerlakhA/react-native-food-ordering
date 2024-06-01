import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useCreateProduct } from '@/hooks/product/useCreateProduct'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'
import { useGetProductsById } from '@/hooks/product/useGetProductById'
import { useUpdateProduct } from '@/hooks/product/useUpdateProduct'
import { supabase } from '@/lib/supabse'
import { useAuth } from '@/providers/AuthProvider'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'

const createProductScreen = () => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState<string | null>(null)
	const [error, setError] = useState({
		name: '',
		price: ''
	})

	const { id } = useLocalSearchParams()
	const isUpdating = !!id

	const { isAdmin } = useAuth()

	const router = useRouter()

	const validateInput = () => {
		if (!name) {
			setError({ name: 'Name is required!', price: '' })
			return false
		} else {
			setError({ name: '', price: '' })
		}

		if (!price) {
			setError({ price: 'Price is required!', name: '' })
			return false
		} else {
			setError({ name: '', price: '' })
		}

		if (isNaN(parseFloat(price))) {
			setError({ price: 'Price not a number!', name: '' })
			return false
		} else {
			setError({ name: '', price: '' })
		}

		return true
	}

	const resetFields = () => {
		setName('')
		setPrice('')
		setImage('')
	}

	const { mutate: createProduct } = useCreateProduct()

	const onCreate = async () => {
		if (!validateInput()) {
			return
		}

		const imagePath = await uploadImage()

		createProduct({
			name,
			price: parseFloat(price),
			image: imagePath
		})

		resetFields()
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		console.log(result)

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	const uploadImage = async () => {
		if (!image?.startsWith('file://')) {
			return
		}

		const base64 = await FileSystem.readAsStringAsync(image, {
			encoding: 'base64'
		})
		const filePath = `${randomUUID()}.png`
		const contentType = 'image/png'
		const { data, error } = await supabase.storage
			.from('product_images')
			.upload(filePath, decode(base64), { contentType })

		if (data) {
			return data.path
		}
	}

	const { mutate: deleteProduct, isPending: isDeleteProduct } = useDeleteProduct()

	const onDelete = () => {
		deleteProduct(Number(id))
	}

	const confirmDelete = () => {
		Alert.alert('confirm', 'Are you sure you want to delete product?', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				style: 'destructive',
				onPress: onDelete
			}
		])
	}

	const { mutate: updateProduct, isPending } = useUpdateProduct()

	const onUpdate = () => {
		updateProduct({
			image,
			name,
			price: parseFloat(price),
			id: Number(id)
		})
	}

	const onSubmit = () => {
		if (isUpdating) {
			// update
			onUpdate()
		} else {
			onCreate()
		}
	}

	const { data: product } = useGetProductsById(Number(id))

	useEffect(() => {
		if (product) {
			setImage(product.image)
			setName(product.name ?? '')

			//@ts-ignore
			setPrice(product.price.toString())
		}
	}, [product])

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
			<Image
				source={{ uri: image || defaultPizzaImage }}
				resizeMode='contain'
				style={styles.image}
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select Image
			</Text>
			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				maxLength={30}
				placeholder='Name'
				style={styles.input}
			/>
			<Text style={styles.error}>{error.name ? error.name : null}</Text>
			<Text style={styles.label}>Price ($)</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				maxLength={6}
				placeholder='9.99'
				keyboardType='numeric'
				style={styles.input}
			/>
			<Text style={styles.error}>{error.price ? error.price : null}</Text>
			<Button onPress={onSubmit} disabled={isPending} text={isUpdating ? 'Update' : 'Create'} />
			<Text onPress={confirmDelete} disabled={isDeleteProduct} style={styles.textButton}>
				{isDeleteProduct ? 'Delete product...' : 'Delete'}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center'
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: Colors.light.tint,
		marginVertical: 10
	},
	label: {
		color: 'gray'
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		marginTop: 5,
		marginBottom: 20,
		backgroundColor: 'white',
		borderRadius: 5
	},
	error: {
		color: 'red',
		textAlign: 'center'
	}
})

export default createProductScreen
