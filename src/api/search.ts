// src/api/search.ts
import { Search } from '@upstash/search';
import { NextRequest, NextResponse } from 'next/server';

const client = Search.fromEnv();
const index = client.index("YOUR_INDEX_NAME"); // Replace with your index name

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const query = body.query || "";

  const result = await index.search({ query });

  return NextResponse.json({ result });
};

