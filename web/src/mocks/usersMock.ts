export async function getUsers() {
	await Promise.resolve(setTimeout(() => {}, 300));

	return usersMock;
}

const usersMock = [
	{
		email: 'foo@bar.com',
		profilePicture: 'https://github.com/LucasAndrade912.png'
	},
	{
		email: 'bar@foo.com',
		profilePicture: 'https://github.com/LucasAndrade912.png'
	},
	{
		email: 'lorem@ipsum.com',
		profilePicture: 'https://github.com/LucasAndrade912.png'
	},
	{
		email: 'ipsum@lorem.com',
		profilePicture: 'https://github.com/LucasAndrade912.png'
	}
];
