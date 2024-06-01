import { supabase } from '@/lib/supabse'
import { Button, Text, View } from 'react-native'

const ProfileScreen = () => {
	return (
		<View>
			<Text>Profile</Text>

			<Button title='Sign out' onPress={async () => await supabase.auth.signOut()} />
		</View>
	)
}

export default ProfileScreen
