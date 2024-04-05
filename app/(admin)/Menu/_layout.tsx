import Colors  from '@/constants/Colors';
import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MenuStack() {
    return (
        <Stack>
        <Stack.Screen 
        name="index" 
        options={{ 
            title: 'Menu',
            headerRight: () => (
                <Link href="/(admin)/Menu/create" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                              name="plus"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
        ) }} />


        </Stack>
    );
}
