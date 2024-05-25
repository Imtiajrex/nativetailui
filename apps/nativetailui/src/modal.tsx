import React from "react";
import NativeModal from "react-native-modal";
import { Text, View } from "./primitives";
import { Button } from "..";

import { Iconify } from "react-native-iconify";
import { getTWColor } from "./tw";
export type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	header?: React.ReactNode;
	title?: string;
};
export default function Modal({
	open,
	onClose,
	children,
	title,
	header,
}: ModalProps) {
	return (
		<NativeModal
			isVisible={open}
			onSwipeComplete={onClose}
			onDismiss={onClose}
			onBackButtonPress={onClose}
			onBackdropPress={onClose}
		>
			<View className="bg-background p-2 rounded-xl">
				{header ? header : null}
				{header === undefined && <Header title={title} onClose={onClose} />}
				{children}
			</View>
		</NativeModal>
	);
}
const Header = ({
	title,
	onClose,
}: {
	title?: string;
	onClose?: () => void;
}) => {
	return (
		<View className="bg-background items-center flex-row justify-between">
			<Text className="text-sm text-center font-bold">{title}</Text>
			<Button variant={"ghost"} className="p-2 px-2 py-1" onPress={onClose}>
				<Iconify
					icon="ep:close-bold"
					size={16}
					color={getTWColor("text-foreground")}
				/>
			</Button>
		</View>
	);
};
