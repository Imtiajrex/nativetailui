import CircularProgress from "react-native-circular-progress-indicator";

import { CircularProgressBaseProps } from "react-native-circular-progress-indicator/lib/typescript/types";
import { Text, View } from "./primitives";
import { getTWColor, useTw } from "./tw";

export type StepperProps = {
	steps: string[];
	activeStep: number;
	progressProps?: CircularProgressBaseProps;
};
export function Stepper({ steps, activeStep, progressProps }: StepperProps) {
	const activeStepData = steps.find((_, index) => index === activeStep - 1);
	const stepProgresss = (activeStep / steps.length) * 100;
	const nextStep = steps[activeStep];
	const nextStepData = nextStep ? nextStep : "Completed";
	const tw = useTw();

	return (
		<View className="flex-row items-center gap-2">
			<View className="w-18 h-18 ">
				<CircularProgress
					value={stepProgresss}
					activeStrokeWidth={8}
					radius={35}
					showProgressValue={false}
					activeStrokeColor={getTWColor("text-primary")}
					inActiveStrokeColor={getTWColor("text-primary/15")}
					{...progressProps}
				/>
				<View className="absolute top-0 left-0 w-full h-full text-center flex items-center justify-center ">
					<Text className="text-sm foreground ">
						{activeStep} of {steps.length}
					</Text>
				</View>
			</View>
			<View>
				<Text className="text-[16px] font-medium">{activeStepData}</Text>
				<Text className="text-sm text-muted">Next: {nextStepData}</Text>
			</View>
		</View>
	);
}
