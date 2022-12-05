import { createContext } from "react";

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
}

export const AuthContext = createContext({} as AuthContextDataProps)


export function AuthContextProvider({ children }: AuthProviderProps) {

  function signIn(): Promise<void> {
    console.log('SignIn')
    return null
  }

  return (
    <AuthContext.Provider
      value={{ 
        signIn,
        user: {
          name: 'Nicolas',
          avatarUrl: 'https://github.com/nicolasteofilo.png'
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
