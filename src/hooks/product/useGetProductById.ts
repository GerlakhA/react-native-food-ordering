import { supabase } from '@/lib/supabse'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsById = (id: number) => {
	return useQuery({
		queryKey: ['products', id],
		queryFn: async () => {
			const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})
}
