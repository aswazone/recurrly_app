import "@/global.css"
import {Text} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-bold text-success">
                Welcome to Native wind!
            </Text>
            <Link href="/onboarding" className="mt-4 rounded bg-primary text-white p-4">Onboarding</Link>
            <Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white p-4">Sign In</Link>
            <Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white p-4">Sign Up</Link>
            <Link href="/subscriptions/spotify" className="mt-4 rounded bg-primary text-white p-4">Spotify
                Subscriptions</Link>
            <Link
                href={{
                    pathname: "/subscriptions/[id]",
                    params: {id: "Claude"}
                }}
                className="mt-4 rounded bg-primary text-white p-4">
                Claude Pro Subscriptions
            </Link>
        </SafeAreaView>
    );
}