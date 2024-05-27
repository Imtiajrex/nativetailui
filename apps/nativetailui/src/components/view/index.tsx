import React, { forwardRef } from "react";
import {
    View as NativeView
} from "react-native";
import { separateTextClasses, useTw } from "../../tw";
import { Text } from "../../..";
import { MotiView } from "moti";

type ViewProps = React.ComponentProps<typeof NativeView> & {
    className?: string;
};
const View = forwardRef<NativeView, ViewProps>(
    ({ className = "", children, ...props }, ref) => {
        const tw = useTw();

        const { textClasses, animatableClasses, inClasses, outClasses, nonAnimatableClasses } = separateTextClasses(className);
        console.log(nonAnimatableClasses)
        return (
            <MotiView
                from={tw`${inClasses}`}
                animate={tw`${animatableClasses}`}
                exit={tw`${outClasses}`}
                style={tw`${nonAnimatableClasses}`}
                {...props}

            >
                {React.Children.map(children, (child) => {
                    if (typeof child == "string") {
                        return <Text className={textClasses}>{child}</Text>;
                    }
                    return child;
                })}
            </MotiView>
        )

    }
);
export {
    View
}