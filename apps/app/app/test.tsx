import { router } from "expo-router";
import { AnimatePresence } from "moti";
import { Button, Text, View } from "nativetailui";
import { useState } from "react";

export default function Index() {
	const [state, setState] = useState(0);

	return (
		<AnimatePresence presenceAffectsLayout exitBeforeEnter>
			<View className="p-4 pt-12 items-center justify-center flex-col gap-4 bg-background max-w-2xl mx-auto w-full">
				<Text className="text-2xl fade-in-up">This is the test page</Text>

				<View className="bg-card p-3 rounded-xl items-center gap-2 w-full h-44">
					<View className="w-20 h-20 bg-primary rounded-full mb-2  fade-in-right" />
					<Text className="text-lg fade-in-up">Test page card</Text>
				</View>

				<View className="w-full flex-row gap-3">
					<Button
						className="text-black scale-100 hover:scale-105 active:scale-95 flex-1 "
						onPress={() => {
							router.push("/");
						}}
					>
						Go Back
					</Button>
					<Button
						className={`text-black font-medium scale-100 hover:scale-105 active:scale-95 flex-1 ${
							state % 2 === 0 ? "bg-primary" : "bg-secondary"
						}`}
						onPress={() => {
							setState(state + 1);
						}}
					>
						{`Counter ${state}`}
					</Button>
				</View>
			</View>
		</AnimatePresence>
	);
}
