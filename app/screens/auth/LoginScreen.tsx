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
    <Box style={styles.container}>
      <VStack space='lg' style={styles.formBox}>
        <Heading size='xl' style={styles.heading}>
          Login
        </Heading>

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

          {isPasswordInvalid && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Minimum 6 characters</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Button
          style={styles.loginButton}
          isDisabled={isEmailInvalid || isPasswordInvalid}
          onPress={() => login(email, password)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Button>

        <Pressable onPress={() => navigation.navigate('SignupScreen' as never)}>
          <Text style={styles.linkText}>
            Don&apos;t have an account? Sign up
          </Text>
        </Pressable>
      </VStack>
    </Box>
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
