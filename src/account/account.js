export const ACCOUNT_STORAGE_KEY = 'soren-account-preview-v1';
export const MAX_PROFILES = 10;

export function emptyAccountState() {
  return { profiles: [], currentEmail: null };
}

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function validateEmail(value) {
  const email = normalizeEmail(value);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }
  return email;
}

function validateProfile(input) {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  if (!name || name.length > 80) {
    throw new Error('Please enter a name between 1 and 80 characters.');
  }
  return { name, email: validateEmail(input.email) };
}

export function createProfile(state, input) {
  const profile = validateProfile(input);
  if (state.profiles.some((existing) => existing.email === profile.email)) {
    throw new Error('An account with this email already exists in this browser. Please sign in.');
  }
  if (state.profiles.length >= MAX_PROFILES) {
    throw new Error(
      'This browser has reached its profile limit. Please sign in to an existing account.',
    );
  }
  return {
    profiles: [...state.profiles, profile],
    currentEmail: profile.email,
  };
}

export function signInProfile(state, value) {
  const email = validateEmail(value);
  if (!state.profiles.some((profile) => profile.email === email)) {
    throw new Error(
      'No account with this email was found in this browser. Please create an account first.',
    );
  }
  return { ...state, currentEmail: email };
}

export function signOutProfile(state) {
  return { ...state, currentEmail: null };
}

// Local profiles are UI previews, not authenticated identities. Restore only known fields.
export function restoreAccount(raw) {
  try {
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored?.profiles)) return emptyAccountState();
    const profiles = [];
    for (const entry of stored.profiles) {
      try {
        const profile = validateProfile(entry);
        if (!profiles.some((existing) => existing.email === profile.email)) profiles.push(profile);
      } catch {
        // Ignore individual invalid entries without losing the remaining profiles.
      }
      if (profiles.length >= MAX_PROFILES) break;
    }
    const email = normalizeEmail(stored.currentEmail);
    return {
      profiles,
      currentEmail: profiles.some((profile) => profile.email === email) ? email : null,
    };
  } catch {
    return emptyAccountState();
  }
}
