"use client";

import { ReportDifference } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

interface VisualDifferenceViewProps {
  differences: ReportDifference[];
}

export function VisualDifferenceView({ differences }: VisualDifferenceViewProps) {
  if (differences.length === 0) {
    return (
      <div className="text-center p-8 text-white/70">
        Görsel farklılık bulunamadı
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

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {differences.map((difference) => (
          <Card key={difference.id} className="bg-white/10 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-violet-400" />
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
                <div className="space-y-2">
                  <div className="text-xs text-white/60">Referans</div>
                  <img
                    src={difference.referenceScreenshot || 'https://via.placeholder.com/400x300?text=Referans+Görüntü+Yok'}
                    alt="Referans ekran görüntüsü"
                    className="w-full rounded-md border border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-white/60">Test</div>
                  <img
                    src={difference.testScreenshot || 'https://via.placeholder.com/400x300?text=Test+Görüntü+Yok'}
                    alt="Test ekran görüntüsü"
                    className="w-full rounded-md border border-white/10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VisualDifferenceView;
