"use client";

import { ReportSummary } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Clock,
  Code2,
  ImageIcon,
  LayoutList,
  Zap
} from "lucide-react";

interface ReportStatsProps {
  reports: ReportSummary[];
}

export function ReportStats({ reports }: ReportStatsProps) {
  // Completed analyses count
  const completedCount = reports.filter(report => report.status === 'completed').length;

  // Total runtime of all analyses in minutes
  const totalRuntimeMinutes = Math.floor(
    reports.reduce((acc, report) => acc + report.runtime, 0) / 60
  );

  // Total differences found
  const totalDifferences = reports.reduce(
    (acc, report) => acc + report.totalDifferences,
    0
  );

  // Calculate average differences per report
  const avgDifferencesPerReport = reports.length > 0
    ? Math.round(totalDifferences / reports.length)
    : 0;

  // Count categories of differences
  const visualDifferences = reports.reduce(
    (acc, report) => acc + report.visualDifferences,
    0
  );

  const contentDifferences = reports.reduce(
    (acc, report) => acc + report.contentDifferences,
    0
  );

  const performanceDifferences = reports.reduce(
    (acc, report) => acc + report.performanceDifferences,
    0
  );

  const domDifferences = reports.reduce(
    (acc, report) => acc + report.domDifferences,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
            <Activity className="w-4 h-4 text-violet-400" />
            <span>Toplam Karşılaştırma</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{reports.length}</div>
          <p className="text-xs text-white/60 mt-1">
            {completedCount} tamamlandı
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Toplam Analiz Süresi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalRuntimeMinutes} dakika</div>
          <p className="text-xs text-white/60 mt-1">
            {Math.round(totalRuntimeMinutes / (reports.length || 1))} dk/analiz ort.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
            <LayoutList className="w-4 h-4 text-green-400" />
            <span>Bulunan Farklılıklar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalDifferences}</div>
          <p className="text-xs text-white/60 mt-1">
            Analiz başına {avgDifferencesPerReport} ort.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Farklılık Kategorileri</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex items-center space-x-1">
              <ImageIcon className="w-3 h-3 text-violet-400" />
              <span className="text-xs text-white/80">Görsel: {visualDifferences}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LayoutList className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-white/80">İçerik: {contentDifferences}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-white/80">Performans: {performanceDifferences}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code2 className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-white/80">DOM: {domDifferences}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
