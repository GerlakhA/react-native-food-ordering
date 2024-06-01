import { supabase } from '@/lib/supabse'
import { useQuery } from '@tanstack/react-query'

export const useOrderItemById = (id: number) => {
	return useQuery({
		queryKey: ['orders', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*, order_items(*, products(*))')
				.eq('id', id)
				.single()
			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})
}
