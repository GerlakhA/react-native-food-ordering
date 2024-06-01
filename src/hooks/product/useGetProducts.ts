import { supabase } from '@/lib/supabse'
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	const { data: products, isLoading: isProducts } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error } = await supabase.from('products').select('*')
			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})

	return { products, isProducts }
}
