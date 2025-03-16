"use client";

import { useState, useEffect } from "react";
import { ReportList } from "@/components/report-list";
import { ReportStats } from "@/components/report-stats";
import { mockReportSummaries } from "@/lib/mock-data";
import { Container } from "@/components/ui/container";
import { AnimatedBackground } from "@/components/animated-background";
import { ReportSummary } from "@/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock verileri getir (gerçek bir API'den veri almayı simüle ediyor)
  useEffect(() => {
    // Gerçek bir uygulamada burada API çağrısı yapılır
    const fetchReports = () => {
      setTimeout(() => {
        setReports(mockReportSummaries);
        setLoading(false);
      }, 500); // API çağrısını simüle etmek için 500ms gecikme
    };

    fetchReports();
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />

      <Container className="relative z-10 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-white">Raporlar</h1>
            <p className="text-white/70">
              Geçmiş karşılaştırmalarınızı görüntüleyin ve analizleri inceleyin
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-white text-lg">Raporlar yükleniyor...</div>
            </div>
          ) : (
            <>
              {/* Statistics Cards */}
              <ReportStats reports={reports} />

              {/* List of Reports */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-white mb-4">Tüm Karşılaştırmalar</h2>
                <ReportList reports={reports} />
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
