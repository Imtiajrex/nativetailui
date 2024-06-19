import { renderChildren } from "../../utils/renderChildren";
import { MotiView } from "moti";
import React, { forwardRef } from "react";
import { View as NativeView, ViewStyle } from "react-native";
import { useInGroup } from "../../contexts/GroupContext";
import {
	AnimatedClassProps,
	useAnimatedStyle,
	useGroupedAnimatedStyle,
} from "../../hooks/useAnimatedStyle";

type ViewProps = React.ComponentProps<typeof NativeView> &
	AnimatedClassProps<ViewStyle>;

const GroupView = forwardRef<typeof MotiView, ViewProps>(
	({ className = "text-foreground", children, ...props }, ref) => {
		const { from, animate, exit, style, textClasses } = useGroupedAnimatedStyle(
			{
				className: className,
				style: props.style,
				animate: props.animate,
				animatedClass: props.animatedClass,
				isText: false,
			}
		);
		return (
			<MotiView
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				{...props}
				ref={ref}
			>
				{renderChildren(children, textClasses)}
			</MotiView>
		);
	}
);

const BaseView = forwardRef<typeof MotiView, ViewProps>(
	({ className = "text-foreground", children, ...props }, ref) => {
		const { from, animate, exit, style, textClasses } = useAnimatedStyle({
			className: className,
			style: props.style,
			animate: props.animate,
			animatedClass: props.animatedClass,
			isText: false,
		});

		return (
			<MotiView
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				{...props}
				ref={ref}
			>
				{renderChildren(children, textClasses)}
			</MotiView>
		);
	}
);
const View = forwardRef<typeof MotiView, ViewProps>((props, ref) => {
	const inGroup = useInGroup();
	if (inGroup) {
		return <GroupView {...props} ref={ref} />;
	}
	return <BaseView {...props} ref={ref} />;
});
export { View };
