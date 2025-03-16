"use client";

import { ReportDifference } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, GitCompare } from "lucide-react";

interface DomDifferenceViewProps {
  differences: ReportDifference[];
}

export function DomDifferenceView({ differences }: DomDifferenceViewProps) {
  if (differences.length === 0) {
    return (
      <div className="text-center p-8 text-white/70">
        DOM farklılığı bulunamadı
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

  // Simple code highlighter to show changes
  function highlightDifferences(reference: string, test: string) {
    if (!reference || !test) return { referenceHtml: reference, testHtml: test };

    const diffParts = [];
    let currentDiff = false;
    let diffStart = -1;

    // Find different parts
    for (let i = 0; i < Math.max(reference.length, test.length); i++) {
      if (i >= reference.length || i >= test.length || reference[i] !== test[i]) {
        if (!currentDiff) {
          currentDiff = true;
          diffStart = i;
        }
      } else if (currentDiff) {
        diffParts.push({ start: diffStart, end: i - 1 });
        currentDiff = false;
      }
    }

    if (currentDiff) {
      diffParts.push({ start: diffStart, end: Math.max(reference.length, test.length) - 1 });
    }

    // Apply highlighting
    let referenceHtml = reference;
    let testHtml = test;

    // Apply highlights from the end to not mess up indices
    for (let i = diffParts.length - 1; i >= 0; i--) {
      const { start, end } = diffParts[i];

      if (start < reference.length) {
        const beforeDiff = referenceHtml.slice(0, start);
        const diff = referenceHtml.slice(start, Math.min(end + 1, reference.length));
        const afterDiff = referenceHtml.slice(Math.min(end + 1, reference.length));
        referenceHtml = `${beforeDiff}<span class="bg-red-500/30 px-0.5 rounded">${diff}</span>${afterDiff}`;
      }

      if (start < test.length) {
        const beforeDiff = testHtml.slice(0, start);
        const diff = testHtml.slice(start, Math.min(end + 1, test.length));
        const afterDiff = testHtml.slice(Math.min(end + 1, test.length));
        testHtml = `${beforeDiff}<span class="bg-green-500/30 px-0.5 rounded">${diff}</span>${afterDiff}`;
      }
    }

    return { referenceHtml, testHtml };
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {differences.map((difference) => {
          const { referenceHtml, testHtml } = highlightDifferences(
            difference.referenceValue || '',
            difference.testValue || ''
          );

          return (
            <Card key={difference.id} className="bg-white/10 backdrop-blur-md border-white/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-orange-400" />
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

                <div className="flex items-center space-x-2 text-sm text-white/90 mb-2">
                  <GitCompare className="w-4 h-4 text-blue-400" />
                  <span>DOM Değişikliği</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs text-white/60">Referans DOM</div>
                    <div className="bg-black/30 rounded-md p-3 overflow-x-auto max-h-[200px] overflow-y-auto">
                      <pre className="text-xs font-mono text-white/90 whitespace-pre-wrap">
                        <div dangerouslySetInnerHTML={{ __html: referenceHtml }} />
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-white/60">Test DOM</div>
                    <div className="bg-black/30 rounded-md p-3 overflow-x-auto max-h-[200px] overflow-y-auto">
                      <pre className="text-xs font-mono text-white/90 whitespace-pre-wrap">
                        <div dangerouslySetInnerHTML={{ __html: testHtml }} />
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-white/60">
                  <span className="inline-block w-3 h-3 bg-red-500/30 rounded mr-1"></span> Silinmiş &nbsp;
                  <span className="inline-block w-3 h-3 bg-green-500/30 rounded mr-1"></span> Eklenmiş
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default DomDifferenceView;
