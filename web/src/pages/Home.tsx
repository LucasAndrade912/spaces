import { useAuth } from '../hook/useAuth';

export function Home() {
	const { user } = useAuth();

	return (
		<>
			<div className="flex justify-center items-center h-screen flex-col">
				<span>Email: {user?.email}</span>
				<img src={user?.profilePicture} alt="User Profile" />
			</div>
		</>
	);
}
