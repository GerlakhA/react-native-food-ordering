import { supabase } from '@/lib/supabse'
import { useAuth } from '@/providers/AuthProvider'
import { useQuery } from '@tanstack/react-query'

export const useGetUserOrders = () => {
	const { session } = useAuth()
	const id = session?.user.id

	return useQuery({
		queryKey: ['orders', { userId: id }],
		queryFn: async () => {
			if (!id) return []

			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('user_id', id)
				.order('created_at', { ascending: false })
			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})
}
