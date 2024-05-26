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

        const { textClasses, otherClasses, inClasses, outClasses, nonStateClasses } = separateTextClasses(className);
        return (
            <MotiView
                from={tw`${inClasses}`}
                animate={tw`${nonStateClasses}`}
                style={tw`${otherClasses}`}
                exit={tw`${outClasses}`}
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