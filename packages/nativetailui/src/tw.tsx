// lib/tailwind.js
import { create as createStore } from "zustand";

// create the customized version...

// ... and then this becomes the main function your app uses
import { createContext, useContext, useEffect } from "react";
import { TailwindFn, create } from "./parser";
type ContextType = {
	tw: TailwindFn | null;
	theme: any | null;
	setTheme: (theme: any) => void;
};
export const ThemeContext = createContext<ContextType>({
	tw: null,
	theme: null,
	setTheme: () => {},
});

const useTwStore = createStore<{
	tw: TailwindFn | null;
}>(() => ({ tw: null }));
export const ThemeProvider = ({
	children,
	theme,
}: {
	children: any;
	theme: any;
}) => {
	const tw = useTwStore((s) => s.tw);
	useEffect(() => {
		if (theme) setTheme(theme);
	}, [theme]);
	const setTheme = (theme: any) => {
		useTwStore.setState({ tw: create(theme) });
	};
	return (
		<ThemeContext.Provider value={{ tw, theme, setTheme }}>
			{tw && children}
		</ThemeContext.Provider>
	);
};
export const useTwContext = () => {
	const twContext = useContext(ThemeContext);
	if (!twContext.tw) {
		console.error("No tw context found");
	}
	return twContext;
};
export const useTw = () => {
	const twContext = useContext(ThemeContext);
	if (!twContext.tw) {
		console.error("No tw context found");
		return create(require("../tailwind.config.js"));
	}
	const tw = twContext.tw;
	return tw!;
};
export const useTwColor = () => {
	const tw = useTw();
	const getTwColor = (color: string) => {
		return tw.style(color).color as string;
	};
	return { getTwColor };
};
export const getTWColor = (color: string) => {
	const tw = useTwStore.getState().tw!;
	return tw.style(color).color as string;
};
export const getTw = () => useTwStore.getState().tw!;

export const separateClasses = (className: string, isText = false) => {
	const initialClasses = className.split(" ");
	const classes: string[] = [];
	initialClasses.forEach((c) => {
		if (c in predefinedAnimationClasses) {
			const classValue =
				predefinedAnimationClasses[
					c as keyof typeof predefinedAnimationClasses
				] + " ";

			classes.push(...classValue.split(" "));
		} else {
			classes.push(c);
		}
	});
	const textClasses = isText
		? classes.join(" ")
		: classes
				.filter((c) => textClassPrefixSet.some((nc) => c.startsWith(nc)))
				.join(" ");
	const otherClasses = isText
		? classes.join(" ")
		: classes
				.filter((c) => !c.startsWith("text-") || !c.startsWith("font-"))
				.join(" ");
	const animatableClasses = classes
		.filter((c) => nonAnimatedClassesSet.every((nc) => !c.startsWith(nc)))
		.join(" ");
	const hoverClasses = classes
		.filter((c) => c.startsWith("hover:"))
		.map((c) => c.replace("hover:", ""))
		.join(" ");
	const activeClasses = classes
		.filter((c) => c.startsWith("active:"))
		.map((c) => c.replace("active:", ""))
		.join(" ");
	const nonStateClasses = classes
		.filter((c) => !c.startsWith("hover:") || !c.startsWith("active:"))
		.join(" ");
	const inClasses = classes
		.filter((c) => c.startsWith("in:"))
		.map((c) => c.replace("in:", ""))
		.join(" ");
	const outClasses = classes
		.filter((c) => c.startsWith("out:"))
		.map((c) => c.replace("out:", ""))
		.join(" ");
	const nonAnimatableClasses = classes
		.filter((c) => nonAnimatedClassesSet.some((nc) => c.startsWith(nc)))
		.join(" ");
	const groupHoverClasses = classes
		.filter((c) => c.startsWith("group-hover:"))
		.map((c) => c.replace("group-hover:", ""))
		.join(" ");
	const groupActiveClasses = classes
		.filter((c) => c.startsWith("group-active:"))
		.map((c) => c.replace("group-active:", ""))
		.join(" ");

	return {
		textClasses,
		animatableClasses,
		otherClasses,
		hoverClasses,
		activeClasses,
		nonStateClasses,
		inClasses,
		outClasses,
		nonAnimatableClasses,
		groupHoverClasses,
		groupActiveClasses,
	};
};
const textClassPrefixSet = ["text-", "font-", "leading-"];
const predefinedAnimationClasses = {
	"fade-in": "in:opacity-100 opacity-100",
	"fade-out": "out:opacity-0 opacity-100",
	"fade-in-up": "in:-translate-y-2 translate-y-0 in:opacity-0 opacity-100",
	"fade-out-up": "out:-translate-y-2 translate-y-0  opacity-100 out:opacity-0",
	"fade-in-down": "in:translate-y-2 translate-y-0 in:opacity-0 opacity-100",
	"fade-out-down": "out:translate-y-2 translate-y-0 opacity-100 out:opacity-0",
	"fade-in-left": "in:-translate-x-2 translate-x-0 in:opacity-0 opacity-100",
	"fade-out-left":
		"out:-translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-in-right": "in:translate-x-2 translate-x-0 in:opacity-0 opacity-100",
	"fade-out-right":
		"out:translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-up-down":
		"in:-translate-y-2 translate-y-0 in:opacity-0 opacity-100 out:translate-y-2 opacity-100 out:opacity-0",
	"fade-down-up":
		"in:translate-y-2 translate-y-0 in:opacity-0 opacity-100 out:-translate-y-2 opacity-100 out:opacity-0",
	"fade-left-right":
		"in:-translate-x-2 translate-x-0 in:opacity-0 opacity-100 out:-translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-right-left":
		"in:translate-x-2 translate-x-0 in:opacity-0 opacity-100 out:translate-x-2 translate-x-100 opacity-100 out:opacity-0",
} as const;
const nonAnimatedClassesSet = [
	"justify-",
	"items-",
	"self-",
	"flex",
	"space-",
	"p-",
	"m-",
	"text-center",
	"text-left",
	"text-right",
];
