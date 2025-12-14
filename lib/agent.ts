import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function parseTransaction(text: string) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      {
        role: 'system',
        content: 'Extract transaction. Do not guess missing fields.',
      },
      { role: 'user', content: text },
    ],
    functions: [
      {
        name: 'transaction',
        parameters: {
          type: 'object',
          properties: {
            amount: { type: 'number' },
            category: { type: 'string' },
            date: { type: 'string' },
            paymentMode: { type: 'string' },
            merchant: { type: 'string' },
          },
          required: ['amount'],
        },
      },
    ],
    function_call: { name: 'transaction' },
  });

  return JSON.parse(res.choices[0].message.function_call!.arguments!);
}
