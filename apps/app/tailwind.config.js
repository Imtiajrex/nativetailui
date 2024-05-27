const plugin = require("tailwindcss/plugin");
module.exports = {
	theme: {
		screens: {
			sm: "380px",
			md: "420px",
			lg: "680px",
			// or maybe name them after devices for `tablet:flex-row`
			tablet: "1024px",
		},
		extend: {
			colors: {
				primary: "#C8264B",
				secondary: '#EBB461',
				background: '#F2F2F2',
				card: '#fff',
				foreground: '#000',
				muted: '#383737',
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				".container": "max-w-2xl flex-1 mx-auto gap-4 p-4 pt-10 w-full"
			})
		})
	]
};
