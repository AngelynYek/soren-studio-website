import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ACCOUNT_STORAGE_KEY,
  createProfile,
  emptyAccountState,
  restoreAccount,
  signInProfile,
  signOutProfile,
} from './account';

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      return restoreAccount(localStorage.getItem(ACCOUNT_STORAGE_KEY));
    } catch {
      return emptyAccountState();
    }
  });
  const [storageWarning, setStorageWarning] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(state));
      setStorageWarning('');
    } catch {
      setStorageWarning(
        'Your browser could not save this profile. It will only be available until you refresh or close this tab.',
      );
    }
  }, [state]);

  // Another tab saved a change; adopt it so this tab's next save does not overwrite it.
  useEffect(() => {
    const syncFromOtherTab = (event) => {
      if (event.key === ACCOUNT_STORAGE_KEY) setState(restoreAccount(event.newValue));
    };
    window.addEventListener('storage', syncFromOtherTab);
    return () => window.removeEventListener('storage', syncFromOtherTab);
  }, []);

  const updateProfile = (transition, input) => {
    try {
      setState(transition(state, input));
      return '';
    } catch (error) {
      return error.message;
    }
  };

  return (
    <AccountContext.Provider
      value={{
        profile: state.profiles.find((profile) => profile.email === state.currentEmail) ?? null,
        createAccount: (input) => updateProfile(createProfile, input),
        signIn: (email) => updateProfile(signInProfile, email),
        signOut: () => setState(signOutProfile),
        storageWarning,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const account = useContext(AccountContext);
  if (!account) throw new Error('useAccount requires AccountProvider');
  return account;
}
