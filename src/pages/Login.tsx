"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Train, 
  Bus, 
  Mail, 
  Lock, 
  Chrome, 
  Facebook, 
  ArrowRight,
  Sparkles,
  Globe,
  User,
  Zap,
  AtSign,
  ShieldCheck,
  Loader2
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

        {[
          { Icon: Plane, color: 'text-blue-500', label: 'Air' },
          { Icon: Train, color: 'text-indigo-500', label: 'Rail' },
          { Icon: Bus, color: 'text-emerald-500', label: 'Road' }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              rotate: i * 120,
              transformOrigin: 'center center',
              width: '100%',
              height: '100%'
            }}
          >
            <motion.div 
              animate={{ rotate: -i * 120 - 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl border border-slate-100 shadow-xl flex flex-col items-center gap-1 group hover:border-primary/50 transition-colors"
            >
              <item.Icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
            </motion.div>
          </motion.div>
        ))}
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
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        });

        if (error) throw error;
        showSuccess("Account created! Please check your email for verification.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_name', data.user?.user_metadata?.full_name || data.user?.email?.split('@')[0] || 'Traveler');
        localStorage.setItem('user_email', data.user?.email || '');
        
        showSuccess("Welcome back to Destina!");
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
              "Destina: Where every journey becomes a <span className="text-primary">story</span>."
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Join thousands of travelers who trust our AI to find the perfect path.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Des<span className="text-primary">tina</span></span>
          </div>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
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
                {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
              </h1>
              <p className="text-slate-500 font-medium">
                {isSignUp ? 'Create an account to unlock personalized travel routes.' : 'Sign in to access your saved trips and preferences.'}
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
                          required
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
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  {!isSignUp && <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>}
                </div>
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

              <Button 
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')} 
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;