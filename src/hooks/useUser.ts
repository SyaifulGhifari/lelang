import { useState, useEffect } from 'react';
import { DUMMY_USERS } from '@/lib/constants/dummyData';
import type { User } from '@/types';

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useCurrentUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call - get first user as current user
    const timer = setTimeout(() => {
      try {
        setUser(DUMMY_USERS[0] || null);
        setError(null);
      } catch (err) {
        setError('Failed to load user');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { user, isLoading, error };
}

export function useUserById(userId: string): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const found = DUMMY_USERS.find((u) => u.id === userId);
        setUser(found || null);
        setError(null);
      } catch (err) {
        setError('Failed to load user');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [userId]);

  return { user, isLoading, error };
}

export function useAllUsers(): { users: User[]; isLoading: boolean; error: string | null } {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        setUsers(DUMMY_USERS);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { users, isLoading, error };
}
