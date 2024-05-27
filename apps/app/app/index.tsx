import { AnimatePresence, MotiText, MotiView, motify } from 'moti'
import { Button, Text, TextInput, View } from 'nativetailui'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { SharedValue, runOnJS, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { create } from 'zustand'

const useOpenStore = create<{
    open: boolean
}>(
    (set) => ({
        open: false,
    })
)
export default function Index() {

    return (
        <View className='p-4 pt-12 items-center justify-center flex-col gap-4 bg-background max-w-2xl mx-auto w-full'>
            <Text className='text-2xl' >Hello, world!</Text>
            <View className='bg-card p-3 rounded-xl items-center gap-2 w-full'>
                <View
                    className='w-20 h-20 bg-primary rounded-full mb-2'
                />
                <Text className='text-lg'>This is a card</Text>
            </View>
            <Button
                className='text-black scale-100 hover:scale-105 active:scale-95  '
                onPress={() => {
                    useOpenStore.setState({ open: !useOpenStore.getState().open })
                }}
            >
                Click me!
            </Button>
            <Presence />
        </View>
    )
}
const Rotator = () => {
    const rotate = useSharedValue(0)
    useEffect(() => {
        const interval = setInterval(() => {
            rotate.value = rotate.value + 10
        }, 50)
        return () => clearInterval(interval)
    }, [])

    const animate = useDerivedValue(() => {
        return {
            rotate: `${rotate.value}deg`
        }
    }, [])

    return (
        <>
            <MotiView
                animate={animate}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    borderRadius: 12,
                }}
            />
            <AnimatedText
                sharedValue={rotate}
            />
        </>

    )
}
const AnimatedInput = motify(TextInput)()
const AnimatedText = ({
    sharedValue
}: {
    sharedValue: SharedValue<number>
}) => {

    const textRef = useRef<any>(null)

    const updateText = (value: number) => {

        if (!textRef.current) return
        textRef.current?.setNativeProps({
            text: value.toString()
        })
    }
    useAnimatedReaction(() => {
        return sharedValue.value
    }, (value) => {

        if (updateText)
            runOnJS(updateText)(value)

    }, [updateText, textRef])


    return (

        <AnimatedInput ref={textRef}
            value={sharedValue.value.toString()}
            editable={false}
            underlineColorAndroid={'transparent'}
            style={{
                color: 'black',
                fontSize: 24,
            }}
        />
    )

}
const Presence = () => {
    const open = useOpenStore(state => state.open)
    console.log("open", open)
    return (
        <AnimatePresence

        >
            {!open && (
                <Rotator
                    key={'rotator'}
                />

            )}
            {open &&
                <View
                    key={'view'}
                    className={`w-24 h-24 bg-primary rounded-xl mb-2 in:-translate-y-4 translate-y-0 in:opacity-0 opacity-100 out:opacity-0 out:-translate-y-4`}
                />}
        </AnimatePresence>
    )
}