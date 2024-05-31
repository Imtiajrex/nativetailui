import React from "react";
import { useTw } from "../../tw";
import { Text } from "../text";

import { MotiPressable, MotiPressableProps } from "moti/interactions";
import usePressableStyle from "../../hooks/usePressableStyle";
import GroupProvider from "../../contexts/GroupContext";

type PressableProps = MotiPressableProps &
{
    text?: string;
    textClass?: string;
    className?: string;
    children?: React.ReactNode;
};

const Pressable = ({
    text,
    children,
    className = '',
    ...props
}: PressableProps) => {
    const tw = useTw();


    const isText = !!text || typeof children == "string";
    const {
        animate,
        textClasses,
        nonAnimatableClasses

    } = usePressableStyle({
        className: className
    })
    return (
        <GroupProvider isGroup={
            className.includes("group")
        }>
            <MotiPressable
                animate={animate}
                style={tw`${nonAnimatableClasses}`}
                transition={{
                    type: "timing",
                    duration: 150,
                }}
                {...props}
            >
                {isText && (
                    <Text style={tw.style(textClasses)}>
                        {children || text}
                    </Text>
                )}

                {!isText && children}
            </MotiPressable>
        </GroupProvider>
    );
};
export {
    Pressable
};

