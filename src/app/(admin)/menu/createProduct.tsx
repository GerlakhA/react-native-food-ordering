import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
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

	const onCreateProduct = () => {
		if (!validateInput()) {
			return
		}

		setName('')
		setPrice('')
		setImage('')
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

	const onDelete = () => {
		console.warn(`Delete product ${id}`)
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
			<Button onPress={onCreateProduct} text={isUpdating ? 'Update' : 'Create'} />
			<Text onPress={confirmDelete} style={styles.textButton}>
				Delete
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
