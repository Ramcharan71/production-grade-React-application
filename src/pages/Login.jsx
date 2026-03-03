import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import { Check, Star, Apple } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    login(formData);
    navigate('/dashboard');
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Theme toggle (floating) */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Left Panel - Hero */}
      <div className="login-gradient flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0 min-h-[280px] lg:min-h-screen">
        <div className="max-w-md">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight">
            Expert level Cybersecurity{' '}
            <br />
            in <em className="text-teal-accent italic">hours</em> not weeks.
          </h1>

          <div className="mt-10">
            <h2 className="text-sm font-semibold text-white mb-4">What&apos;s included</h2>
            <ul className="space-y-3">
              {[
                'Effortlessly spider and map targets to uncover hidden security flaws',
                'Deliver high-quality, validated findings in hours, not weeks.',
                'Generate professional, enterprise-grade security reports automatically.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-teal-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-sm text-gray-400">Trustpilot</span>
            </div>
            <p className="text-white">
              <span className="font-bold">Rated 4.5/5.0</span>{' '}
              <span className="text-gray-400 text-sm">(100k+ reviews)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-surface-dark px-4 sm:px-8 py-12 lg:py-0">
        <div className="w-full max-w-[440px] bg-white dark:bg-surface-dark-card rounded-2xl shadow-xl dark:shadow-none dark:border dark:border-surface-dark-border p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-1">
            Sign up
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Already have an account?{' '}
            <button className="text-teal-accent hover:text-teal-accent/80 font-medium">
              Log in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="First name*"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              required
              aria-label="First name"
            />
            <Input
              placeholder="Last name*"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              required
              aria-label="Last name"
            />
            <Input
              type="email"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange('email')}
              required
              aria-label="Email address"
            />
            <Input
              type="password"
              placeholder="Password (8+ characters)*"
              value={formData.password}
              onChange={handleChange('password')}
              required
              minLength={8}
              aria-label="Password"
            />

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange('agreeTerms')}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-teal-accent focus:ring-teal-accent cursor-pointer accent-teal-accent"
                required
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                I agree to Aps&apos;s{' '}
                <a href="#" className="text-teal-accent underline hover:text-teal-accent/80">
                  Terms &amp; Conditions
                </a>{' '}
                and acknowledge the{' '}
                <a href="#" className="text-teal-accent underline hover:text-teal-accent/80">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              pill
              disabled={loading}
              className="w-full mt-6"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Social login */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 flex items-center justify-center py-3 rounded-full bg-black text-white hover:bg-gray-900 transition-colors">
              <Apple className="w-5 h-5" />
            </button>
            <button className="flex-1 flex items-center justify-center py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors dark:bg-surface-dark-card dark:border-gray-600 dark:hover:bg-surface-dark-hover">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button className="flex-1 flex items-center justify-center py-3 rounded-full bg-[#4F6BF6] text-white hover:bg-[#3D59E0] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                <path d="M8.5 16c0-3.5 2.1-6.5 4.5-6.5 1.4 0 2.5.8 3.5 2.3l.5.8.5-.8c1-1.5 2.1-2.3 3.5-2.3 2.4 0 4.5 3 4.5 6.5s-2.1 6.5-4.5 6.5c-1.4 0-2.5-.8-3.5-2.3l-.5-.8-.5.8c-1 1.5-2.1 2.3-3.5 2.3-2.4 0-4.5-3-4.5-6.5zm4.5-4c-1.3 0-2 2-2 4s.7 4 2 4c.8 0 1.5-.7 2.2-1.8L16 17l.8 1.2c.7 1.1 1.4 1.8 2.2 1.8 1.3 0 2-2 2-4s-.7-4-2-4c-.8 0-1.5.7-2.2 1.8L16 15l-.8-1.2C14.5 12.7 13.8 12 13 12z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
