import { Feather } from "@expo/vector-icons";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	FlatListProps,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "./primitives";
import { getTWColor, separateTextClasses, useTw } from "./tw";

import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	"flex-row gap-2  items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-card shadow ",
				destructive: "bg-red-500 text-card shadow-sm ",
				outline: "border border-primary text-foreground bg-black/0  ",
				secondary: "bg-secondary text-foreground shadow-sm ",
				ghost: "",
				link: "text-primary underline-offset-4 ",
				card: " bg-card shadow-sm",
			},
			size: {
				default: "h-12 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 px-8",
				icon: "h-9 w-9",
			},
			disabled: {
				true: "opacity-80",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
type ButtonProps = TouchableOpacityProps &
	VariantProps<typeof buttonVariants> & {
		text?: string;
		disabled?: boolean;
		isLoading?: boolean;
		textClass?: string;
		leftElement?: React.ReactNode;
		rightElement?: React.ReactNode;
	};

const Button = ({
	text,
	children,
	isLoading,
	className,
	disabled,
	variant,
	leftElement,
	rightElement,
	size,
	...props
}: ButtonProps) => {
	const tw = useTw();
	const [localLoading, setLocalLoading] = React.useState(false);

	const loading = isLoading || localLoading;

	const isDisabled = disabled || loading;
	const vairantClass = buttonVariants({
		variant,
		size,
		className,
		disabled: isDisabled,
	});
	const { textClasses, otherClasses } = separateTextClasses(vairantClass);
	const isText = typeof children === "string" || text;
	return (
		<TouchableOpacity
			style={tw.style(otherClasses)}
			disabled={disabled || loading}
			{...props}
			onPress={async (e) => {
				setLocalLoading(true);
				try {
					if (props.onPress) await props.onPress(e);
				} catch (e) {
					console.error(e);
				}
				setLocalLoading(false);
			}}
		>
			{leftElement}
			{loading && (
				<ActivityIndicator
					className="mr-2 h-5 w-5 "
					color={getTWColor(textClasses)}
				/>
			)}
			{isText && (
				<Text style={tw.style("text-md text-center font-medium ", textClasses)}>
					{children || text}
				</Text>
			)}

			{!isText && children}
			{rightElement}
		</TouchableOpacity>
	);
};
const Badge = ({
	text,
	bgColor = "bg-indigo-500/15",
	textColor = "text-indigo-500",
	containerClassName,
	children,
}: {
	text?: string;
	bgColor?: string;
	textColor?: string;
	containerClassName?: string;
	children?: React.ReactNode;
}) => {
	const tw = useTw();
	return (
		<View
			style={tw.style(
				`${bgColor} rounded-full items-center justify-center px-2 py-1`,
				containerClassName
			)}
		>
			{children}
			{text && (
				<Text
					className={`text-white text-xs text-center font-medium ${textColor}`}
				>
					{text}
				</Text>
			)}
		</View>
	);
};
const Progress = ({
	progress,
	containerClass,
	progressClass,
}: {
	progress: number;
	containerClass?: string;
	progressClass?: string;
}) => {
	const tw = useTw();
	return (
		<View
			style={tw.style("w-full h-2 bg-gray-300 rounded-full", containerClass)}
		>
			<View
				style={tw.style(
					"h-full bg-indigo-500 rounded-full",
					progressClass,
					`w-[${progress}%]`
				)}
			/>
		</View>
	);
};
const Divider = ({ className }: { className?: string }) => {
	const tw = useTw();
	return (
		<View style={tw.style("border-b border-gray-300 w-full py-1", className)} />
	);
};
const Checkbox = ({
	checked,
	onChange,
	activeClass = "bg-primary",
	inactiveClass = "bg-card border-primary",
	iconActiveClass = "text-white",
	iconInactiveClass = "text-gray-300",
	iconSize = 14,
	className,
}: {
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
	activeClass?: string;
	inactiveClass?: string;
	iconActiveClass?: string;
	iconInactiveClass?: string;
	iconSize?: number;
}) => {
	const tw = useTw();
	return (
		<TouchableOpacity
			onPress={() => onChange(!checked)}
			style={tw.style(
				"flex items-center justify-center w-6 h-6 border border-gray-300 rounded-md",
				checked ? activeClass : inactiveClass,
				className
			)}
		>
			<Feather
				name="check"
				size={iconSize}
				style={tw.style(checked ? iconActiveClass : iconInactiveClass)}
			/>
		</TouchableOpacity>
	);
};
export const TabSelector = <T extends string>({
	containerClass,
	buttonClass,
	buttonActiveClass,
	buttonTextClass,
	options,
	value,
	onChange,
	disabled,
	label,
}: {
	containerClass?: string;
	buttonClass?: string;
	buttonActiveClass?: string;
	buttonTextClass?: string;
	buttonActiveTextClass?: string;
	options: {
		label: string;
		value: T;
	}[];
	value: T;
	onChange: (value: T) => void;
	disabled?: boolean;
	label?: string;
}) => {
	const tw = useTw();
	return (
		<View className="w-full gap-2">
			{label && <Text className="text-sm font-medium">{label}</Text>}
			<View
				style={tw.style(
					"flex-row flex-wrap gap-2 items-center w-full",
					containerClass
				)}
			>
				{options.map((option) => (
					<TabButton
						key={option.value}
						buttonClass={buttonClass}
						activeClass={buttonActiveClass}
						activeTextClass={buttonTextClass}
						textClass={buttonTextClass}
						active={option.value === value}
						onPress={() => onChange(option.value)}
						disabled={disabled}
					>
						{option.label}
					</TabButton>
				))}
			</View>
		</View>
	);
};
const TabButton = ({
	buttonClass,
	textClass,
	activeTextClass = "text-black",
	children,
	activeClass = "bg-primary",
	active,
	onPress,
	disabled,
}: {
	buttonClass?: string;
	textClass?: string;
	activeClass?: string;
	activeTextClass?: string;
	children: string;
	active?: boolean;
	onPress?: () => void;
	disabled?: boolean;
}) => {
	const tw = useTw();
	return (
		<TouchableOpacity
			style={tw.style(
				"px-4 py-2 rounded-full border border-primary items-center justify-center",
				buttonClass,
				active ? activeClass : ""
			)}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				style={tw.style(
					"text-sm font-medium text-white",
					textClass,
					active ? activeTextClass : ""
				)}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

import { useCallback, useMemo } from "react";
const List = <T extends any>({
	loadMore,
	isLoading,
	isFetchingNextPage,
	Header,
	ListComponent,
	_extraProps,
	...props
}: FlatListProps<T> & {
	loadMore?: () => void;
	ListComponent?: React.ComponentType<any>;
	Header?: React.ReactNode;
	isLoading?: boolean;
	isFetchingNextPage?: boolean;
	_extraProps?: any;
}) => {
	const tw = useTw();
	const ListComp = ListComponent || FlatList;
	const dataLength = useMemo(
		() => props.data?.length || 0,

		[props.data]
	);
	const renderListHeader = useCallback(
		() => (
			<View className={`gap-2`}>
				{Header}
				{isLoading ? (
					<ActivityIndicator color={getTWColor("text-primary")} size="small" />
				) : null}
				{!isLoading && dataLength === 0 && (
					<Text className={`text-muted text-center mt-4`}>
						No data available
					</Text>
				)}
			</View>
		),
		[Header, isLoading, dataLength]
	);

	return (
		<ListComp
			onEndReachedThreshold={0.75}
			onEndReached={loadMore}
			ListHeaderComponent={renderListHeader}
			ItemSeparatorComponent={() => <View className="h-2" />}
			ListFooterComponent={() => (
				<View style={tw`items-center justify-center p-4`}>
					{isFetchingNextPage && (
						<ActivityIndicator
							color={getTWColor("text-primary")}
							size="small"
						/>
					)}
				</View>
			)}
			{...props}
			{..._extraProps}
		/>
	);
};
export { Badge, Button, Checkbox, Divider, List, Progress };

