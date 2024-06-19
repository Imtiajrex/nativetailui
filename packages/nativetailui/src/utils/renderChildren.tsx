import React from "react";
import { Text } from "../components/index";

export const renderChildren = (
	children: React.ReactNode,
	textClasses?: string
) => {
	return React.Children.map(children, (child) => {
		if (child && (typeof child === "string" || typeof child === "number")) {
			return (
				<Text className={textClasses} selectable={false}>
					{child}
				</Text>
			);
		}
		return child;
	});
};
