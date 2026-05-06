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
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const NeuralHub = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Core */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: 360 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-64 h-64 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center">
          <Zap className="w-12 h-12 text-primary animate-pulse" />
        </div>

        {/* Orbiting Modes */}
        {[
          { Icon: Plane, color: 'text-blue-400', delay: 0, label: 'Air' },
          { Icon: Train, color: 'text-purple-400', delay: 2, label: 'Rail' },
          { Icon: Bus, color: 'text-emerald-400', delay: 4, label: 'Road' }
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
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center gap-1"
            >
              <item.Icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">{item.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <motion.circle 
          cx="50%" cy="50%" r="120" 
          fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isSignUp ? "Account created successfully!" : "Welcome back!");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#0a0b14] text-white overflow-hidden">
      {/* Left Side: Unified AI Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900/20 via-[#0a0b14] to-purple-900/20 items-center justify-center">
        <NeuralHub />
        <div className="absolute bottom-12 left-12 right-12 text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Unified Intelligence</h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">One engine powering air, rail, and road travel optimization.</p>
        </div>
      </div>

      {/* Right Side: Compact Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Plane className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">AI Travel</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            key={isSignUp ? 'signup' : 'login'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm space-y-6"
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-slate-400 text-sm">
                {isSignUp ? 'Join the future of smart travel' : 'AI Smart Travel Assistant'}
              </p>
            </div>

            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input 
                        placeholder="John Doe" 
                        className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                    {!isSignUp && <button type="button" className="text-[9px] font-bold text-primary uppercase hover:underline">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm"
                    />
                  </div>
                </div>

                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 font-bold text-sm gap-2 mt-2">
                  {isSignUp ? 'Get Started' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[9px] uppercase">
                  <span className="bg-[#121421] px-3 text-slate-500 font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs gap-2">
                  <Chrome className="w-4 h-4" /> Google
                </Button>
                <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs gap-2">
                  <Facebook className="w-4 h-4" /> Facebook
                </Button>
              </div>
            </Card>

            <p className="text-center text-xs text-slate-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-bold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Create one'}
              </button>
            </p>
          </motion.div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" /> Global Network
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> AI Engine v2.4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;