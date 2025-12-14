export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parsePhonePePDF } from '@/lib/pdf-parser/phonepe';

export async function GET() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      'public',
      'statements',
      'phonepe.pdf'
    );

    const buffer = fs.readFileSync(pdfPath);

    const transactions = await parsePhonePePDF(buffer);

    return NextResponse.json({
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse statement' },
      { status: 500 }
    );
  }
}
