import { supabase } from '@/lib/supabse'
import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthData = {
	session: Session | null
	isLoading: boolean
	profile: any
	isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
	session: null,
	isLoading: true,
	profile: null,
	isAdmin: false
})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null)
	const [profile, setProfile] = useState(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchSession = async () => {
		const {
			data: { session },
			error
		} = await supabase.auth.getSession()
		setSession(session)

		if (session) {
			const { data } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.single()
			setProfile(data || null)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		fetchSession()
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return (
		<AuthContext.Provider
			//@ts-ignore
			value={{ session, isLoading, profile, isAdmin: profile?.group === 'ADMIN' }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
