import { router } from "expo-router";
import { AnimatePresence } from "moti";
import { Button, Pressable, Text, View } from "nativetailui";
import { useEffect } from "react";
import {
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { create } from "zustand";

const useOpenStore = create<{
	open: boolean;
}>((set) => ({
	open: false,
}));
export default function Index() {
	return (
		<AnimatePresence presenceAffectsLayout exitBeforeEnter>
			<View className="p-4 pt-12 items-center flex-1 flex-col gap-4 bg-background max-w-2xl mx-auto w-full">
				<Text className="text-2xl fade-in-up w-full text-center">
					Hello, world!
				</Text>

				<View className="bg-card p-3 rounded-xl items-center gap-2 w-full h-44">
					<Circle />
					<Text className="text-lg fade-in-up mt-1">This is a card</Text>
				</View>

				<Button
					className="text-black scale-100 hover:scale-[102] active:scale-[98] mt-4"
					onPress={() => {
						useOpenStore.setState({ open: !useOpenStore.getState().open });
					}}
				>
					Click me!
				</Button>
				<Pressable
					className="flex-row items-center gap-2 bg-blue-500 rounded-xl px-6 py-4 hover:scale-105 scale-100 active:scale-95 hover:bg-blue-400 active:bg-white group"
					onPress={() => {
						router.push("/test");
					}}
				>
					<View className="w-8 h-8 justify-center items-center bg-orange-200 rounded-full">
						<View className="bg-white w-0 h-6 rounded-full  group-hover:w-3 group-active:w-6 " />
					</View>
					<Text className="text-white group-active:text-black">Press Me!</Text>
				</Pressable>

				<Button
					className="text-black absolute bottom-4 right-4 text-2xl "
					onPress={() => {
						useOpenStore.setState({ open: !useOpenStore.getState().open });
					}}
				>
					+
				</Button>
			</View>
		</AnimatePresence>
	);
}
const Circle = () => {
	const open = useOpenStore((state) => state.open);
	return (
		<View
			className={`w-20 h-20 rounded-full mb-2  fade-in-right border-2 ${open ? "bg-primary border-blue-500" : "bg-green-500 border-black"}`}
		/>
	);
};
const Rotator = () => {
	const rotate = useSharedValue(0);
	useEffect(() => {
		rotate.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
	}, []);
	const animatedClass = useDerivedValue(() => {
		if (rotate.value > 150) rotate.value = 0;
		return `w-[${24 + rotate.value}]`;
	});

	return (
		<>
			<View
				className={` h-24 bg-blue-500 rounded-xl mb-2 in:scale-0 scale-100 out:scale-0  `}
				animatedClass={animatedClass}
			/>
		</>
	);
};
const Presence = () => {
	const open = useOpenStore((state) => state.open);
	return (
		<AnimatePresence exitBeforeEnter presenceAffectsLayout>
			{!open && <Rotator key={"rotator"} />}
			{open && (
				<View
					key={"view"}
					className={`w-24 h-24 bg-primary rounded-xl mb-2 fade-up-down`}
				/>
			)}
		</AnimatePresence>
	);
};
