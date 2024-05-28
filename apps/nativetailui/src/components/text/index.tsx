import useAnimatedStyle, { AnimatedClassProps } from "../../hooks/useAnimatedStyle";
import { MotiText } from "moti";
import React, { forwardRef } from "react";
import { TextStyle } from "react-native";
import { useTw } from "../../tw";


type TextProps = React.ComponentProps<typeof MotiText> & AnimatedClassProps<TextStyle>
const Text = forwardRef<typeof MotiText, TextProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {
        const tw = useTw();

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
export {
    Text
};

