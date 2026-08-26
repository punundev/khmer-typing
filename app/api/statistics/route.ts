import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/actions/statistics';

export async function GET() {
  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
