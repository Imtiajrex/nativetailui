import { useMemo } from "react";
import { separateClasses, useTw } from "../tw";

import { MotiPressableProp } from "moti/interactions";


export default function usePressableStyle({
    className = ""
}: {
    className?: string;
}) {
    const tw = useTw();

    const { textClasses, animatableClasses, nonAnimatableClasses, hoverClasses, activeClasses, inClasses, outClasses } = useMemo(() => separateClasses(className), [className, tw.memoBuster]);
    const activeStyle = useMemo(() => tw.style(animatableClasses, activeClasses), [activeClasses, animatableClasses, tw])
    const hoverStyle = useMemo(() => tw.style(animatableClasses, hoverClasses), [hoverClasses, animatableClasses, tw]);
    const nonStateStyle = useMemo(() => tw`${animatableClasses}`, [animatableClasses, tw]);
    const animate: MotiPressableProp = useMemo(
        () => ({ hovered, pressed }: {
            hovered: boolean;
            pressed: boolean;
        }) => {
            "worklet";

            if (pressed) {
                return activeStyle
            }
            if (hovered) {
                return hoverStyle
            }
            return nonStateStyle

        },
        [
            activeStyle,
            hoverStyle,
            nonStateStyle,
        ]
    );
    return {
        from: tw`${inClasses}`,
        animate,
        exit: tw`${outClasses}`,
        style: tw`${nonAnimatableClasses}`,
        textClasses,
        nonAnimatableClasses
    }
}