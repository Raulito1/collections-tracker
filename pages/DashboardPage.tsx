import React, { useMemo, useState, useEffect, useRef } from 'react';
import { SesoLogo } from '../components/SesoLogo';
import { Chatbot } from '../components/Chatbot';
import Highcharts from 'highcharts';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Bell, Search, Filter, Download, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

// Highcharts dark theme configuration
const highchartsTheme = {
  chart: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    style: { fontFamily: 'Inter, sans-serif' },
    borderRadius: 12,
  },
  title: {
    style: { color: '#e4e4e7', fontSize: '16px', fontWeight: 'bold' },
    align: 'left'
  },
  xAxis: {
    gridLineColor: '#333',
    labels: { style: { color: '#a1a1aa' } },
    lineColor: '#333',
    minorGridLineColor: '#333',
    tickColor: '#333',
    title: { style: { color: '#a1a1aa' } }
  },
  yAxis: {
    gridLineColor: '#333',
    labels: { style: { color: '#a1a1aa' } },
    lineColor: '#333',
    minorGridLineColor: '#333',
    tickColor: '#333',
    title: { style: { color: '#a1a1aa' } }
  },
  legend: {
    itemStyle: { color: '#e4e4e7' },
    itemHoverStyle: { color: '#fff' },
    itemHiddenStyle: { color: '#52525b' }
  },
  credits: { enabled: false },
  tooltip: {
    backgroundColor: '#18181b',
    style: { color: '#fff' },
    borderColor: '#3f3f46'
  }
};

// Apply theme once
if (typeof Highcharts === 'object') {
  Highcharts.setOptions(highchartsTheme);
}

// Custom Chart Component to replace HighchartsReact wrapper
const Chart = ({ options }: { options: Highcharts.Options }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      // Create new chart
      chartRef.current = Highcharts.chart(chartContainerRef.current, options);
    }

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [options]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
};

// Mock Data for Grid
const generateClientData = () => {
  const clients = [
    'Acme Corp', 'Globex Inc', 'Soylent Corp', 'Initech', 'Umbrella Corp', 
    'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Massive Dynamic', 'Hooli'
  ];
  
  return clients.map((client, i) => ({
    id: i,
    clientName: client,
    totalDue: Math.floor(Math.random() * 50000) + 1000,
    daysOverdue: Math.floor(Math.random() * 90),
    status: Math.random() > 0.7 ? 'Critical' : Math.random() > 0.4 ? 'At Risk' : 'On Track',
    lastContact: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
    riskScore: Math.floor(Math.random() * 100),
    probability: Math.floor(Math.random() * 100) + '%'
  }));
};

