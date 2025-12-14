'use client';
import React from 'react';

export default function NLInput({
  onSubmit,
}: {
  onSubmit?: (text: string) => void;
}) {
  return (
    <div>
      <label>Natural Language</label>
      <input placeholder="e.g. " />
      <button onClick={() => onSubmit?.('example')}>Analyze</button>
    </div>
  );
}
