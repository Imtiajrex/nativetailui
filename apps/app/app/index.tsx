import { View, Text, Button } from 'nativetailui'

export default function Index() {
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

            >
                Click me!
            </Button>
        </View>
    )
}