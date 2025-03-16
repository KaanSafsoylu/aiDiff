"use client";

import Link from "next/link";
import { ReportSummary } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportListProps {
  reports: ReportSummary[];
}

export function ReportList({ reports }: ReportListProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-white/80">Henüz hiç karşılaştırma yapılmamış</h3>
        <p className="text-white/60 mt-2">Ana sayfaya giderek ilk karşılaştırmanızı başlatabilirsiniz</p>
      </div>
    );
  }

  function formatRuntime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} saniye`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} dakika ${remainingSeconds} saniye`;
  }

  function getStatusBadge(status: 'completed' | 'failed' | 'running') {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600 hover:bg-green-700">Tamamlandı</Badge>;
      case 'failed':
        return <Badge className="bg-red-600 hover:bg-red-700">Başarısız</Badge>;
      case 'running':
        return <Badge className="bg-blue-600 hover:bg-blue-700">Çalışıyor</Badge>;
    }
  }

  function getDifferencesSummary(report: ReportSummary) {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {report.visualDifferences > 0 && (
          <Badge variant="outline" className="bg-white/5 text-violet-300 hover:bg-white/10">
            {report.visualDifferences} görsel
          </Badge>
        )}
        {report.contentDifferences > 0 && (
          <Badge variant="outline" className="bg-white/5 text-blue-300 hover:bg-white/10">
            {report.contentDifferences} içerik
          </Badge>
        )}
        {report.performanceDifferences > 0 && (
          <Badge variant="outline" className="bg-white/5 text-yellow-300 hover:bg-white/10">
            {report.performanceDifferences} performans
          </Badge>
        )}
        {report.domDifferences > 0 && (
          <Badge variant="outline" className="bg-white/5 text-orange-300 hover:bg-white/10">
            {report.domDifferences} DOM
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {reports.map((report) => (
        <Link key={report.id} href={`/reports/${report.id}`} passHref legacyBehavior>
          <a className="block transition-transform hover:scale-102">
            <Card className="h-full bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/15 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="truncate max-w-[180px] text-white">
                    {new URL(report.referenceUrl).hostname}
                  </span>
                  {getStatusBadge(report.status)}
                </CardTitle>
                <div className="flex items-center text-sm text-white/80 mt-1">
                  <span className="text-xs text-white/60">
                    {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: tr })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-white/60">Referans:</div>
                    <div className="text-xs text-white/80 truncate max-w-[200px]">{report.referenceUrl}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-white/60">Test:</div>
                    <div className="text-xs text-white/80 truncate max-w-[200px]">{report.testUrl}</div>
                  </div>
                </div>

                {report.status === 'completed' && (
                  <>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm font-medium text-white/80">Sonuçlar</div>
                      <Badge className="bg-violet-600 hover:bg-violet-700">
                        {report.totalDifferences} Farklılık
                      </Badge>
                    </div>
                    {getDifferencesSummary(report)}
                  </>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <div className="text-xs text-white/60">
                  Çalışma Süresi: {formatRuntime(report.runtime)}
                </div>
              </CardFooter>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  );
}
