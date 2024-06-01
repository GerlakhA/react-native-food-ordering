import { supabase } from '@/lib/supabse'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export const useUpdateProduct = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn(data: any) {
			const { error, data: updatedProduct } = await supabase
				.from('products')
				.update({
					name: data.name,
					image: data.image,
					price: data.price
				})
				.eq('id', data.id)
				.select()
				.single()

			if (error) {
				throw new Error(error.message)
			}
			return updatedProduct
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
			await queryClient.invalidateQueries({ queryKey: ['products', id] })
			router.back()
		}
	})
}
