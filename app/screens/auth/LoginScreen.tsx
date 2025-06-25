import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import InputField from '@/app/components/ui/input';
import CustomButton from '@/app/components/ui/authButton';
import { useNavigation } from '@react-navigation/native';
import GoogleSVG from '../../../assets/images/google.svg';
import { IconLock, IconMail, IconPassword } from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AlertCircleIcon } from '@/components/ui/icon';
import { useAuthStore } from '@/app/store/useAuthStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useAuthStore();

  const isEmailInvalid = email.trim() === '' || !email.includes('@');
  const isPasswordInvalid = password.trim().length < 6;

  return (
    <SafeAreaView className='flex-1 justify-center bg-white'>
      <View className='px-6'>
        <Text
          style={{
            color: colors.primary,
          }}
          className="font-medium text-2xl text-[#333] mb-8 font-['Roboto-Medium']">
          Login
        </Text>

        <InputField
          label='Email ID'
          icon={<IconMail size={20} color='#666' style={{ marginRight: 5 }} />}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label='Password'
          inputType='password'
          icon={<IconLock size={20} color='#666' style={{ marginRight: 5 }} />}
          fieldButtonLabel='Forgot?'
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton
          label='Login'
          onPress={() => {
            login(email, password);
          }}
        />

        <Text className='text-center text-[#666] mb-8'>Or, </Text>

        <View className='flex-row  mb-8 items-center justify-center'>
          <TouchableOpacity
            onPress={() => {}}
            className='border-2 border-[#ddd] rounded-xl px-8 py-2 flex-row text-center'>
            <GoogleSVG height={24} width={24} />
            <Text className='ml-4'>Login with Google</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-center mb-8'>
          <Text>New to the app?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen' as never)}>
            <Text style={{ color: colors.primary }} className=' font-bold'>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  formBox: {
    width: '100%',
    maxWidth: 400,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 4,
  },
  loginButton: {
    backgroundColor: '#3b82f6', // primary-500
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#2563eb', // primary-600
  },
});
