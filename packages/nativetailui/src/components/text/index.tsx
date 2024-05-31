import { useInGroup } from "../../contexts/GroupContext";
import { MotiText } from "moti";
import React, { forwardRef } from "react";
import { TextStyle } from "react-native";
import { AnimatedClassProps, useAnimatedStyle, useGroupedAnimatedStyle } from "../../hooks/useAnimatedStyle";


type TextProps = React.ComponentProps<typeof MotiText> & AnimatedClassProps<TextStyle>
const GroupText = forwardRef<typeof MotiText, TextProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {

        const { from, animate, exit, style } = useGroupedAnimatedStyle({
            className: className,
            style: props.style,
            animate: props.animate,
            animatedClass: props.animatedClass
        })
        return (
            <BaseText
                from={from}
                animate={animate}
                exit={exit}
                style={style}
                {...props}
                ref={ref}
            >
                {children}
            </BaseText>
        );
    }
);

const BaseText = forwardRef<typeof MotiText, TextProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {

        const { from, animate, exit, style } = useAnimatedStyle({
            className: className,
            style: props.style,
            animate: props.animate,
            animatedClass: props.animatedClass
        })

        return (
            <MotiText
                from={from}
                animate={animate}
                exit={exit}
                style={style}
                {...props}
                ref={ref}
            >
                {children}
            </MotiText>
        );
    }
);
const Text = forwardRef<typeof MotiText, TextProps>(
    (props, ref) => {
        const inGroup = useInGroup();
        if (inGroup) {
            return <GroupText {...props} ref={ref} />;
        }
        return <BaseText {...props} ref={ref} />;
    }

);
export {
    Text
};

