"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function UrlComparisonForm() {
  const router = useRouter();
  const [referenceUrl, setReferenceUrl] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate URLs
    if (!referenceUrl || !testUrl) {
      toast.error("Lütfen her iki URL'yi de girin");
      return;
    }

    try {
      // Validate URLs more thoroughly
      new URL(referenceUrl);
      new URL(testUrl);

      setIsLoading(true);

      // In a real app, we'd send this to the backend for processing
      // For now, we'll mock by redirecting to results page with URL parameters
      router.push(`/results?reference=${encodeURIComponent(referenceUrl)}&test=${encodeURIComponent(testUrl)}`);
    } catch (error) {
      toast.error("Lütfen geçerli URL'ler girin");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl bg-white/10 backdrop-blur-md border-none shadow-lg">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Input
                type="url"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="Referans URL"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/80 h-12"
              />
            </div>
            <div>
              <Input
                type="url"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="Test URL"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/80 h-12"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 text-base"
            disabled={isLoading}
          >
            {isLoading ? "İşleniyor..." : "Karşılaştır"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
