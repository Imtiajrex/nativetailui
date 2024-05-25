import { Stack, usePathname } from "expo-router";

export default function NotFoundScreen() {
	const pathname = usePathname();
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
		</>
	);
}
