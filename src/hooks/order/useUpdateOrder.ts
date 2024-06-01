import { supabase } from '@/lib/supabse'
import { UpdateTables } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateOrder = () => {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn({ id, updatedFields }: { id: number; updatedFields: UpdateTables<'orders'> }) {
			const { error, data: updatedOrder } = await supabase
				.from('orders')
				.update(updatedFields)
				.eq('id', id)
				.select()
				.single()

			if (error) {
				throw new Error(error.message)
			}
			return updatedOrder
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['orders'] })
			await queryClient.invalidateQueries({ queryKey: ['orders', id] })
		}
	})
}
