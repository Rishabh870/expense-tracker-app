import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import GoogleSVG from '../../../assets/images/google.svg';
import InputField from '@/app/components/ui/input';

import { IconLock, IconMail, IconUser } from '@tabler/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '@/app/components/ui/authButton';
import { colors } from '@/app/constants/theme';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View className='justify-center' style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '600',
            color: colors.primary,
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          label={'Full Name'}
          icon={<IconUser />}
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

        <CustomButton label={'Register'} onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
};

export default RegisterScreen;
