import { Container } from "@/components/ui/container";
import { UrlComparisonForm } from "@/components/url-comparison-form";
import { AnimatedBackground } from "@/components/animated-background";
import { ComparisonIllustration } from "@/components/comparison-illustration";
import { Toaster } from "@/components/ui/sonner";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      {/* Animated Background */}
      <AnimatedBackground />

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Logo */}
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2">
            ai<span className="text-violet-400">Diff</span>
          </h1>

          {/* Comparison Illustration */}
          <ComparisonIllustration />

          {/* URL Comparison Form */}
          <UrlComparisonForm />

          {/* Footer */}
          <div className="pt-4 text-center text-sm text-white/60">
            <p>© 2025 aiDiff</p>
          </div>
        </div>
      </Container>

      <Toaster position="top-center" />
    </main>
  );
}
