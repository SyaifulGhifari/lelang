'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerSchema, type RegisterFormData } from './validators';

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      registerSchema.parse(formData);
      setLoading(true);
      // TODO: Add API call
      console.log('Register data:', formData);
      setLoading(false);
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow">
      <h1 className="mb-2 text-2xl font-bold">Create Account</h1>
      <p className="mb-6 text-sm text-gray-600">Join our auction platform</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="+62812345678"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </label>
        {errors.agreeTerms && <p className="text-xs text-red-600">{errors.agreeTerms}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
