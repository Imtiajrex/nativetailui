import { useMemo } from "react";
import { separateClasses, useTw } from "../tw";

import { MotiPressableProp } from "moti/interactions";

export default function usePressableStyle({
	className = "",
}: {
	className?: string;
}) {
	const tw = useTw();

	const {
		textClasses,
		animatableClasses,
		nonAnimatableClasses,
		hoverClasses,
		activeClasses,
		inClasses,
		outClasses,
	} = useMemo(() => separateClasses(className), [className, tw.memoBuster]);
	const activeStyle = useMemo(
		() => tw.style(animatableClasses, activeClasses),
		[activeClasses, animatableClasses, tw]
	);
	const hoverStyle = useMemo(
		() => tw.style(animatableClasses, hoverClasses),
		[hoverClasses, animatableClasses, tw]
	);
	const nonStateStyle = useMemo(
		() => tw`${animatableClasses}`,
		[animatableClasses, tw]
	);
	const animate: MotiPressableProp = useMemo(
		() =>
			({ hovered, pressed }: { hovered: boolean; pressed: boolean }) => {
				"worklet";

				if (pressed) {
					return activeStyle;
				}
				if (hovered) {
					return hoverStyle;
				}
				return nonStateStyle;
			},
		[activeStyle, hoverStyle, nonStateStyle]
	);
	const containerStyle = useContainerStyle(className);

	return {
		from: tw`${inClasses}`,
		animate,
		exit: tw`${outClasses}`,
		style: tw`${nonAnimatableClasses}`,
		textClasses,
		nonAnimatableClasses,
		containerStyle,
	};
}

const useContainerStyle = (className: string) => {
	const tw = useTw();

	const containerStyles = tw`${className}`;
	let containerStyle = {} as any;
	if (Object.keys(containerStyles).length > 0) {
		ignorableKeys.forEach((key) => {
			delete containerStyles[key];
		});

		containerStyle = {
			...containerStyles,
		};
	}
	return containerStyle;
};

const ignorableKeys = [
	"padding",
	"paddingTop",
	"paddingBottom",
	"paddingLeft",
	"paddingRight",
	"paddingHorizontal",
	"paddingVertical",
	"margin",
	"marginTop",
	"marginBottom",
	"marginLeft",
	"marginRight",
	"marginHorizontal",
	"marginVertical",
	"backgroundColor",
	"borderRadius",
	"borderWidth",
	"borderColor",
	"border",
	"shadow",
	"shadowOpacity",
	"shadowRadius",
	"shadowOffset",
	"shadowColor",
	"shadowOffsetX",
	"shadowOffsetY",
	"height",
];
