"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Mail, 
  Lock, 
  ArrowRight,
  User,
  Zap,
  ShieldCheck,
  Loader2,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/lib/supabase';

const NeuralHub = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: 360 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-72 h-72 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="w-40 h-40 rounded-full border border-primary/10 flex items-center justify-center bg-white shadow-[0_0_50px_rgba(99,102,241,0.1)]">
          <Zap className="w-14 h-14 text-primary animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    pin: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.pin.length !== 4) {
      showError("PIN must be exactly 4 digits");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign Up: Create user and store PIN in metadata
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              security_pin: formData.pin
            }
          }
        });

        if (error) throw error;
        showSuccess("Account created! You can now log in with your credentials.");
        setIsSignUp(false);
      } else {
        // Login: Verify password first
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Verify PIN from metadata
        const userPin = data.user?.user_metadata?.security_pin;
        if (userPin !== formData.pin) {
          await supabase.auth.signOut();
          throw new Error("Invalid Security PIN");
        }

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_name', data.user?.user_metadata?.full_name || data.user?.email?.split('@')[0] || 'Traveler');
        localStorage.setItem('user_email', data.user?.email || '');
        
        showSuccess("Access granted. Welcome to Destina!");
        navigate('/');
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err: any) {
      showError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-slate-900 overflow-x-hidden font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#f8fafc] flex-col items-center justify-center border-r border-slate-100 p-12">
        <div className="flex-1 w-full flex items-center justify-center">
          <NeuralHub />
        </div>
        <div className="w-full max-w-md text-center space-y-6 pb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-tight">
              "The world is a book, and those who do not travel read only a <span className="text-primary">page</span>."
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Secure your journeys with Destina's multi-factor neural protection.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Des<span className="text-primary">tina</span></span>
          </div>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            {isSignUp ? 'Already have an account? Log in' : 'New to Destina? Sign up'}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <motion.div 
            key={isSignUp ? 'signup' : 'login'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                {isSignUp ? 'Join the Journey' : 'Secure Login'}
              </h1>
              <p className="text-slate-500 font-medium">
                {isSignUp ? 'Create your Destina account to start exploring.' : 'Enter your credentials and 4-digit PIN to continue.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          placeholder="John Doe" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                          required={isSignUp}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">4-Digit Security PIN</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="password" 
                    maxLength={4}
                    placeholder="0000" 
                    value={formData.pin}
                    onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})}
                    className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all tracking-[0.5em]"
                    required
                  />
                </div>
              </div>

              <Button 
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')} 
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </Button>
            </form>

            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Authentication</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;