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
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { AlertCircleIcon } from '@/components/ui/icon';
import { useAuthStore } from '@/app/store/useAuthStore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigation = useNavigation();
  const { signup } = useAuthStore();

  const isEmailInvalid = email.trim() === '' || !email.includes('@');
  const isPasswordInvalid = password.trim().length < 6;

  return (
    <Box className='flex-1 justify-center items-center px-6 bg-white'>
      <VStack space='lg' className='w-full max-w-sm'>
        <Heading size='xl' className='text-center mb-1'>
          SignUp
        </Heading>

        {/* Username Field */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>

          <Input>
            <InputField
              value={username}
              onChangeText={setUsername}
              placeholder='username'
              autoCapitalize='none'
            />
          </Input>
        </FormControl>

        {/* Email Field */}
        <FormControl isInvalid={isEmailInvalid} isRequired>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>

          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              placeholder='example@email.com'
              autoCapitalize='none'
            />
          </Input>

          {!isEmailInvalid ? (
            <FormControlHelper>
              <FormControlHelperText>
                Use the email you signed up with
              </FormControlHelperText>
            </FormControlHelper>
          ) : (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Enter a valid email</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Password Field */}
        <FormControl isInvalid={isPasswordInvalid} isRequired>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>

          <Input>
            <InputField
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder='••••••••'
            />
          </Input>

          {isPasswordInvalid ? (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Minimum 6 characters</FormControlErrorText>
            </FormControlError>
          ) : null}
        </FormControl>

        {/* Confirm Password Field */}
        <FormControl isInvalid={confirm !== password}>
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              placeholder='Repeat password'
            />
          </Input>
          {confirm !== password && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Passwords do not match
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Button
          isDisabled={isEmailInvalid || isPasswordInvalid}
          onPress={() => signup(username, email, password)}>
          <Text className='text-white'>Login</Text>
        </Button>

        <Pressable onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Text className='text-center text-primary-600 mt-2'>
            Already have an account? Login
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
}
