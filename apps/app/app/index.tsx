import { View, Text, Button, useTwContext } from 'nativetailui'
import { useState } from 'react'
import { AnimatePresence } from 'moti'

const theme1 = require('../tailwind.config')
const theme2 = require('../tailwind.config.2')
export default function Index() {
    const [open, setOpen] = useState(false)
    const { setTheme } = useTwContext()
    return (
        <View className='p-4 pt-12 items-center justify-center gap-4 bg-background max-w-2xl mx-auto w-full'>
            <Text className='text-2xl' >Hello, world!</Text>
            <View className='bg-card p-3 rounded-xl shadow-sm items-center gap-2 w-full'>
                <View
                    className='w-20 h-20 bg-primary rounded-full mb-2'
                />
                <Text className='text-lg'>This is a card</Text>
            </View>
            <Button
                className='text-black  scale-1 hover:scale-1.05 active:scale-0.95'
                onPress={() => {
                    setOpen(!open)
                    setTheme(
                        open ? theme1 : theme2
                    )

                }}
            >
                Click me!
            </Button>
            <AnimatePresence
            >
                <View
                    className={`w-full h-[${open ? '96' : '24'
                        }] bg-primary rounded-xl mb-2 in:-translate-y-44 translate-y-0 out:translate-y-44 `}
                />
            </AnimatePresence>
        </View>
    )
}