import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "nativetailui/src/tw";

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "index",
};

export default function _layout() {
	return (
		<>
			<ThemeProvider
				theme={require('../tailwind.config.js')}
			>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</ThemeProvider>
		</>
	);
}
