import { useSignUp } from '@clerk/expo';
import { type Href, Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import clsx from 'clsx';
import '@/global.css';

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp() as any;
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
      const result = await signUp.password ? await signUp.password({ emailAddress, password }) 
                     : await signUp.create({ emailAddress, password });
                     
      const error = result?.error;

      if (error) {
        return handleError(error);
      }

      if (!error) {
        if (signUp.verifications?.sendEmailCode) {
            await signUp.verifications.sendEmailCode();
        } else {
            await signUp.prepareEmailAddressVerification?.({ strategy: 'email_code' });
        }
      }
    } catch (err: any) {
        handleError(err);
    }
  };

  const handleVerify = async () => {
    try {
      if (signUp.verifications?.verifyEmailCode) {
          await signUp.verifications.verifyEmailCode({ code });
      } else {
          await signUp.attemptEmailAddressVerification?.({ code });
      }

      if (signUp.status === 'complete') {
        const setActive = (global as any).setActive || (signUp as any).setActive;
        if(signUp.createdSessionId && setActive) await setActive({ session: signUp.createdSessionId });

        await signUp.finalize({
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
  
  const handleResend = async () => {
      try {
        if (signUp.verifications?.sendEmailCode) {
            await signUp.verifications.sendEmailCode();
        } else {
            await signUp.prepareEmailAddressVerification?.({ strategy: 'email_code' });
        }
      } catch (err: any) {
          handleError(err);
      }
  }

  if (signUp?.status === 'missing_requirements' && signUp?.unverifiedFields?.includes('email_address') && signUp?.missingFields?.length === 0) {
    return (
      <SafeAreaView className="auth-safe-area">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
          <ScrollView keyboardShouldPersistTaps="handled" className="auth-scroll" contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
            <View className="auth-content">
              <View className="auth-brand-block">
                <Text className="auth-title">Verify your account</Text>
                <Text className="auth-subtitle">We sent a verification code to {emailAddress}</Text>
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
                  </View>
                  
                  {generalError ? <Text className="auth-error">{generalError}</Text> : null}

                  <Pressable
                    className={clsx("auth-button", fetchStatus === 'fetching' && "auth-button-disabled")}
                    onPress={handleVerify}
                    disabled={fetchStatus === 'fetching'}
                  >
                    <Text className="auth-button-text">Verify</Text>
                  </Pressable>

                  <Pressable
                    className="auth-secondary-button"
                    onPress={handleResend}
                  >
                    <Text className="auth-secondary-button-text">I need a new code</Text>
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
                 <View className="auth-logo-mark">
                    <Text className="auth-logo-mark-text">R</Text>
                 </View>
                 <View>
                    <Text className="auth-wordmark">Recurly</Text>
                    <Text className="auth-wordmark-sub">SMART BILLING</Text>
                 </View>
              </View>
              <Text className="auth-title">Create an account</Text>
              <Text className="auth-subtitle">Sign up to start managing your subscriptions</Text>
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
                    placeholder="Create a password"
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
                  <Text className="auth-button-text">Sign up</Text>
                </Pressable>
              </View>

              <View className="auth-link-row">
                <Text className="auth-link-copy">Already have an account?</Text>
                <Link href="/(auth)/sign-in" asChild>
                  <Pressable>
                    <Text className="auth-link">Sign in</Text>
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
