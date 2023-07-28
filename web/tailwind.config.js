/** @type {import('tailwindcss').Config} */
export default {
	content: ['index.html', './src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				black: {
					900: '#0A0A0C',
					800: '#18181B',
					700: '#313134',
				},
				purple: {
					900: '#6C5DC6',
				},
			}
		},
	},
	plugins: [],
};

