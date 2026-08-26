'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Zap, Target, Flame, CheckCircle2, Clock, Award } from 'lucide-react';
import { DashboardStatsResult } from '@/actions/statistics';
import { AchievementItem } from '@/actions/achievements';

interface DashboardViewProps {
  stats: DashboardStatsResult;
  achievements: AchievementItem[];
}

export function DashboardView({ stats, achievements }: DashboardViewProps) {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card/70 border border-border/70 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase">Best WPM</span>
            <Zap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-primary">{stats.bestWpm}</div>
          <span className="text-[11px] text-muted-foreground font-khmer">ល្បឿនខ្ពស់បំផុត</span>
        </div>

        <div className="bg-card/70 border border-border/70 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase">Best Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-500">{stats.bestAccuracy}%</div>
          <span className="text-[11px] text-muted-foreground font-khmer">ភាពត្រឹមត្រូវខ្ពស់បំផុត</span>
        </div>

        <div className="bg-card/70 border border-border/70 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase">Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-500">{stats.streakDays} Days</div>
          <span className="text-[11px] text-muted-foreground font-khmer">ថ្ងៃហ្វឹកហាត់ជាប់គ្នា</span>
        </div>

        <div className="bg-card/70 border border-border/70 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase">Tests Done</span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-extrabold text-purple-500">{stats.totalTests}</div>
          <span className="text-[11px] text-muted-foreground font-khmer">ចំនួនវិញ្ញាសាបានបញ្ចូន</span>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-card/70 border border-border/70 p-6 rounded-3xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold font-khmer flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>ការរីកចម្រើនល្បឿន WPM តាមពេល (Speed Progress)</span>
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.history}>
              <defs>
                <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="test" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="wpm"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorWpm)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-khmer flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <span>ស្នាដៃ និង មេដាយ (Achievement Badges)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-center space-x-4 transition-all ${
                ach.unlocked
                  ? 'bg-card/80 border-amber-500/30 shadow-sm'
                  : 'bg-muted/30 border-border/40 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                {ach.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm font-khmer">{ach.nameKm}</h3>
                <p className="text-xs text-muted-foreground">{ach.description}</p>
                {ach.unlocked && (
                  <span className="inline-block text-[10px] font-semibold text-emerald-500">
                    ✓ Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
