import { supabase } from '@/lib/supabse'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export const useDeleteProduct = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn(id: number) {
			const { error } = await supabase.from('products').delete().eq('id', id)
			if (error) {
				throw new Error(error.message)
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] })
			router.back()
			router.back()
		}
	})
}
