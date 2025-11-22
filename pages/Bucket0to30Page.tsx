import React from 'react';
import { SesoLogo } from '../components/SesoLogo';
import { Chatbot } from '../components/Chatbot';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

export const Bucket0to30Page = () => {
  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white">
      <header className="h-16 border-b border-white/10 bg-[#09090b] flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <SesoLogo className="w-8 h-8" />
          <span className="font-display font-bold text-xl">Seso<span className="text-seso-accent">.</span></span>
        </div>
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="p-6 md:p-8 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-seso-accent" />
            <h1 className="text-3xl font-display font-bold">0-30 Days</h1>
          </div>
          <p className="text-gray-400">Invoices aged 0 to 30 days past due</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">0-30 Days Bucket</h2>
            <p className="text-gray-400">Content for this aging bucket will be displayed here</p>
          </div>
        </div>
      </main>

      {/* Chatbot with bucket context */}
      <Chatbot bucketContext="0-30" />
    </div>
  );
};