export const DashboardPage = () => {
  // Use lazy initialization for data to prevent regeneration on every render
  const [rowData] = useState(() => generateClientData());

  // Memoize Column Definitions
  const colDefs = useMemo<ColDef[]>(() => [
    { field: 'clientName', headerName: 'Client', flex: 1, sortable: true, filter: true },
    { 
      field: 'totalDue', 
      headerName: 'Amount Due', 
      sortable: true, 
      flex: 1,
      valueFormatter: (params: any) => `$${params.value.toLocaleString()}`
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      sortable: true, 
      flex: 1,
      cellRenderer: (params: any) => {
        const color = params.value === 'Critical' ? 'text-red-400' : params.value === 'At Risk' ? 'text-yellow-400' : 'text-green-400';
        return <span className={`font-medium ${color} flex items-center gap-2`}><span className={`w-2 h-2 rounded-full ${params.value === 'Critical' ? 'bg-red-500' : params.value === 'At Risk' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>{params.value}</span>;
      }
    },
    { field: 'daysOverdue', headerName: 'Days Overdue', sortable: true, flex: 1 },
    { field: 'lastContact', headerName: 'Last Contact', sortable: true, flex: 1 },
    { 
      field: 'riskScore', 
      headerName: 'Risk Score', 
      sortable: true, 
      flex: 1,
      cellRenderer: (params: any) => (
        <div className="w-full h-full flex items-center">
          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${params.value > 80 ? 'bg-red-500' : params.value > 50 ? 'bg-yellow-500' : 'bg-seso-main'}`} 
              style={{ width: `${params.value}%` }}
            />
          </div>
        </div>
      )
    },
  ], []);

  // Memoize Chart Configs
  const chart1Options: Highcharts.Options = useMemo(() => ({
    chart: { type: 'column', height: 300 },
    title: { text: 'Collections Velocity' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    series: [
      { name: 'Collected', type: 'column', data: [45000, 52000, 48000, 61000, 58000, 65000], color: '#10b981' },
      { name: 'Outstanding', type: 'column', data: [12000, 15000, 8000, 11000, 9000, 5000], color: '#3f3f46' }
    ]
  }), []);

  const chart2Options: Highcharts.Options = useMemo(() => ({
    chart: { type: 'pie', height: 300 },
    title: { text: 'Portfolio Health' },
    plotOptions: { pie: { innerSize: '60%', borderWidth: 0 } },
    series: [{
      name: 'Clients',
      type: 'pie',
      data: [
        { name: 'On Track', y: 65, color: '#10b981' },
        { name: 'At Risk', y: 25, color: '#fbbf24' },
        { name: 'Critical', y: 10, color: '#ef4444' }
      ]
    }]
  }), []);

  const chart3Options: Highcharts.Options = useMemo(() => ({
    chart: { type: 'areaspline', height: 300 },
    title: { text: 'Cash Flow Forecast' },
    xAxis: { categories: ['W1', 'W2', 'W3', 'W4'] },
    series: [{
      name: 'Projected',
      type: 'areaspline',
      data: [12000, 18000, 15000, 22000],
      color: '#34d399',
      fillOpacity: 0.2
    }]
  }), []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white font-sans selection:bg-seso-main selection:text-white">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-[#09090b] sticky top-0 z-30">
        <div className="h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <SesoLogo className="w-8 h-8" />
            <span className="font-display font-bold text-xl">Seso<span className="text-seso-accent">.</span></span>
            <span className="ml-4 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">v2.4.0-beta</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-seso-accent w-64 transition-all"
              />
            </div>
            <button className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-seso-accent rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-seso-main to-seso-accent flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <Link to="/login" className="text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Bucket Navigation */}
        <div className="border-t border-white/5 px-6 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-2">Aging Buckets:</span>
            <Link
              to="/bucket/0-30"
              className="px-4 py-1.5 text-sm bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/50 rounded-lg transition-all whitespace-nowrap"
            >
              0-30 Days
            </Link>
            <Link
              to="/bucket/30-60"
              className="px-4 py-1.5 text-sm bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/50 rounded-lg transition-all whitespace-nowrap"
            >
              30-60 Days
            </Link>
            <Link
              to="/bucket/60-90"
              className="px-4 py-1.5 text-sm bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 rounded-lg transition-all whitespace-nowrap"
            >
              60-90 Days
            </Link>
            <Link
              to="/bucket/over-90"
              className="px-4 py-1.5 text-sm bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-lg transition-all whitespace-nowrap"
            >
              Over 90 Days
            </Link>
          </div>
        </div>
      </header>

      <main className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Financial Overview</h1>
            <p className="text-gray-400 text-sm">Track collections, monitor risks, and forecast revenue.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-4 py-2 bg-seso-main hover:bg-seso-accent rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-seso-main/20">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/5 rounded-2xl overflow-hidden shadow-xl bg-[#18181b] p-4 h-[340px]">
            <Chart options={chart1Options} />
          </div>
          <div className="border border-white/5 rounded-2xl overflow-hidden shadow-xl bg-[#18181b] p-4 h-[340px]">
            <Chart options={chart2Options} />
          </div>
          <div className="border border-white/5 rounded-2xl overflow-hidden shadow-xl bg-[#18181b] p-4 h-[340px]">
            <Chart options={chart3Options} />
          </div>
        </div>

        {/* Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-seso-accent" /> Client Roster
            </h2>
            <span className="text-sm text-gray-500">{rowData.length} Active Accounts</span>
          </div>
          
          <div className="h-[600px] w-full ag-theme-alpine-dark shadow-2xl rounded-xl overflow-hidden border border-white/10">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              animateRows={true}
              pagination={true}
              paginationPageSize={15}
            />
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};