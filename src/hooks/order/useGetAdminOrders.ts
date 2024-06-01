import { supabase } from '@/lib/supabse'
import { useQuery } from '@tanstack/react-query'

export const useGetAdminOrders = ({ archived = false }) => {
	const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

	return useQuery({
		queryKey: ['orders', { archived }],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.in('status', statuses)
				.order('created_at', { ascending: false })
			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})
}
