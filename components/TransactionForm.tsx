'use client';
import React from 'react';

export default function TransactionForm() {
  return (
    <form>
      <label>Amount</label>
      <input name="amount" />
      <button type="submit">Save</button>
    </form>
  );
}
