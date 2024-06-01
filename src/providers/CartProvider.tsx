import { useInsertOrderItems } from '@/hooks/order-items/useInsertOrderItems'
import { useCreateOrder } from '@/hooks/order/useCreateOrder'
import { CartItem, Product } from '@/types'
import { randomUUID } from 'expo-crypto'
import { useRouter } from 'expo-router'
import { createContext, useContext, useState } from 'react'

interface ICartContext {
	items: CartItem[]
	addItem: (product: Product, size: CartItem['size']) => void
	updateQuantity: (id: string, amount: -1 | 1) => void
	totalPrice: number
	checkout: () => void
}

interface ICartProvider {
	children: React.ReactNode
}

const CartContext = createContext<ICartContext>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	checkout: () => {},
	totalPrice: 0
})

const CartProvider = ({ children }: ICartProvider) => {
	const [items, setItems] = useState<CartItem[]>([])
	const router = useRouter()

	const { mutate: createOrder } = useCreateOrder()
	const { mutate: insertOrderItems } = useInsertOrderItems()

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

	const totalPrice = items.reduce((sum, item) => (sum += item.product.price! * item.quantity), 0)

	const checkout = () => {
		createOrder(
			{ total: totalPrice },
			{
				onSuccess: saveOrderItems
			}
		)
	}

	const saveOrderItems = (newOrder: any) => {
		if (!newOrder) return

		insertOrderItems(
			{
				items,
				order_id: newOrder.id
			},
			{
				onSuccess() {
					setItems([])
					router.push(`/(user)/orders/${newOrder.id}`)
				}
			}
		)
	}

	return (
		<CartContext.Provider value={{ items, totalPrice, addItem, updateQuantity, checkout }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider

export const useCart = () => useContext(CartContext)
