'use client';

import { useState } from 'react';

const PAGE_SIZE = 10;

export default function TransactionsTable({ data }: { data: any[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Daily Transactions</h2>

      <table className="w-full text-sm gap-1 text-gray-300">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Description</th>
            <th>Date</th>
            <th>Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((r, index) => (
            <tr key={`${r.name}_${index}`} className="border-t border-white/5">
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg ${
                      r.type == 'Income' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {r.type == 'Income' ? '↘' : '↗'}
                  </span>

                  <span className="font-medium text-gray-200">
                    {r.merchant}
                  </span>
                </div>
              </td>
              <td>{r.date}</td>
              <td>{r.type}</td>
              <td
                className={`text-right font-bold ${
                  r.type == 'Income' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                ₹{r.amount}
              </td>
            </tr>
          ))}

          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 mt-4 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 cursor-pointer rounded-md bg-white/5 disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 cursor-pointer py-1 rounded-md bg-white/5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
