import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image';

interface VisualComparisonProps {
  referenceUrl: string;
  testUrl: string;
}

interface ComparisonResult {
  viewport: string;
  diffPercentage: string;
  images: {
    reference: string;
    test: string;
    diff: string;
  };
}

export function VisualComparison({ referenceUrl, testUrl }: VisualComparisonProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedViewport, setSelectedViewport] = useState<string>('desktop');

  const startComparison = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/visual-diff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referenceUrl,
          testUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to compare URLs');
      }

      const data = await response.json();
      setResults(data.results);
      setSelectedViewport(data.results[0]?.viewport || 'desktop');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectedResult = results.find(r => r.viewport === selectedViewport);

  return (
    <Card className="mt-6 bg-white/10 backdrop-blur-md border-none">
      <CardHeader>
        <CardTitle className="text-white">Görsel Karşılaştırma</CardTitle>
        <CardDescription className="text-white/80">
          Sayfaların ekran görüntülerini karşılaştırın
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!results.length && !loading && (
          <button
            onClick={startComparison}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Karşılaştırılıyor...' : 'Görsel Karşılaştırmayı Başlat'}
          </button>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="w-12 h-12 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100/10 text-red-400 p-4 rounded">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <Tabs value={selectedViewport} onValueChange={setSelectedViewport}>
              <TabsList className="grid grid-cols-3 w-full bg-white/20">
                {results.map(result => (
                  <TabsTrigger 
                    key={result.viewport} 
                    value={result.viewport} 
                    className="capitalize text-white data-[state=active]:bg-violet-600"
                  >
                    {result.viewport}
                    <span className="ml-2 text-xs bg-violet-100/20 text-violet-200 px-2 py-0.5 rounded">
                      {result.diffPercentage}%
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {selectedResult && (
                <TabsContent value={selectedViewport} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-white/80">Referans</h3>
                      <div className="relative border border-white/20 rounded overflow-hidden">
                        <Image
                          src={selectedResult.images.reference}
                          alt="Reference"
                          width={800}
                          height={600}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-white/80">Test</h3>
                      <div className="relative border border-white/20 rounded overflow-hidden">
                        <Image
                          src={selectedResult.images.test}
                          alt="Test"
                          width={800}
                          height={600}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-white/80">Farklar</h3>
                      <div className="relative border border-white/20 rounded overflow-hidden">
                        <Image
                          src={selectedResult.images.diff}
                          alt="Differences"
                          width={800}
                          height={600}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 