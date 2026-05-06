"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Mail, 
  Lock, 
  Chrome, 
  Facebook, 
  ArrowRight,
  User,
  AtSign,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isSignUp ? "Account created successfully!" : "Welcome back!");
    navigate('/');
  };

  return (
    <div className="h-screen flex bg-white text-slate-900 overflow-hidden font-sans">
      {/* Left Side: Hero Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#f8fafc] items-center justify-center p-12">
        <div className="max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 50+ Global Partners
          </div>
          
          <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Bridge the gap between <span className="text-primary">Travel</span> and <span className="text-primary">Intelligence</span>.
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed">
            The ultimate AI-powered travel management system for modern explorers to optimize every journey.
          </p>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=1000" 
              alt="Travel Dashboard" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 bg-white">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">AI Travel</span>
          </div>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            key={isSignUp ? 'signup' : 'login'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-slate-500">
                {isSignUp ? 'Start your journey with AI-powered insights' : 'Sign in to manage your optimized trips'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          placeholder="John Doe" 
                          className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Username</label>
                      <div className="relative">
                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          placeholder="johndoe_travels" 
                          className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Username</label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="johndoe_travels" 
                      className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  {!isSignUp && <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot password?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 pl-11 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
                {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-bold gap-2">
                <Chrome className="w-5 h-5" /> Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-bold gap-2">
                <Facebook className="w-5 h-5" /> Facebook
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Global Network Active
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Engine v2.4.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;