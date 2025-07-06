import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from '@/components/ui/form-control';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { AlertCircleIcon } from '@/components/ui/icon';
import { useAuthStore } from '@/app/store/useAuthStore';

import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';

import GoogleSVG from '../../../assets/images/google.svg';
import InputField from '@/app/components/ui/input';

import { IconLock, IconMail, IconUser } from '@tabler/icons-react-native';

import CustomButton from '@/app/components/ui/authButton';
import { colors } from '@/app/constants/theme';
import { RootStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuthStore();

  const isEmailInvalid = email.trim() === '' || !email.includes('@');
  const isPasswordInvalid = password.trim().length < 6;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View className='justify-center' style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            color: colors.primary,
          }}
          className="font-medium text-2xl text-[#333] mb-8 font-['Roboto-Medium']">
          Register
        </Text>

        <InputField
          label={'Full Name'}
          icon={<IconUser size={20} color='#666' style={{ marginRight: 5 }} />}
          value={name}
          onChangeText={setName}
        />

        <InputField
          label={'Email ID'}
          icon={<IconMail size={20} color='#666' style={{ marginRight: 5 }} />}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label={'Password'}
          icon={<IconLock size={20} color='#666' style={{ marginRight: 5 }} />}
          value={password}
          onChangeText={setPassword}
          inputType='password'
        />

        <InputField
          label={'Confirm Password'}
          icon={<IconLock size={20} color='#666' style={{ marginRight: 5 }} />}
          inputType='password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton
          label={'Register'}
          onPress={() => {
            if (confirmPassword === password) {
              signup(name, email, password);
            } else {
              console.log('password doesnt match');
            }
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen' as never)}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or,
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            className='flex-row'
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
            <Text className='ml-4'>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
