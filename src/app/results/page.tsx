"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ComparisonResults } from "@/components/comparison-results";
import { VisualComparison } from "@/components/visual-comparison";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const referenceUrl = searchParams.get("reference") || "";
  const testUrl = searchParams.get("test") || "";

  useEffect(() => {
    if (!referenceUrl || !testUrl) {
      toast.error("URL parametreleri eksik, lütfen ana sayfadan başlayın");
    }
  }, [referenceUrl, testUrl]);

  if (!referenceUrl || !testUrl) {
    return (
      <main className="min-h-screen bg-gray-900 py-12">
        <Container>
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-violet-400 mb-4">URL Parametreleri Eksik</h1>
            <p className="text-gray-300 mb-6">
              Sonuçları görüntülemek için gerekli URL parametreleri eksik. Ana sayfaya dönün ve karşılaştırmak istediğiniz URL'leri girin.
            </p>
            <Link href="/">
              <Button>Ana Sayfaya Dön</Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <Container>
        <div className="space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-violet-400">Karşılaştırma Sonuçları</h1>
            <Link href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Yeni Karşılaştırma</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-lg border-none">
            <div>
              <h2 className="text-sm font-medium text-gray-400">Referans URL:</h2>
              <p className="text-violet-300 font-medium overflow-hidden text-ellipsis">{referenceUrl}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-400">Test URL:</h2>
              <p className="text-violet-300 font-medium overflow-hidden text-ellipsis">{testUrl}</p>
            </div>
          </div>
        </div>

        <VisualComparison referenceUrl={referenceUrl} testUrl={testUrl} />

        <ComparisonResults referenceUrl={referenceUrl} testUrl={testUrl} />
      </Container>

      <Toaster position="top-center" />
    </main>
  );
}
