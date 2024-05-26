import React, { forwardRef } from "react";
import {
	ActivityIndicator as NativeActivityIndicator,
	FlatList as NativeFlatList,
	FlatListProps as NativeFlatListProps,
	Image as NativeImage,
	ScrollView as NativeScrollView,
	Text as NativeText,
	TextInput as NativeTextInput,
	TouchableOpacity as NativeTouchableOpacity,
	View as NativeView,
} from "react-native";
import { getTWColor, separateTextClasses, useTw } from "./tw";
type ClassNameType = {
	className?: string;
};
type ViewProps = React.ComponentProps<typeof NativeView> & ClassNameType;
const View = forwardRef<NativeView, ViewProps>(
	({ className = "", children, ...props }, ref) => {
		const tw = useTw();

		const { textClasses, otherClasses } = separateTextClasses(className);
		return (
			<NativeView style={tw`${otherClasses}`} {...props} ref={ref}>
				{React.Children.map(children, (child) => {
					if (typeof child == "string") {
						return <Text className={textClasses}>{child}</Text>;
					}
					return child;
				})}
			</NativeView>
		);
	}
);

type TextProps = React.ComponentProps<typeof NativeText> & ClassNameType;
const Text = forwardRef<NativeText, TextProps>(
	({ className = "text-foreground", children, ...props }, ref) => {
		const tw = useTw();
		return (
			<NativeText
				style={tw.style("text-foreground", className)}
				{...props}
				ref={ref}
			>
				{children}
			</NativeText>
		);
	}
);

type TouchableOpacityProps = React.ComponentProps<
	typeof NativeTouchableOpacity
> &
	ClassNameType;
const TouchableOpacity = forwardRef<
	NativeTouchableOpacity,
	TouchableOpacityProps
>(({ className = "", ...props }, ref) => {
	const tw = useTw();
	return (
		<NativeTouchableOpacity style={tw`${className}`} {...props} ref={ref} />
	);
});
type ActivityIndicatorProps = React.ComponentProps<
	typeof NativeActivityIndicator
> &
	ClassNameType;
const ActivityIndicator = (props: ActivityIndicatorProps) => {
	const tw = useTw();
	return (
		<NativeActivityIndicator {...props} style={tw`w-8 h-8 text-primary`} />
	);
};

type ImageProps = React.ComponentProps<typeof NativeImage> & ClassNameType;
const Image = forwardRef<NativeImage, ImageProps>(
	({ className = "", ...props }, ref) => {
		const tw = useTw();
		return <NativeImage style={tw`${className}`} {...props} ref={ref} />;
	}
);
type FlatListProps<T> = NativeFlatListProps<T> &
	ClassNameType & {
		contentClass?: string;
	};
const FlatList = <T extends any>({
	className = "",
	contentClass = "",
	...props
}: FlatListProps<T>) => {
	const tw = useTw();
	return (
		<NativeFlatList
			style={tw`${className}`}
			contentContainerStyle={tw`${contentClass}`}
			{...props}
		/>
	);
};
type ScrollViewProps = React.ComponentProps<typeof NativeScrollView> &
	ClassNameType & {
		containerClass?: string;
	};
const ScrollView = forwardRef<NativeScrollView, ScrollViewProps>(
	({ containerClass = "", className = "", ...props }, ref) => {
		const tw = useTw();
		return (
			<NativeScrollView
				style={tw`${containerClass}`}
				contentContainerStyle={tw`${className}`}
				{...props}
				ref={ref}
			/>
		);
	}
);
type TextInputProps = React.ComponentProps<typeof NativeTextInput> &
	ClassNameType & {
		containerClass?: string;
		label?: string;
		error?: string;
		helperText?: React.ReactNode;
		leftElement?: React.ReactNode;
		rightElement?: React.ReactNode;
	};
const TextInput = forwardRef<NativeTextInput, TextInputProps>(
	(
		{ containerClass, className = "", helperText, label, error, ...props },
		ref
	) => {
		const tw = useTw();
		return (
			<View style={tw.style("gap-1 w-full ", containerClass)}>
				{label && <Text className="text-sm font-medium">{label}</Text>}
				{props.leftElement && (
					<View className="absolute left-2 top-[30%]">{props.leftElement}</View>
				)}
				<NativeTextInput
					style={tw.style(
						"w-full p-2 h-12 border border-muted rounded-lg text-foreground bg-card",
						className,
						error && "border-red-500",
						!!props.leftElement && "pl-8"
					)}
					placeholderTextColor={getTWColor("text-muted")}
					{...props}
					ref={ref}
				/>
				{props.rightElement && (
					<View className="absolute right-2 top-[30%]">
						{props.rightElement}
					</View>
				)}
				{helperText && <Text className="text-sm text-muted">{helperText}</Text>}
				{error && <Text className="text-sm text-red-500">{error}</Text>}
			</View>
		);
	}
);
export {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
};

export type {
	ActivityIndicatorProps,
	FlatListProps,
	ImageProps,
	ScrollViewProps,
	TextInputProps,
	TouchableOpacityProps,
};
