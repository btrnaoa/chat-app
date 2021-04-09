import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { User } from '../common/types';

type NullableUser = User | null;

const UserContext = createContext<
  | { user: NullableUser; setUser: Dispatch<SetStateAction<NullableUser>> }
  | undefined
>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<NullableUser>(null);
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}

export { UserProvider, useUser };
