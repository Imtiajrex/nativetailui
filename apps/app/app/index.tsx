import { AnimatePresence } from 'moti'
import { Button, Text, View } from 'nativetailui'
import { useEffect } from 'react'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
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
        <AnimatePresence>
            <View className='p-4 pt-12 items-center justify-center flex-col gap-4 bg-background max-w-2xl mx-auto w-full'>
                <Text className='text-2xl fade-in-up' >Hello, world!</Text>
                <View className='bg-card p-3 rounded-xl items-center gap-2 w-full'>
                    <View
                        className='w-20 h-20 bg-primary rounded-full mb-2  fade-in-right'
                    />
                    <Text className='text-lg fade-in-up'>This is a card</Text>
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
        </AnimatePresence>
    )
}
const Rotator = () => {
    const rotate = useSharedValue(0)
    useEffect(() => {
        const interval = setInterval(() => {
            rotate.value = rotate.value + 5
        }, 50)
        return () => clearInterval(interval)
    }, [])
    const animatedClass = useDerivedValue(() => {
        if (rotate.value > 150) rotate.value = 0
        return `w-[${24 + rotate.value}]`
    })

    return (
        <>
            <View
                className={` h-24 bg-blue-500 rounded-xl mb-2 in:scale-0 scale-100 out:scale-0  `}
                animatedClass={animatedClass}
            />
        </>

    )
}
const Presence = () => {
    const open = useOpenStore(state => state.open)
    console.log("open", open)
    return (
        <AnimatePresence
            exitBeforeEnter
            presenceAffectsLayout

        >
            {!open && (
                <Rotator
                    key={'rotator'}
                />

            )}
            {open &&
                <View
                    key={'view'}
                    className={`w-24 h-24 bg-primary rounded-xl mb-2 fade-up-down`}
                />}
        </AnimatePresence>
    )
}