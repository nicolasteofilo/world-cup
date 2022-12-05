import { createContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>
  isUserLoading: boolean
}

export const AuthContext = createContext({} as AuthContextDataProps)


export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUseLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '828796783577-pqfmdd80rengqld2j4mcb5uumjq6c50g.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn(): Promise<void> {
    try {
      setIsUseLoading(true);
      await promptAsync();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUseLoading(false)
    }
    return null
  }

  async function signInWithGoogle(accessToken: string) {
    console.log('AUTH TOKEN ==>', accessToken)
  }

  useEffect(() => {
    if(response?.type === 'success' && response?.authentication.accessToken) {
     signInWithGoogle(response.authentication.accessToken); 
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{ 
        signIn,
        user: {
          name: 'Nicolas',
          avatarUrl: 'https://github.com/nicolasteofilo.png'
        },
        isUserLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
