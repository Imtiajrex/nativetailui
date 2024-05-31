import useAnimatedStyle, { AnimatedClassProps } from "../../hooks/useAnimatedStyle";
import { MotiView } from "moti";
import React, { forwardRef } from "react";
import {
    View as NativeView,
    ViewStyle
} from "react-native";
import { Text } from "../../..";
import { useTw } from "../../tw";

type ViewProps = React.ComponentProps<typeof NativeView> & AnimatedClassProps<ViewStyle>
const View = forwardRef<NativeView, ViewProps>(
    ({ children, ...props }, ref) => {
        const tw = useTw();


        const { from, animate, exit, style, textClasses } = useAnimatedStyle({
            className: props.className,
            style: props.style,
            animate: props.animate,
            animatedClass: props.animatedClass
        });
        return (
            <MotiView
                from={from}
                animate={animate}
                exit={exit}
                style={style}
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
};

