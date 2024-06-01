import { supabase } from '@/lib/supabse'
import { Product } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()
	const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
		mutationKey: ['create-product'],
		mutationFn: async (product: Omit<Product, 'id'>) => {
			const { data, error } = await supabase.from('products').insert(product).single()
			if (error) {
				throw error
			}

			return data
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onError(error) {
			console.log(error)
		}
	})
	return { createProduct, isCreateProduct }
}
