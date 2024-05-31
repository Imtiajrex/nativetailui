import { MotiView } from "moti";
import React, { forwardRef } from "react";
import {
    View as NativeView,
    ViewStyle
} from "react-native";
import { Text } from "../../..";
import { AnimatedClassProps, useAnimatedStyle, useGroupedAnimatedStyle } from "../../hooks/useAnimatedStyle";
import { useInGroup } from "../../contexts/GroupContext";

type ViewProps = React.ComponentProps<typeof NativeView> & AnimatedClassProps<ViewStyle>


const GroupView = forwardRef<typeof MotiView, ViewProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {

        const { from, animate, exit, style } = useGroupedAnimatedStyle({
            className: className,
            style: props.style,
            animate: props.animate,
            animatedClass: props.animatedClass
        })
        return (
            <MotiView
                from={from}
                animate={animate}
                exit={exit}
                style={style}
                {...props}
                ref={ref}
            >
                {children}
            </MotiView>
        );
    }
);

const BaseView = forwardRef<typeof MotiView, ViewProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {

        const { from, animate, exit, style, textClasses } = useAnimatedStyle({
            className: className,
            style: props.style,
            animate: props.animate,
            animatedClass: props.animatedClass
        })

        return (
            <MotiView
                from={from}
                animate={animate}
                exit={exit}
                style={style}
                {...props}
                ref={ref}
            >
                {React.Children.map(children, (child) => {
                    if (typeof child == "string") {
                        return <Text className={textClasses}>{child}</Text>;
                    }
                    return child;
                })}
            </MotiView>
        );
    }
);
const View = forwardRef<typeof MotiView, ViewProps>(
    (props, ref) => {
        const inGroup = useInGroup();
        if (inGroup) {
            return <GroupView {...props} ref={ref} />;
        }
        return <BaseView {...props} ref={ref} />;
    }

);
export {
    View
};

