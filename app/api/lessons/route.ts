import { NextResponse } from 'next/server';
import { getLessons } from '@/actions/lessons';

export async function GET() {
  const lessons = await getLessons();
  return NextResponse.json(lessons);
}
