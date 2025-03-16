"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ReportDetail } from "@/components/report-detail";
import { AnimatedBackground } from "@/components/animated-background";
import { getReportById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Report } from "@/types";

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Raporu ID'ye göre getir
  useEffect(() => {
    try {
      const reportData = getReportById(reportId);
      if (reportData) {
        setReport(reportData);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Report fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  // Hata veya yükleme durumları
  if (loading) {
    return (
      <main className="relative min-h-screen flex justify-center items-center">
        <AnimatedBackground />
        <Container className="relative z-10 py-8 text-center">
          <div className="text-white text-xl">Rapor yükleniyor...</div>
        </Container>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="relative min-h-screen flex justify-center items-center">
        <AnimatedBackground />
        <Container className="relative z-10 py-8 text-center">
          <div className="space-y-4">
            <div className="text-white text-xl">Rapor bulunamadı</div>
            <Link href="/reports">
              <Button className="mt-4 bg-violet-600 hover:bg-violet-700">
                Tüm Raporlar
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />

      <Container className="relative z-10 py-8">
        <div className="mb-6">
          <Link href="/reports">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Raporlar
            </Button>
          </Link>
        </div>

        <ReportDetail report={report} />
      </Container>
    </main>
  );
}
