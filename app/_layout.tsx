import {SplashScreen, Stack, usePathname, useGlobalSearchParams} from "expo-router";
import { Text, View } from 'react-native';
import '@/global.css';
import {useFonts} from 'expo-font';
import {useEffect} from "react";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { PostHogProvider, usePostHog } from 'posthog-react-native';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file');
}

const InitialLayout = () => {
    const [fontsLoaded] = useFonts({
        'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
        'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    });

    const posthog = usePostHog();
    const pathname = usePathname();
    const params = useGlobalSearchParams();

    useEffect(() => {
        if (posthog && pathname) {
            posthog.screen(pathname, params);
        }
    }, [pathname, params, posthog]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return <Stack screenOptions={{headerShown: false}} />;
};

export default function RootLayout() {
    return (
        <PostHogProvider
            apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
            options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST }}
        >
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
                <InitialLayout />
            </ClerkProvider>
        </PostHogProvider>
    );
}
