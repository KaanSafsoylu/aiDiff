import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-10">
      {/* Animated Background */}
      <AnimatedBackground />

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-7xl font-extrabold tracking-tight text-white">404</h1>
          <h2 className="text-3xl font-bold text-white">Sayfa Bulunamadı</h2>
          <p className="text-xl text-white/70 max-w-md mt-2">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir
          </p>

          <div className="mt-8">
            <Link href="/">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
