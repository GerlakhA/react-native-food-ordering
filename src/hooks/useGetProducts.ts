import { supabase } from '@/lib/supabse'
import { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	const { data: products, isLoading: isProducts } = useQuery<Product[]>({
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
