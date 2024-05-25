import { supabase } from '@/lib/supabse'
import { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsById = (id: number) => {
	const { data: product, isLoading: isProduct } = useQuery<Product>({
		queryKey: ['product', id],
		queryFn: async () => {
			const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
			if (error) {
				throw new Error(error.message)
			}
			return data
		}
	})

	return { product, isProduct }
}
