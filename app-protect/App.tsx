import React, { useEffect } from 'react';

import ReactNativeBiometrics from 'react-native-biometrics';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Lock from './src/views/Lock';
import UnlockProvider, { useUnlock } from './src/contexts/UnlockContext';
import SuperSecretStuff from './src/views/SuperSecretStuff';

const Stack = createNativeStackNavigator();

const sendPublicKeyToServer = async (pK: string) => {
  /**
   * api that send the public key to the server, and securely stores on the db. will be used to check
   * the private key result after biometric auth

     const response = await fetch("https://awesome-api.org/unlockApp", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(opt),
      });
      const jsonResponse = await response.json();
      return jsonResponse.decryptionObject as string;
  */
  return new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
};

export default function App() {
  const generateKeysIfNotExists = async () => {
    try {
      const existKeys = await ReactNativeBiometrics.biometricKeysExist();
      if (!existKeys.keysExist) {
        const keyResult = await ReactNativeBiometrics.createKeys();
        sendPublicKeyToServer(keyResult.publicKey);
      }
    } catch (e) {
      console.log(e); // handle the error correctly
    }
  };
  useEffect(() => {
    generateKeysIfNotExists();
  }, []);

  return (
    <UnlockProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </UnlockProvider>
  );
}

const StackNavigation: React.FC = () => {
  const [tokenKey] = useUnlock();

  return (
    <Stack.Navigator>
      {tokenKey ? (
        <Stack.Screen name="MainScreen" component={SuperSecretStuff} />
      ) : (
        <Stack.Screen name="LockScreen" component={Lock} />
      )}
    </Stack.Navigator>
  );
};
