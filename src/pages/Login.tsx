"use client";

import React from 'react';
import { motion } from 'framer-motion';
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
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FloatingIcon = ({ children, delay, className }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#0a0b14] text-white overflow-hidden">
      {/* Left Side: Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-[#0a0b14] to-purple-900 items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <motion.path
              d="M100 200 Q 400 100 700 200"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path
              d="M100 400 Q 400 400 700 400"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.path
              d="M100 600 Q 400 700 700 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Transport Icons */}
        <div className="relative z-10 w-full max-w-lg space-y-24">
          <FloatingIcon delay={0} className="flex justify-end pr-12">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
              <Plane className="w-12 h-12 text-blue-400" />
              <div className="mt-4 space-y-1">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Air Route</p>
                <p className="text-sm font-medium">Optimizing Flight Paths</p>
              </div>
            </div>
          </FloatingIcon>

          <FloatingIcon delay={1} className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
              <Train className="w-12 h-12 text-purple-400" />
              <div className="mt-4 space-y-1">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Rail Network</p>
                <p className="text-sm font-medium">Real-time Delay Prediction</p>
              </div>
            </div>
          </FloatingIcon>

          <FloatingIcon delay={2} className="flex justify-start pl-12">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
              <Bus className="w-12 h-12 text-emerald-400" />
              <div className="mt-4 space-y-1">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Urban Transit</p>
                <p className="text-sm font-medium">Smart Multi-modal Routing</p>
              </div>
            </div>
          </FloatingIcon>
        </div>

        {/* AI Core Visual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
            <Plane className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            AI <span className="text-primary">Travel</span>
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
              <p className="text-slate-400">AI Smart Travel Assistant</p>
            </div>

            <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                    <button type="button" className="text-[10px] font-bold text-primary uppercase hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20 focus:border-primary/50 transition-all text-white"
                    />
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 font-bold text-lg gap-2">
                  Sign In <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#121421] px-4 text-slate-500 font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2">
                  <Chrome className="w-5 h-5" /> Google
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2">
                  <Facebook className="w-5 h-5" /> Facebook
                </Button>
              </div>
            </Card>

            <p className="text-center text-sm text-slate-500">
              Don't have an account? <button className="text-primary font-bold hover:underline">Create one</button>
            </p>
          </motion.div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-8 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3" /> Global Network Active
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> AI Engine v2.4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;