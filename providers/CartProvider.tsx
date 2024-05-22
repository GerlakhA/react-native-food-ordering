import { CartItem, Product } from '@/types'
import { randomUUID } from 'expo-crypto'
import { createContext, useContext, useState } from 'react'

interface ICartContext {
	items: CartItem[]
	addItem: (product: Product, size: CartItem['size']) => void
	updateQuantity: (id: string, amount: -1 | 1) => void
	totalPrice: number
}

interface ICartProvider {
	children: React.ReactNode
}

const CartContext = createContext<ICartContext>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	totalPrice: 0
})

const CartProvider = ({ children }: ICartProvider) => {
	const [items, setItems] = useState<CartItem[]>([])

	const addItem = (product: Product, size: CartItem['size']) => {
		const existingItem = items.find(item => item.product === product && item.size === size)

		if (existingItem) {
			updateQuantity(existingItem.id, 1)
			return
		}

		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size: size,
			quantity: 1
		}
		setItems([newCartItem, ...items])
	}

	const updateQuantity = (id: string, amount: -1 | 1) => {
		const updateItems = items
			.map(item => (item.id !== id ? item : { ...item, quantity: item.quantity + amount }))
			.filter(item => item.quantity > 0)
		setItems(updateItems)
	}

	const totalPrice = 123

	return (
		<CartContext.Provider value={{ items, totalPrice, addItem, updateQuantity }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider

export const useCart = () => useContext(CartContext)
