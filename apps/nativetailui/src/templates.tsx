import { View } from "./primitives";
import { useTw } from "./tw";

const Container = ({
	children,
	className,
	containerClass,
}: {
	children: React.ReactNode;
	className?: string;
	containerClass?: string;
}) => {
	const tw = useTw();
	return (
		<View style={tw.style("bg-background flex-1", containerClass)}>
			<View
				style={tw.style(
					"flex-1  gap-4 px-4 pt-12 max-w-3xl mx-auto w-full bg-background",
					className
				)}
			>
				{children}
			</View>
		</View>
	);
};
export { Container };
