// lib/tailwind.js
import { TailwindFn, create } from "twrnc-next";
import { create as createStore } from 'zustand';

// create the customized version...

// ... and then this becomes the main function your app uses
import { createContext, useContext, useEffect } from "react";
type ContextType = {
	tw: TailwindFn | null;
	theme: any | null;
};
export const ThemeContext = createContext<ContextType>({
	tw: null,
	theme: null,
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
		console.log("setting theme")
		useTwStore.setState({ tw: create(theme) });
	}, [theme]);
	return (
		<ThemeContext.Provider value={{ tw, theme }}>
			{children}
		</ThemeContext.Provider>
	);
};
export const separateTextClasses = (className: string) => {
	const classes = className.split(" ");
	const textClasses = classes.filter((c) => c.startsWith("text-")).join(" ");
	const otherClasses = classes.filter((c) => !c.startsWith("text-")).join(" ");
	const hoverClasses = classes.filter((c) => c.startsWith("hover:")).map((c) => c.replace("hover:", "")).join(" ");
	const activeClasses = classes.filter((c) => c.startsWith("active:")).map((c) => c.replace("active:", "")).join(" ");
	const nonStateClasses = classes.filter((c) => !c.startsWith("hover:") && !c.startsWith("active:")).join(" ");
	const inClasses = classes.filter((c) => c.startsWith("in:")).map((c) => c.replace("in:", "")).join(" ");
	const outClasses = classes.filter((c) => c.startsWith("out:")).map((c) => c.replace("out:", "")).join(" ");

	return { textClasses, otherClasses, hoverClasses, activeClasses, nonStateClasses, inClasses, outClasses };
};
export const useTw = () => {
	const twContext = useContext(ThemeContext);
	const twFromStore = useTwStore((s) => s.tw);
	if (twFromStore) {
		return twFromStore;

	}
	if (!twContext.tw) {
		console.error("No tw context found");
		return create(require('../tailwind.config.js'))
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

