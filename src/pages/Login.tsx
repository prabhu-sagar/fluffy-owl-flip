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
  ShieldCheck
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
          scale: [1, 1.05, 1],
          rotate: 360 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-72 h-72 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="w-40 h-40 rounded-full border border-primary/20 flex items-center justify-center bg-[#0a0b14]/50 backdrop-blur-3xl shadow-[0_0_50px_rgba(99,102,241,0.1)]">
          <Zap className="w-14 h-14 text-primary animate-pulse" />
        </div>

        {/* Orbiting Modes */}
        {[
          { Icon: Plane, color: 'text-blue-400', label: 'Air' },
          { Icon: Train, color: 'text-purple-400', label: 'Rail' },
          { Icon: Bus, color: 'text-emerald-400', label: 'Road' }
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
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center gap-1 group hover:border-primary/50 transition-colors"
            >
              <item.Icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-40">{item.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <motion.circle 
          cx="50%" cy="50%" r="140" 
          fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="10 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
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
    <div className="h-screen flex bg-[#0a0b14] text-white overflow-hidden font-sans selection:bg-primary/30">
      {/* Left Side: Unified AI Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-950/30 via-[#0a0b14] to-purple-950/30 items-center justify-center border-r border-white/5">
        <NeuralHub />
        <div className="absolute bottom-16 left-12 right-12 text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Unified Intelligence</h2>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed font-medium">
            The world's first multi-modal engine powering seamless air, rail, and road travel optimization.
          </p>
        </div>
      </div>

      {/* Right Side: Compact Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 overflow-hidden">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="bg-primary p-2 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Plane className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">AI <span className="text-primary">Travel</span></span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            key={isSignUp ? 'signup' : 'login'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-6"
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter">
                {isSignUp ? 'Join the Network' : 'Welcome Back'}
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                {isSignUp ? 'Create your intelligent travel profile' : 'Access your AI-powered travel dashboard'}
              </p>
            </div>

            <Card className="p-6 bg-white/[0.02] border-white/10 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <AnimatePresence mode="wait">
                  {isSignUp && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <Input 
                            placeholder="John Doe" 
                            className="bg-white/[0.03] border-white/10 h-11 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm placeholder:text-slate-700"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Username</label>
                        <div className="relative">
                          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <Input 
                            placeholder="johndoe_travels" 
                            className="bg-white/[0.03] border-white/10 h-11 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm placeholder:text-slate-700"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="bg-white/[0.03] border-white/10 h-11 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Password</label>
                      {!isSignUp && <button type="button" className="text-[8px] font-black text-primary uppercase tracking-wider hover:underline">Forgot?</button>}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white/[0.03] border-white/10 h-11 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm placeholder:text-slate-700"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSignUp && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                      >
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="bg-white/[0.03] border-white/10 h-11 pl-11 rounded-xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white text-sm placeholder:text-slate-700"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-primary/20 font-bold text-sm gap-2 mt-2">
                  {isSignUp ? 'Initialize Account' : 'Secure Sign In'} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.3em]">
                  <span className="bg-[#0a0b14] px-3 text-slate-600 font-black">Or Connect Via</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10 rounded-xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white text-[10px] font-bold gap-2">
                  <Chrome className="w-3.5 h-3.5" /> Google
                </Button>
                <Button variant="outline" className="h-10 rounded-xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white text-[10px] font-bold gap-2">
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </Button>
              </div>
            </Card>

            <p className="text-center text-xs text-slate-500 font-medium">
              {isSignUp ? 'Already part of the network?' : "New to the system?"}{' '}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </motion.div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between text-[8px] font-black text-slate-700 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3" /> Global Node: Active
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> Engine v2.4.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;