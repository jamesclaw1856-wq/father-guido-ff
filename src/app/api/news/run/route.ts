import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';

// Sample news data structure - in production, this would call Claude API or a news API
// For now, it writes any pending news from the Claude scheduled task
export async function POST() {
  try {
    const db = getDb();

    // Check if there are already news items for today
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.collection('news')
      .where('date', '==', today)
      .get();

    if (!existing.empty) {
      return NextResponse.json({
        success: true,
        count: existing.size,
        message: `Already have ${existing.size} news items for today. News is refreshed daily by the automated scheduler, or you can trigger it via Claude Code.`
      });
    }

    // If no news for today, return instruction
    return NextResponse.json({
      success: true,
      count: 0,
      message: 'No new news available. The daily news scheduler runs at 7 AM, or ask Claude directly: "run today\'s news update and push to the app"'
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
