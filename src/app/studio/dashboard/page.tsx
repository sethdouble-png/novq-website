'use client';

import { Suspense } from 'react';
import DashboardContent from './DashboardContent';

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}
