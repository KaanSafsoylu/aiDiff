"use client";

import { ReportDifference } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, ArrowUpFromLine, BarChart3, Clock, Zap } from "lucide-react";

interface PerformanceDifferenceViewProps {
  differences: ReportDifference[];
}

export function PerformanceDifferenceView({ differences }: PerformanceDifferenceViewProps) {
  if (differences.length === 0) {
    return (
      <div className="text-center p-8 text-white/70">
        Performans farklılığı bulunamadı
      </div>
    );
  }

  function getSeverityBadge(severity: 'low' | 'medium' | 'high' | 'critical') {
    switch (severity) {
      case 'low':
        return <Badge className="bg-blue-600 hover:bg-blue-700">Düşük</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Orta</Badge>;
      case 'high':
        return <Badge className="bg-orange-600 hover:bg-orange-700">Yüksek</Badge>;
      case 'critical':
        return <Badge className="bg-red-600 hover:bg-red-700">Kritik</Badge>;
    }
  }

  function formatTime(ms: number | undefined): string {
    if (ms === undefined) return 'Bilinmiyor';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }

  // Calculate the max time to use for bar charts
  const maxTime = Math.max(
    ...differences.map(d => Math.max(
      d.performanceData?.referenceTime || 0,
      d.performanceData?.testTime || 0
    ))
  );

  return (
    <div className="space-y-6">
      {/* Summary bar chart that shows overall performance */}
      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2 text-white">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <span>Performans Özeti</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Tüm performans ölçümlerinin karşılaştırması
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {differences.map((diff) => (
              <div key={diff.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>{diff.element}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <span>Fark: </span>
                    <span className={diff.performanceData?.difference && diff.performanceData.difference > 0
                      ? 'text-red-400'
                      : 'text-green-400'
                    }>
                      {diff.performanceData?.difference
                        ? `${diff.performanceData.difference > 0 ? '+' : ''}${diff.performanceData.difference}ms (${diff.performanceData.percentageDifference?.toFixed(0)}%)`
                        : 'Bilinmiyor'
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="text-xs text-white/60 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Referans: {formatTime(diff.performanceData?.referenceTime)}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${((diff.performanceData?.referenceTime || 0) / maxTime) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-white/60 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Test: {formatTime(diff.performanceData?.testTime)}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          diff.performanceData?.difference && diff.performanceData.difference > 0
                            ? 'bg-red-600'
                            : 'bg-green-600'
                        }`}
                        style={{
                          width: `${((diff.performanceData?.testTime || 0) / maxTime) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual performance differences */}
      <div className="grid gap-4">
        {differences.map((difference) => (
          <Card key={difference.id} className="bg-white/10 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <CardTitle className="text-sm font-medium text-white/90">
                    {difference.element}
                  </CardTitle>
                </div>
                {getSeverityBadge(difference.severity)}
              </div>
              <CardDescription className="text-white/60 text-xs mt-1">
                Seçici: <code className="bg-black/30 px-1 py-0.5 rounded">{difference.selector}</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80">{difference.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black/20 border-white/5">
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm text-white/90 flex items-center">
                      <ArrowDownToLine className="w-4 h-4 mr-2 text-blue-400" />
                      Referans Performansı
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <div className="text-2xl font-bold text-white">
                      {formatTime(difference.performanceData?.referenceTime)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/5">
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm text-white/90 flex items-center">
                      <ArrowUpFromLine className="w-4 h-4 mr-2 text-yellow-400" />
                      Test Performansı
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <div
                      className={`text-2xl font-bold ${
                        difference.performanceData?.difference && difference.performanceData.difference > 0
                          ? 'text-red-400'
                          : 'text-green-400'
                      }`}
                    >
                      {formatTime(difference.performanceData?.testTime)}
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      {difference.performanceData?.difference
                        ? `${difference.performanceData.difference > 0 ? '+' : ''}${difference.performanceData.difference}ms (${difference.performanceData.percentageDifference?.toFixed(0)}%)`
                        : 'Fark bilinmiyor'
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PerformanceDifferenceView;
