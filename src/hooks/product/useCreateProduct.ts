import { supabase } from '@/lib/supabse'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn(data: any) {
			const { error, data: newProduct } = await supabase
				.from('products')
				.insert({
					name: data.name,
					image: data.image,
					price: data.price
				})
				.single()

			if (error) {
				throw new Error(error.message)
			}
			return newProduct
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
		}
	})
}
