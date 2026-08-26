import { getDashboardStats } from '@/actions/statistics';
import { getAchievements } from '@/actions/achievements';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { Trophy } from 'lucide-react';

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const achievements = await getAchievements();

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-khmer flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" />
          <span>ផ្ទាំងស្ថិតិ និង ស្នាដៃ (Dashboard)</span>
        </h1>
        <p className="text-muted-foreground text-sm font-khmer">
          តាមដានការរីកចម្រើន ពិនិត្យល្បឿន និងស្នាដៃមេដាយដែលអ្នកទទួលបាន!
        </p>
      </div>

      <DashboardView stats={stats} achievements={achievements} />
    </div>
  );
}
