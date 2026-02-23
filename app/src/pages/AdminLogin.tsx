import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAILS = [
    'empiredigitalsworldwide@gmail.com',
    'letstalk2mishael@gmail.com',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if email is authorized
      if (!ADMIN_EMAILS.includes(email)) {
        toast.error('You are not authorized to access the admin dashboard');
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success('Login successful');
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('User not found');
      } else {
        toast.error('Login failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/60">Manage your portfolio content</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 disabled:opacity-50 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 disabled:opacity-50 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Authorized Emails Info */}
        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 mb-2 font-semibold">Authorized Emails:</p>
          <ul className="text-xs text-white/60 space-y-1">
            {ADMIN_EMAILS.map((email) => (
              <li key={email}>• {email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
