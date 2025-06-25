import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeTokens(accessToken: string, refreshToken: string) {
  await AsyncStorage.setItem('accessToken', accessToken);
  await SecureStore.setItemAsync('refreshToken', refreshToken);
}

export async function getAccessToken() {
  return await AsyncStorage.getItem('accessToken');
}

export async function getRefreshToken() {
  return await SecureStore.getItemAsync('refreshToken');
}

export async function clearTokens() {
  await AsyncStorage.removeItem('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
}
