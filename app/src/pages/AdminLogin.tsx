import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { toast } from 'sonner';
import { Loader2, Chrome } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const ADMIN_EMAILS = [
    'empiredigitalsworldwide@gmail.com',
    'letstalk2mishael@gmail.com',
  ];

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        navigate('/admin/dashboard');
      }
      setIsInitializing(false);
    };

    // Give Firebase a moment to initialize
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email || '';

      // Check if email is authorized
      if (!ADMIN_EMAILS.includes(userEmail)) {
        // Sign out if not authorized
        await auth.signOut();
        toast.error('Your email is not authorized to access the admin dashboard');
        setLoading(false);
        return;
      }

      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Sign-in popup was blocked. Please allow popups for this site.');
      } else {
        toast.error('Sign-in failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-white mb-4 mx-auto" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/60">Secure access for authorized admins</p>
        </div>

        {/* Sign In Card */}
        <div className="space-y-6">
          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-6 bg-white text-black rounded-lg font-semibold hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <Chrome size={20} />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white/50">Secure Authentication</span>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-3 font-semibold">Authorized Email Addresses:</p>
              <ul className="text-sm text-white/70 space-y-2">
                {ADMIN_EMAILS.map((email) => (
                  <li key={email} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                    {email}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/60">
                Only Google accounts with verified email addresses matching the authorized list above can access this portal. Your password remains secure with Google authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
