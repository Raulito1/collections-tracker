import React from 'react';
import { Navbar } from '../components/Navbar';
import { ArrowRight, Database, TrendingUp, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntegrationCard = ({ icon, name, color }: { icon: React.ReactNode, name: string, color: string }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors cursor-default">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-gray-300 font-medium text-sm">{name}</span>
    <div className="ml-auto text-white/20">{icon}</div>
  </div>
);

const FeatureBento = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-20 px-4">
    {/* Large Card */}
    <div className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <TrendingUp className="w-32 h-32" />
      </div>
      <h3 className="text-2xl font-display font-bold mb-4">Collections Logic</h3>
      <p className="text-gray-400 mb-8 max-w-md">
        Automated tracking based on payment behaviors. Seso analyzes QuickBooks history to prioritize follow-ups.
      </p>
      <div className="h-40 w-full bg-gradient-to-r from-seso-dark to-black rounded-xl border border-white/10 p-4 relative">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
        </div>
        <div className="flex items-center gap-4 mb-4">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-2 w-1/3 bg-white/10 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <div className="h-2 w-2/3 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>

    {/* Tall Card */}
    <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between group">
      <div>
        <div className="w-12 h-12 bg-seso-main/20 rounded-xl flex items-center justify-center text-seso-accent mb-6">
          <Database className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-display font-bold mb-2">Data Sources</h3>
        <p className="text-gray-400 text-sm">
          Unified view of invoices, project notes, and spreadsheets.
        </p>
      </div>
      <div className="mt-8 space-y-3">
         <IntegrationCard name="QuickBooks" color="bg-green-500" icon={<Zap className="w-4 h-4" />} />
         <IntegrationCard name="Notion" color="bg-white" icon={<LayoutGrid className="w-4 h-4" />} />
         <IntegrationCard name="G-Sheets" color="bg-blue-400" icon={<Database className="w-4 h-4" />} />
      </div>
    </div>

    {/* Small Card 1 */}
    <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-colors">
      <h3 className="text-4xl font-display font-bold text-white mb-2">Active</h3>
      <p className="text-gray-400 text-sm">System status is operational and syncing.</p>
    </div>

    {/* Small Card 2 */}
    <div className="md:col-span-2 glass-panel p-8 rounded-3xl flex items-center justify-between gap-8">
      <div>
        <h3 className="text-xl font-display font-bold mb-2">Secure Environment</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          Financial data is encrypted end-to-end and restricted to authorized personnel.
        </p>
      </div>
      <ShieldCheck className="w-16 h-16 text-seso-main opacity-50 flex-shrink-0" />
    </div>
  </div>
);

export const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white selection:bg-seso-main selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-seso-dark via-[#09090b] to-[#09090b] opacity-70 z-0" />
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-seso-main/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-seso-light mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seso-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-seso-accent"></span>
            </span>
            System Status: Operational
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
            Collection Tracker <br />
            <span className="gradient-text">Administration Portal</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Centralized financial tracking dashboard synchronizing QuickBooks, Google Sheets, and Notion for streamlined revenue recovery.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="px-8 py-4 bg-white text-seso-dark font-bold text-lg rounded-full hover:bg-seso-accent hover:text-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              Login to Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="overview" className="py-20 bg-[#09090b] relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-white/10 flex-1" />
             <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">System Capabilities</span>
             <div className="h-px bg-white/10 flex-1" />
          </div>
          <FeatureBento />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2024 Seso Collection Tracker. Authorized Access Only.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
            <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};