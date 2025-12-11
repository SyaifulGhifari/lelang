'use client';

import { useState, useEffect } from 'react';
import { DUMMY_USERS } from '@/lib/constants/dummyData';
import { User } from '@/types';

export function useUser(userId?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        if (!userId) {
          // Return first user as current user
          setUser(DUMMY_USERS[0] || null);
        } else {
          const foundUser = DUMMY_USERS.find((u) => u.id === userId);
          setUser(foundUser || null);
        }
        setError(null);
      }, 200);
    } catch (err) {
      setError('Failed to load user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { user, loading, error };
}

export function useCurrentUser() {
  // This represents the logged-in user
  // In production, this would come from session/auth context
  return useUser('user-1');
}

export function useAllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(DUMMY_USERS);
      setLoading(false);
    }, 200);
  }, []);

  return { users, loading };
}
