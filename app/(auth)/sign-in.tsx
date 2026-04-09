import { useSignIn } from '@clerk/expo';
import { type Href, Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import clsx from 'clsx';
import '@/global.css';

const SafeAreaView = styled(RNSafeAreaView);

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn() as any;
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  const handleError = (err: any) => {
    console.log("Auth Error:", JSON.stringify(err, null, 2));
    setFieldErrors({});
    setGeneralError('');
    if (err?.errors) {
      const newErrors: Record<string, string> = {};
      let hasGeneral = false;
      err.errors.forEach((e: any) => {
        if (e.meta?.paramName) {
          let param = e.meta.paramName;
          if (param === 'identifier' || param === 'email_address') param = 'email';
          newErrors[param] = e.longMessage || e.message;
        } else {
          setGeneralError(e.longMessage || e.message);
          hasGeneral = true;
        }
      });
      setFieldErrors(newErrors);
      if (Object.keys(newErrors).length === 0 && !hasGeneral) {
        setGeneralError(err.errors[0]?.longMessage || err.errors[0]?.message || 'An error occurred');
      }
    } else {
      setGeneralError(err?.message || "An error occurred");
    }
  };

  const clearErrors = (field?: string) => {
    if (field) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    setGeneralError('');
  };

  const handleSubmit = async () => {
    try {
      // @ts-ignore - Using experimental Clerk v5 API methods provided in the quickstart
      const result = await signIn.password ? await signIn.password({ emailAddress, password }) 
                     : await signIn.create({ identifier: emailAddress, password });
      
      const error = result?.error;

      if (error) {
        return handleError(error);
      }

      if (signIn.status === 'complete') {
        const setActive = (global as any).setActive || (signIn as any).setActive;
        if(signIn.createdSessionId && setActive) await setActive({ session: signIn.createdSessionId });

        await signIn.finalize({
          navigate: ({ session, decorateUrl }: any) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            router.replace('/(tabs)');
          },
        }).catch((e:any) => {
             // Fallback for older API versions
             router.replace('/(tabs)');
        });
      } else if (signIn.status === 'needs_second_factor') {
        // MFA flow...
      } else if (signIn.status === 'needs_client_trust') {
         // Trust flow...
         const emailCodeFactor = signIn.supportedSecondFactors?.find(
            (factor: any) => factor.strategy === 'email_code',
         );

         if (emailCodeFactor && signIn.mfa) {
            await signIn.mfa.sendEmailCode();
         }
      }
    } catch (err: any) {
        handleError(err);
    }
  };

  const handleVerify = async () => {
    try {
        if(signIn.mfa) await signIn.mfa.verifyEmailCode({ code });

        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({ session }: any) => {
                if (session?.currentTask) return;
                router.replace('/(tabs)');
                },
            }).catch((e:any) => {
                 router.replace('/(tabs)');
            });
        }
    } catch (err: any) {
        handleError(err);
    }
  };

  if (signIn?.status === 'needs_client_trust') {
    return (
      <SafeAreaView className="auth-safe-area">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
          <ScrollView keyboardShouldPersistTaps="handled" className="auth-scroll" contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
            <View className="auth-content">
              <View className="auth-brand-block">
                <Text className="auth-title">Verify your account</Text>
                <Text className="auth-subtitle">We sent a verification code to your email.</Text>
              </View>

              <View className="auth-card">
                <View className="auth-form">
                  <View className="auth-field">
                    <Text className="auth-label">Verification Code</Text>
                    <TextInput
                      className="auth-input"
                      value={code}
                      onChangeText={(text) => { setCode(text); clearErrors('code'); }}
                      placeholder="Enter verification code"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                    />
                    {fieldErrors['code'] && <Text className="auth-error">{fieldErrors['code']}</Text>}
                    {generalError ? <Text className="auth-error">{generalError}</Text> : null}
                  </View>

                  <Pressable
                    className={clsx("auth-button", fetchStatus === 'fetching' && "auth-button-disabled")}
                    onPress={handleVerify}
                    disabled={fetchStatus === 'fetching'}
                  >
                    <Text className="auth-button-text">Verify</Text>
                  </Pressable>

                  <Pressable
                    className="auth-secondary-button"
                    onPress={() => signIn.mfa?.sendEmailCode()}
                  >
                    <Text className="auth-secondary-button-text">I need a new code</Text>
                  </Pressable>
                  
                  <Pressable
                    className="auth-secondary-button"
                    onPress={() => signIn.reset && signIn.reset()}
                  >
                    <Text className="auth-secondary-button-text">Start over</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="auth-safe-area">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" className="auth-scroll" contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
          <View className="auth-content">
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                 <View className="auth-logo-mark ">
                    <Text className="auth-logo-mark-text">R</Text>
                 </View>
                 <View>
                    <Text className="auth-wordmark">Recurly</Text>
                    <Text className="auth-wordmark-sub">SMART BILLING</Text>
                 </View>
              </View>
              <Text className="auth-title">Welcome back</Text>
              <Text className="auth-subtitle">Sign in to continue managing your subscriptions</Text>
            </View>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Email</Text>
                  <TextInput
                    className={clsx("auth-input", fieldErrors['email'] && "auth-input-error")}
                    value={emailAddress}
                    onChangeText={(text) => { setEmailAddress(text); clearErrors('email'); }}
                    placeholder="Enter your email"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {fieldErrors['email'] && <Text className="auth-error">{fieldErrors['email']}</Text>}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Password</Text>
                  <TextInput
                    className={clsx("auth-input", fieldErrors['password'] && "auth-input-error")}
                    value={password}
                    onChangeText={(text) => { setPassword(text); clearErrors('password'); }}
                    placeholder="Enter your password"
                    placeholderTextColor="#666666"
                    secureTextEntry
                  />
                  {fieldErrors['password'] && <Text className="auth-error">{fieldErrors['password']}</Text>}
                </View>
                
                {generalError ? <Text className="auth-error">{generalError}</Text> : null}

                <Pressable
                  className={clsx("auth-button", (!emailAddress || !password || fetchStatus === 'fetching') && "auth-button-disabled")}
                  onPress={handleSubmit}
                  disabled={!emailAddress || !password || fetchStatus === 'fetching'}
                >
                  <Text className="auth-button-text">Sign in</Text>
                </Pressable>
              </View>

              <View className="auth-link-row">
                <Text className="auth-link-copy">New to Recurly?</Text>
                <Link href="/(auth)/sign-up" asChild>
                  <Pressable>
                    <Text className="auth-link">Create an account</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
