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
					600: '#222223'
				},
				white: {
					900: '#FFFFFF',
					800: '#9C9C9C'
				},
				purple: {
					900: '#6C5DC6',
					800: '#796ad1'
				},
				custom: {
					red: '#F34343',
					rose: '#D64FB8',
					orange: '#F58B28'
				}
			},
			fontFamily: {
				play: ['Play', 'sans-serif'],
			},
			boxShadow: {
				blur: '0px 3px 6px 0px rgba(255, 255, 255, 0.10)',
				modal: '0px 1px 20px 15px rgba(255, 255, 255, 0.01)'
			},
			gridTemplateColumns: {
				table: '50% 20% 25% 5%'
			}
		},
	},
	plugins: [],
};

