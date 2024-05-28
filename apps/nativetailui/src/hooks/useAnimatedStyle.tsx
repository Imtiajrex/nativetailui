import { MotiProps } from 'moti';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SharedValue, runOnJS, runOnUI, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { getTw, separateClasses, useTw } from '../..';

export type AnimatedClassProps<T extends ViewStyle | TextStyle> = {
    className?: string;
    style?: StyleProp<T>;
    animate?: MotiProps<ViewStyle | TextStyle>['animate'];
    animatedClass?: Readonly<SharedValue<string>>;
}
export default function useAnimatedStyle<T extends ViewStyle | TextStyle>({
    className = "",
    style,
    animate,
    animatedClass
}: AnimatedClassProps<T>) {
    const tw = (useTw());
    const { textClasses, animatableClasses, inClasses, outClasses, nonAnimatableClasses } = separateClasses(className);

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
        textClasses
    }
}