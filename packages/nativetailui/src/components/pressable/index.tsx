import React from "react";
import { useTw } from "../../tw";

import { renderChildren } from "../../utils/renderChildren";
import { MotiPressable, MotiPressableProps } from "moti/interactions";
import GroupProvider from "../../contexts/GroupContext";
import usePressableStyle from "../../hooks/usePressableStyle";

type PressableProps = MotiPressableProps & {
	textClass?: string;
	className?: string;
	children?: React.ReactNode;
};

const Pressable = ({ children, className = "", ...props }: PressableProps) => {
	const tw = useTw();

	const { animate, textClasses, nonAnimatableClasses, containerStyle } =
		usePressableStyle({
			className: className,
		});

	return (
		<GroupProvider isGroup={className.includes("group")}>
			<MotiPressable
				animate={animate}
				style={tw`${nonAnimatableClasses}`}
				transition={{
					type: "timing",
					duration: 150,
				}}
				containerStyle={[containerStyle, props.containerStyle!] as any}
				{...props}
			>
				{renderChildren(children, textClasses)}
			</MotiPressable>
		</GroupProvider>
	);
};
export { Pressable };
