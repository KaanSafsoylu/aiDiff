"use client";

import { Report } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  ImageIcon,
  LayoutList,
  Loader2,
  PieChart,
  Zap
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import dynamic from "next/dynamic";

// Dinamik olarak yükle
const VisualDifferenceView = dynamic(() => import("@/components/report-views/visual-difference-view").then(mod => mod.VisualDifferenceView), {
  loading: () => <div className="text-center p-8 text-white/70">Görsel farklılıklar yükleniyor...</div>,
  ssr: false
});

const PerformanceDifferenceView = dynamic(() => import("@/components/report-views/performance-difference-view").then(mod => mod.PerformanceDifferenceView), {
  loading: () => <div className="text-center p-8 text-white/70">Performans farklılıkları yükleniyor...</div>,
  ssr: false
});

const DomDifferenceView = dynamic(() => import("@/components/report-views/dom-difference-view").then(mod => mod.DomDifferenceView), {
  loading: () => <div className="text-center p-8 text-white/70">DOM farklılıkları yükleniyor...</div>,
  ssr: false
});

const OverallSummaryView = dynamic(() => import("@/components/report-views/overall-summary-view").then(mod => mod.OverallSummaryView), {
  loading: () => <div className="text-center p-8 text-white/70">Özet yükleniyor...</div>,
  ssr: false
});

interface ReportDetailProps {
  report: Report;
}

export function ReportDetail({ report }: ReportDetailProps) {
  const visualDifferences = report.differences.filter(diff => diff.type === 'visual');
  const contentDifferences = report.differences.filter(diff => diff.type === 'content');
  const performanceDifferences = report.differences.filter(diff => diff.type === 'performance');
  const domDifferences = report.differences.filter(diff => diff.type === 'dom');

  function formatRuntime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} saniye`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} dakika ${remainingSeconds} saniye`;
  }

  function getStatusIcon(status: 'completed' | 'failed' | 'running') {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    }
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

  function getDifferenceTypeIcon(type: 'visual' | 'content' | 'performance' | 'dom') {
    switch (type) {
      case 'visual':
        return <ImageIcon className="w-4 h-4 text-violet-400" />;
      case 'content':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'performance':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'dom':
        return <Code2 className="w-4 h-4 text-orange-400" />;
    }
  }

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            {getStatusIcon(report.status)}
            <span>{new URL(report.referenceUrl).hostname} Karşılaştırması</span>
          </h1>
          <div className="text-white/60 text-sm flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: tr })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/10">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-white/80">Referans URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white break-all text-sm">{report.referenceUrl}</span>
                <a
                  href={report.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/10">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-white/80">Test URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white break-all text-sm">{report.testUrl}</span>
                <a
                  href={report.testUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Summary */}
        <Card className="bg-white/10 backdrop-blur-md border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Analiz Özeti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <LayoutList className="w-4 h-4 text-violet-400" />
                  <span>Toplam Farklılık</span>
                </div>
                <div className="text-2xl font-bold text-white">{report.totalDifferences}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Çalışma Süresi</span>
                </div>
                <div className="text-xl font-bold text-white">{formatRuntime(report.runtime)}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <Eye className="w-4 h-4 text-green-400" />
                  <span>Durum</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(report.status)}
                  <span className="text-white font-medium">
                    {report.status === 'completed' ? 'Tamamlandı' :
                     report.status === 'failed' ? 'Başarısız' : 'Çalışıyor'}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span>Kritik Sorunlar</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {report.differences.filter(d => d.severity === 'critical').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Differences Tabs */}
      <Tabs defaultValue="visual" className="mt-6">
        <TabsList className="bg-white/10 border-white/10 w-full flex">
          <TabsTrigger value="visual" className="flex-1 data-[state=active]:bg-violet-600">
            <ImageIcon className="mr-2 h-4 w-4" />
            Görsel ({visualDifferences.length})
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex-1 data-[state=active]:bg-yellow-600">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performans ({performanceDifferences.length})
          </TabsTrigger>
          <TabsTrigger value="dom" className="flex-1 data-[state=active]:bg-orange-600">
            <Code2 className="mr-2 h-4 w-4" />
            DOM ({domDifferences.length})
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex-1 data-[state=active]:bg-blue-600">
            <PieChart className="mr-2 h-4 w-4" />
            Genel Özet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-6">
          <VisualDifferenceView differences={visualDifferences} />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceDifferenceView differences={performanceDifferences} />
        </TabsContent>

        <TabsContent value="dom" className="mt-6">
          <DomDifferenceView differences={domDifferences} />
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <OverallSummaryView report={report} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
