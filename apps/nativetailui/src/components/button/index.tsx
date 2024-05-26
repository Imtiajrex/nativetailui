import React, { useMemo } from "react";
import {
    ActivityIndicator,
} from "../../primitives";
import { getTWColor, separateTextClasses, useTw } from "../../tw";
import { Text } from "../text";

import { cva, type VariantProps } from "class-variance-authority";
import { MotiPressable, MotiPressableProps } from "moti/interactions";

const buttonVariants = cva(
    "flex-row gap-2  items-center justify-center rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-card shadow ",
                destructive: "bg-red-500 text-card shadow-sm ",
                outline: "border border-primary text-foreground bg-black/0  ",
                secondary: "bg-secondary text-foreground shadow-sm ",
                ghost: "",
                link: "text-primary underline-offset-4 ",
                card: " bg-card shadow-sm",
            },
            size: {
                default: "h-12 px-4 py-2",
                sm: "h-8 px-3 text-xs",
                lg: "h-10 px-8",
                icon: "h-9 w-9",
            },
            disabled: {
                true: "opacity-80",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
type ButtonProps = MotiPressableProps &
    VariantProps<typeof buttonVariants> & {
        text?: string;
        disabled?: boolean;
        isLoading?: boolean;
        textClass?: string;
        leftElement?: React.ReactNode;
        rightElement?: React.ReactNode;
        className?: string;
        children?: React.ReactNode;
    };

const Button = ({
    text,
    children,
    isLoading,
    className,
    disabled,
    variant,
    leftElement,
    rightElement,
    size,
    ...props
}: ButtonProps) => {
    const tw = useTw();

    const loading = isLoading;

    const isDisabled = disabled || loading;
    const vairantClass = useMemo(() => buttonVariants({
        variant,
        size,
        className,
        disabled: isDisabled,
    }), [variant, size, className, isDisabled, tw.memoBuster]);
    const { textClasses, otherClasses, hoverClasses, activeClasses, nonStateClasses } = useMemo(() => separateTextClasses(vairantClass), [vairantClass, tw.memoBuster]);
    const isText = typeof children === "string" || text;
    const animate = useMemo(
        () => ({ hovered, pressed }: {
            hovered: boolean;
            pressed: boolean;
        }) => {
            "worklet";
            if (pressed) {
                return tw.style(
                    nonStateClasses,
                    activeClasses
                )
            }
            if (hovered) {
                return tw.style(
                    nonStateClasses,
                    hoverClasses
                )
            }
            return tw`${nonStateClasses}`

        },
        [
            activeClasses,
            hoverClasses,
            nonStateClasses,
            tw.memoBuster,
            tw
        ]
    );
    return (
        <MotiPressable
            disabled={disabled || loading}
            animate={animate}
            style={tw`${otherClasses}`}
            {...props}
        >
            {leftElement}
            {loading && (
                <ActivityIndicator
                    className="mr-2 h-5 w-5 "
                    color={getTWColor(textClasses)}
                />
            )}
            {isText && (
                <Text style={tw.style("text-sm text-center font-medium ", textClasses)}>
                    {children || text}
                </Text>
            )}

            {!isText && children}
            {rightElement}
        </MotiPressable>
    );
};
export {
    Button
};

