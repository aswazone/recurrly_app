import {Text, View, Pressable, ScrollView} from 'react-native'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";
import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            // Trigger replacement route navigation 
            router.replace('/(auth)/sign-in');
        } catch (err) {
            console.error("Sign out failed", err);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-30">
                <View className="mb-8 mt-4">
                    <Text className="text-3xl font-sans-bold text-primary">Settings</Text>
                </View>

                {/* Dummy Section 1 */}
                <View className="mb-6">
                    <Text className="list-title mb-4">Account</Text>
                    <View className="rounded-2xl border border-black/10 bg-white overflow-hidden">
                        <Pressable className="flex-row items-center justify-between p-4 border-b border-black/5">
                            <Text className="text-base font-sans-medium text-primary">Profile Info</Text>
                            <Text className="text-muted-foreground font-sans-medium pl-4">&gt;</Text>
                        </Pressable>
                        <Pressable className="flex-row items-center justify-between p-4 border-b border-black/5">
                            <Text className="text-base font-sans-medium text-primary">Payment Methods</Text>
                            <Text className="text-muted-foreground font-sans-medium pl-4">&gt;</Text>
                        </Pressable>
                        <Pressable className="flex-row items-center justify-between p-4">
                            <Text className="text-base font-sans-medium text-primary">Notifications</Text>
                            <Text className="text-muted-foreground font-sans-medium pl-4">&gt;</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Dummy Section 2 */}
                <View className="mb-8">
                    <Text className="list-title mb-4">Preferences</Text>
                    <View className="rounded-2xl border border-black/10 bg-white overflow-hidden">
                        <Pressable className="flex-row items-center justify-between p-4 border-b border-black/5">
                            <Text className="text-base font-sans-medium text-primary">Theme</Text>
                            <Text className="text-muted-foreground font-sans-medium">Light &gt;</Text>
                        </Pressable>
                        <Pressable className="flex-row items-center justify-between p-4 border-b border-black/5">
                            <Text className="text-base font-sans-medium text-primary">Currency</Text>
                            <Text className="text-muted-foreground font-sans-medium">INR &gt;</Text>
                        </Pressable>
                        <Pressable className="flex-row items-center justify-between p-4">
                            <Text className="text-base font-sans-medium text-primary">Language</Text>
                            <Text className="text-muted-foreground font-sans-medium">English &gt;</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Log Out Button */}
                <Pressable 
                    onPress={handleSignOut}
                    className="mt-2 items-center rounded-2xl bg-accent py-4 w-full"
                >
                    <Text className="text-base font-sans-bold text-white">Log Out</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Settings
