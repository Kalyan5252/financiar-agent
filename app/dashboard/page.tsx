'use client';

import { useEffect, useState, useRef } from 'react';
import RevenueChart from '@/components/dashboard/RevenueChart';
import DailyExpensesChart from '@/components/dashboard/DailyExpensesChart';
import SummaryPie from '@/components/dashboard/SummaryPie';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import { useSession } from 'next-auth/react';
import { useScrollGradient } from '@/app/hooks/useScrollGradient';
import LogoutButton from '@/components/dashboard/Logout';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userData } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrolled = useScrollGradient(scrollRef, Boolean(data));

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    console.log('Dashboard data:', data);
  }, [data]);

  if (!data) {
    return <div className="text-white p-8">Loading dashboard...</div>;
  }

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      // 1️⃣ Send PDF to parser service
      const formData = new FormData();
      formData.append('file', file);
      // const parserURL = process.env.NEXT_PUBLIC_PDF_PARSER_URL;

      const parseRes = await fetch(
        'https://pdf-parser-fkmv.onrender.com/parse',
        {
          method: 'POST',
          body: formData,
        }
      );

      const parseData = await parseRes.json();

      console.info('Parsed PDF data:', parseData);

      if (!parseData.text) {
        throw new Error('Failed to extract PDF text');
      }

      await fetch('/api/statements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: parseData.text,
        }),
      });

      alert('Statement uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to upload statement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-scroll lg:overflow-clip bg-[#0b0b0b] text-white p-8">
      <div
        className={`mb-6 flex items-center justify-between end-gradient ${
          scrolled ? 'scrolled' : ''
        } overflow-visible`}
      >
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-400">
            Hi {userData?.user.name}, here are your financial stats
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? 'Uploading…' : 'Upload Statement'}
          </button>

          <LogoutButton />
        </div>
      </div>

      <div ref={scrollRef} className="h-[80vh] overflow-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#161616] rounded-2xl p-6">
            <RevenueChart data={data.revenue} />
          </div>

          <div className="bg-[#161616] rounded-2xl p-6">
            <DailyExpensesChart data={data.dailyExpenses} />
          </div>

          <div className="z-10 rounded-2xl h-full w-full flex justify-center">
            <SummaryPie />
          </div>
        </div>

        <div className="bg-[#161616] rounded-2xl p-6">
          <TransactionsTable data={data.transactions} />
        </div>
      </div>
    </div>
  );
}
