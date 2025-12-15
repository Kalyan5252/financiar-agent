'use client';

import { useEffect, useState } from 'react';
import AIBackgroundCard from '../ai/AiBackgroundCard';
import Background from '../ai/Background';
import AnimatedSphere from '../ai/AnimatedSphere';
import { useTypewriter } from '@/app/hooks/useTypewriter';

export default function AISummary() {
  // const [insights, setInsights] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([
    // 'Total income is relatively stable, indicating consistent earning potential. ',
    // 'Net savings are positive but minimal, suggesting limited financial flexibility. ',
    // 'Average daily expenses are high, indicating potential overspending on non-essential items. ',
    // 'The highest single expense significantly impacts overall financial health and should be monitored. ',
    // 'Thirteen small expenses suggest frequent minor spending, which can accumulate over time. ',
    // 'Income days indicate a need for better cash flow management throughout the month. ',
    // 'Expense spikes can destabilize monthly budgeting and require closer scrutiny. ',
    // 'Maintaining savings above zero is positive but needs improvement for future security. ',
    // 'Identifying patterns in spending could help reduce unnecessary expenses and increase savings. ',
    // 'Overall financial health shows a tight budget, indicating potential risks during unexpected expenses.',
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<'hello...' | 'insight'>('hello...');
  const [currentIndex, setCurrentIndex] = useState(0);

  const typedText = useTypewriter(
    phase === 'hello...' ? 'HELLO...' : insights[currentIndex] ?? '',
    40,
    true
  );

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/ai_analysis');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load AI summary');
        }

        setInsights(data.insights || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    console.log('AI Insights:', insights);
  }, [insights]);

  useEffect(() => {
    const t = setTimeout(() => {
      setExpanded(true);
      setPhase('insight');
    }, 6000);

    return () => clearTimeout(t);
  }, []);

  // 🔁 Rotate insights every 7s
  useEffect(() => {
    if (!expanded || insights.length === 0) {
      setPhase('hello...');
      return;
    }
    setPhase('insight');

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % insights.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [expanded, insights]);

  return (
    <Background expanded={expanded} setExpanded={setExpanded}>
      <div className="z-10 px-10">
        <h1
          className={`font-bold ${
            expanded ? 'text-xl' : 'text-2xl'
          } text-[#E7E7E7] glow-text transition-all duration-500`}
        >
          {typedText}
        </h1>
      </div>
    </Background>
  );
}
