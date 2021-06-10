import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';


import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContexData {
  user: User;
  singInWithGoogle(): Promise<void>;
  singInWithApple(): Promise<void>;
  singOut(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContexData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user';


  async function singInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '407361031368-ppudpih7p9j07mocq6716qgv8rdeiebf.apps.googleusercontent.com',
        androidClientId: '407361031368-j8vf2rma1vipftu62cv0slmjgg8c6fe0.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function singInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });


      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async function singOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);    
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }
      setUserStorageLoading(false)
    }

    loadUserStorageDate();
  }, []);


  return (
    <AuthContext.Provider value={{
      user,
      singInWithGoogle,
      singInWithApple,
      singOut,
      userStorageLoading,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }