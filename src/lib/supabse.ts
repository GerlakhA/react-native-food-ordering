import { Database } from '@/database.types'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key)
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value)
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key)
	}
}

const supabaseUrl = 'https://xfrfmwyphofzhysxqrer.supabase.co'
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcmZtd3lwaG9memh5c3hxcmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2MjczMDksImV4cCI6MjAzMjIwMzMwOX0.8xClyQB05eDjmfPe4khqwnInb1cF6Dh8EZvy1UAQ-1M'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false
	}
})
