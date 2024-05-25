import { supabase } from '@/lib/supabse'
import { Product } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export const useUpdateProduct = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn({ id, ...update }: Product) {
			const { data, error } = await supabase.from('products').update(update).eq('id', id).select()

			if (error) {
				throw error
			}
			return data
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
			await queryClient.invalidateQueries({ queryKey: ['product', id] })
			router.back()
		},
		onError(error) {
			console.log(error)
		}
	})
}
