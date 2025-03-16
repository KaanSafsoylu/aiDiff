"use client";

import { Report } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Check,
  Code2,
  FileText,
  ImageIcon,
  LayoutList,
  PieChart,
  Zap
} from "lucide-react";

interface OverallSummaryViewProps {
  report: Report;
}

export function OverallSummaryView({ report }: OverallSummaryViewProps) {
  if (!report.scoreSummary) {
    return (
      <div className="text-center p-8 text-white/70">
        Bu rapor için özet puanlama bulunmuyor
      </div>
    );
  }

  const { visualScore, contentScore, performanceScore, domScore, overallScore } = report.scoreSummary;

  function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-lime-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  }

  function getScoreIcon(score: number, size: number = 5) {
    const className = `w-${size} h-${size} ${getScoreColor(score)}`;

    if (score >= 90) return <Check className={className} />;
    if (score >= 40) return <AlertCircle className={className} />;
    return <AlertCircle className={className} />;
  }

  function getScoreBar(score: number) {
    const color =
      score >= 90 ? 'bg-green-500' :
      score >= 75 ? 'bg-lime-500' :
      score >= 60 ? 'bg-yellow-500' :
      score >= 40 ? 'bg-orange-500' :
      'bg-red-500';

    return (
      <div className="w-full bg-black/20 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${score}%` }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall score card */}
      <Card className="bg-white/10 backdrop-blur-md border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2 text-white">
            <Activity className="w-5 h-5 text-violet-400" />
            <span>Genel Uyumluluk Puanı</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            İki sayfa arasındaki farklılıkların genel özeti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-6xl font-bold inline-flex items-center">
              <span className={getScoreColor(overallScore)}>{overallScore}</span>
              <span className="text-xl text-white/60 ml-1">/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-white/80">Görsel Uyumluluk</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(visualScore)}`}>{visualScore}/100</span>
                </div>
                {getScoreBar(visualScore)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/80">İçerik Uyumluluk</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(contentScore)}`}>{contentScore}/100</span>
                </div>
                {getScoreBar(contentScore)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">Performans Uyumluluk</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(performanceScore)}`}>{performanceScore}/100</span>
                </div>
                {getScoreBar(performanceScore)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-white/80">DOM Uyumluluk</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(domScore)}`}>{domScore}/100</span>
                </div>
                {getScoreBar(domScore)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional summary info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
              <PieChart className="w-4 h-4 text-violet-400" />
              <span>Farklılık Dağılımı</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-md">
                <ImageIcon className="w-6 h-6 text-violet-400 mb-1" />
                <div className="text-lg font-bold text-white">{report.visualDifferences}</div>
                <div className="text-xs text-white/60">Görsel</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-md">
                <LayoutList className="w-6 h-6 text-blue-400 mb-1" />
                <div className="text-lg font-bold text-white">{report.contentDifferences}</div>
                <div className="text-xs text-white/60">İçerik</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-md">
                <Zap className="w-6 h-6 text-yellow-400 mb-1" />
                <div className="text-lg font-bold text-white">{report.performanceDifferences}</div>
                <div className="text-xs text-white/60">Performans</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-md">
                <Code2 className="w-6 h-6 text-orange-400 mb-1" />
                <div className="text-lg font-bold text-white">{report.domDifferences}</div>
                <div className="text-xs text-white/60">DOM</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/10 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2 text-white/80">
              <BarChart3 className="w-4 h-4 text-yellow-400" />
              <span>Öneriler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.visualDifferences > 0 && (
                <div className="flex space-x-2 text-sm text-white/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-violet-400 font-medium">1</span>
                  </div>
                  <div>
                    <p>Görsel farklılıkları gidermek için test sayfanızdaki tasarım bileşenlerini referans sayfayla eşleşecek şekilde güncelleyin.</p>
                  </div>
                </div>
              )}

              {report.performanceDifferences > 0 && (
                <div className="flex space-x-2 text-sm text-white/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-yellow-400 font-medium">2</span>
                  </div>
                  <div>
                    <p>Performans iyileştirmeleri için yavaş yüklenen kaynakları optimize edin ve gereksiz HTTP isteklerini azaltın.</p>
                  </div>
                </div>
              )}

              {report.domDifferences > 0 && (
                <div className="flex space-x-2 text-sm text-white/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-orange-400 font-medium">3</span>
                  </div>
                  <div>
                    <p>DOM yapısını referans sayfayla aynı olacak şekilde düzeltin. Eksik veya hatalı CSS sınıflarını kontrol edin.</p>
                  </div>
                </div>
              )}

              {report.contentDifferences > 0 && (
                <div className="flex space-x-2 text-sm text-white/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-400 font-medium">4</span>
                  </div>
                  <div>
                    <p>Metin içeriğindeki farklılıkları düzeltin. Eksik metinleri ekleyin ve mevcut metinleri referans sayfayla eşleştirin.</p>
                  </div>
                </div>
              )}

              {report.visualDifferences === 0 && report.performanceDifferences === 0 &&
               report.domDifferences === 0 && report.contentDifferences === 0 && (
                <div className="flex space-x-2 text-sm text-white/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-green-400 font-medium">✓</span>
                  </div>
                  <div>
                    <p>Tebrikler! Sayfalar arasında önemli bir farklılık bulunamadı.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OverallSummaryView;
