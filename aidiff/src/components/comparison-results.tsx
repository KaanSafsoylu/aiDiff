"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactDiffViewer from "react-diff-viewer-continued";
import { toast } from "sonner";

// Mock data for page comparison results
const MOCK_PAGES = [
  { path: "/", title: "Ana Sayfa" },
  { path: "/about", title: "Hakkımızda" },
  { path: "/contact", title: "İletişim" },
  { path: "/products", title: "Ürünler" },
];

// Mock HTML content with differences
const MOCK_CONTENT_REFERENCE = `<!DOCTYPE html>
<html>
<head>
  <title>Example Site</title>
  <meta name="description" content="This is an example site">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Welcome to our website</h1>
    <p>This is the reference version of the content.</p>
    <div class="featured-section">
      <h2>Featured Items</h2>
      <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ul>
    </div>
  </main>
  <footer>
    <p>&copy; 2025 Example Company</p>
  </footer>
</body>
</html>`;

const MOCK_CONTENT_TEST = `<!DOCTYPE html>
<html>
<head>
  <title>Example Site</title>
  <meta name="description" content="This is an example site with updates">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/products">Products</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Welcome to our website</h1>
    <p>This is the test version with some changes.</p>
    <div class="featured-section">
      <h2>Featured Products</h2>
      <ul>
        <li>Product One</li>
        <li>Product Two</li>
        <li>Product Three</li>
        <li>Product Four</li>
      </ul>
    </div>
  </main>
  <footer>
    <p>&copy; 2025 Example Company Ltd.</p>
  </footer>
</body>
</html>`;

interface ComparisonResultsProps {
  referenceUrl: string;
  testUrl: string;
}

export function ComparisonResults({ referenceUrl, testUrl }: ComparisonResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const [comparedPages, setComparedPages] = useState<{ path: string; title: string; hasDifferences: boolean }[]>([]);
  const [selectedPage, setSelectedPage] = useState("/");

  // In a real app, we would fetch the comparison data from the server
  useEffect(() => {
    // Simulate loading comparison data
    const timer = setTimeout(() => {
      setComparedPages(
        MOCK_PAGES.map((page) => ({
          ...page,
          hasDifferences: Math.random() > 0.3, // Random differences for demo
        }))
      );
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [referenceUrl, testUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64">
        <div className="w-12 h-12 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin mb-4"></div>
        <p className="text-violet-800">Sayfalar karşılaştırılıyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="summary">Özet</TabsTrigger>
          <TabsTrigger value="details">Detaylar</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Karşılaştırma Özeti</CardTitle>
              <CardDescription>
                {referenceUrl} ve {testUrl} arasındaki farklılıklar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Taranan Sayfa Sayısı:</span>
                  <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded">
                    {comparedPages.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Farklılık Bulunan Sayfalar:</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                    {comparedPages.filter(p => p.hasDifferences).length}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-medium mb-2">Farklılık Bulunan Sayfalar:</h3>
                  <ul className="space-y-2">
                    {comparedPages
                      .filter(page => page.hasDifferences)
                      .map(page => (
                        <li key={page.path} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          <button
                            onClick={() => {
                              setSelectedPage(page.path);
                              setActiveTab("details");
                            }}
                            className="text-violet-600 hover:underline text-left"
                          >
                            {page.title} ({page.path})
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="pt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sayfa Karşılaştırması</CardTitle>
                  <CardDescription>
                    {comparedPages.find(p => p.path === selectedPage)?.title} ({selectedPage})
                  </CardDescription>
                </div>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {comparedPages.map(page => (
                    <option key={page.path} value={page.path}>
                      {page.title} {page.hasDifferences ? "🔴" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden text-sm">
                <ReactDiffViewer
                  oldValue={MOCK_CONTENT_REFERENCE}
                  newValue={MOCK_CONTENT_TEST}
                  splitView={true}
                  leftTitle={`Referans: ${referenceUrl}${selectedPage}`}
                  rightTitle={`Test: ${testUrl}${selectedPage}`}
                  compareMethod="diffWords"
                  useDarkTheme={false}
                  styles={{
                    contentText: {
                      fontSize: "0.8rem",
                    },
                  }}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => toast.success("Rapor indirildi!")}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded shadow text-sm"
                >
                  Raporu İndir
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
