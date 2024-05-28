import { MotiProps } from 'moti';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { separateClasses, useTw } from '../..';

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
    const tw = useTw();
    const { textClasses, animatableClasses, inClasses, outClasses, nonAnimatableClasses } = separateClasses(className);
    const animatedStyle = useDerivedValue(() => {
        return {
            ...tw.style(
                animatableClasses,
                animate?.value!,
                animatedClass?.value!
            ), ...(
                typeof style == "object" ? style : {}
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