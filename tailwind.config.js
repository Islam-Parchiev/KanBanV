/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors:{
				'mainBackgroundColor':'#0D1117',
				'columnBackgroundColor':'#161c22',
			},
		},
	},
	plugins: [],
}

