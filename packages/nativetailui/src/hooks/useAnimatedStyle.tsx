import { MotiProps } from 'moti';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SharedValue, runOnJS, runOnUI, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { getTw, separateClasses, useTw } from '../..';
import { useMotiPressable } from 'moti/interactions';
import { useMemo } from 'react';

export type AnimatedClassProps<T extends ViewStyle | TextStyle> = {
    className?: string;
    style?: StyleProp<T>;
    animate?: MotiProps<ViewStyle | TextStyle>['animate'];
    animatedClass?: Readonly<SharedValue<string>>;
    isText?: boolean;
}
export default function useAnimatedStyle<T extends ViewStyle | TextStyle>({
    className = "",
    style,
    animate,
    animatedClass,
    isText
}: AnimatedClassProps<T>) {
    const tw = (useTw());
    const { textClasses, animatableClasses, inClasses, outClasses, nonAnimatableClasses, groupHoverClasses, groupActiveClasses } = separateClasses(className, isText);
    const groupHoverStyles = useMemo(() => tw.style(groupHoverClasses), [groupHoverClasses])
    const groupActiveStyles = useMemo(() => tw.style(groupActiveClasses), [groupActiveClasses])
    const animatableStyles = useMemo(() => tw.style(animatableClasses), [animatableClasses])
    const state = useMotiPressable(({ pressed, hovered }) => {
        'worklet'
        if (pressed) {
            return groupActiveStyles
        }
        if (hovered) {
            return groupHoverStyles
        }
        return animatableStyles;
    }, [
        groupActiveStyles,
        groupHoverStyles,
        animatableStyles
    ])

    const parse = (...classes: string[]) => {

        if (tw) {
            parsedStyle.value = tw.style(...classes)
        }


    }
    const parsedStyle = useSharedValue(
        tw.style(
            animatableClasses,
            animatedClass?.value ?? "",
        )
    )
    useAnimatedReaction(() => {
        return animatedClass?.value
    }, (value) => {
        runOnJS(parse)(animatableClasses, value || '')
    }, [])
    const animatedStyle = useDerivedValue(() => {
        return {

            ...parsedStyle.value,

            ...state?.__state?.value,
            ...animate,
            ...(
                typeof style === "object" ? style : {}
            )
        }
    }, [])

    return {

        from: tw`${inClasses}`,
        animate: animatedStyle,
        exit: tw`${outClasses}`,
        style: [
            tw`${nonAnimatableClasses}`,
            style
        ],
        textClasses,
        state
    }
}