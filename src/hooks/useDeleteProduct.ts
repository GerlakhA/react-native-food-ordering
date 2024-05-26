import { supabase } from '@/lib/supabse'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export const useDeleteProduct = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn(id: number) {
			const { data, error } = await supabase.from('products').delete().eq('id', id).select()

			if (error) {
				throw error
			}
			return data
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
			router.back()
			router.back()
		},
		onError(error) {
			console.log(error)
		}
	})
}
