
export default {
	expo: {
		scheme: "native-tail-ui",
		name: "NativeTailUI",
		slug: "native-tail-ui",
		owner: "imtiajrex",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "cover",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.nativetailui.app",

			buildNumber: "11",
		},
		android: {
			package: "com.nativetailui.app",
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			permissions: ["android.permission.RECORD_AUDIO"],
			versionCode: 3,
		},
		web: {
			favicon: "./assets/images/favicon.png",
			bundler: "metro",
			output: "static",
		},
		plugins: [
			"expo-router",
		],
		extra: {
			router: {
				origin: false,
			},
			eas: {
			},
		},
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {
			url: "https://u.expo.dev/0a1cf4f9-ca4b-4499-b2da-ae4a200510e9",
		},
		experiments: {
			typedRoutes: true,
		},
	},
};
