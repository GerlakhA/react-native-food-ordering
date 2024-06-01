import { supabase } from '@/lib/supabse'
import { useAuth } from '@/providers/AuthProvider'
import { Order } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOrder = () => {
	const queryClient = useQueryClient()
	const { session } = useAuth()

	const user = session?.user

	return useMutation({
		async mutationFn({ total }: Pick<Order, 'total'>) {
			if (!user) return null

			const { error, data } = await supabase
				.from('orders')
				.insert({
					total,
					user_id: user.id
				})
				.select()

			if (error) {
				throw error
			}
			return data[0]
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['orders'] })
		},
		onError(error) {
			console.log(error)
		}
	})
}
