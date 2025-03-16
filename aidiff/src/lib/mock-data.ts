import { Report, ReportSummary } from "@/types";
import { v4 as uuid } from "uuid";

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date: Date): string {
  return date.toISOString();
}

function generateRandomDifference(type: 'visual' | 'content' | 'performance' | 'dom') {
  const severities = ['low', 'medium', 'high', 'critical'] as const;
  const elements = {
    visual: ['header', 'footer', 'banner', 'image', 'button', 'card', 'hero section'],
    content: ['paragraph', 'heading', 'list', 'table', 'menu', 'link text', 'button text'],
    performance: ['resource loading', 'render time', 'javascript execution', 'network request', 'animation'],
    dom: ['HTML structure', 'CSS class', 'JavaScript function', 'DOM element', 'attribute']
  };

  const selectors = {
    visual: ['#header', '.navbar', '.footer', '.hero-image', '.product-card img', '.banner'],
    content: ['h1', 'p.intro', '.product-description', 'ul.menu li', '.price-tag', '.button-text'],
    performance: ['script[src="main.js"]', 'img.hero', '.animation-container', '#large-video', '.lazy-load'],
    dom: ['div.container', '#app-root', '.flex-container', 'button.primary', 'input[type="text"]']
  };

  const descriptions = {
    visual: [
      'Element size is different',
      'Color doesn\'t match',
      'Image is different',
      'Element position has changed',
      'Element is missing',
      'Font appears different',
      'Spacing or margin difference detected'
    ],
    content: [
      'Text content is different',
      'Missing paragraph',
      'Extra content found',
      'Text has been changed',
      'List item order is different',
      'Text formatting is inconsistent',
      'Content has been truncated'
    ],
    performance: [
      'Resource loads significantly slower',
      'Render time is higher',
      'JavaScript execution takes longer',
      'Network request delay detected',
      'Animation performance difference',
      'Page loaded slower',
      'First paint time difference'
    ],
    dom: [
      'HTML structure is different',
      'CSS class is missing',
      'JavaScript function implementation changed',
      'DOM element has different attributes',
      'Element hierarchy is different',
      'Element has different ID',
      'Script source is different'
    ]
  };

  const difference: any = {
    id: uuid(),
    type,
    element: elements[type][Math.floor(Math.random() * elements[type].length)],
    selector: selectors[type][Math.floor(Math.random() * selectors[type].length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
  };

  // Ekstra alanlar ekle (türe özgü)
  if (type === 'visual') {
    // Görseller genellikle gerçek uygulamada eklenir, burası mock
    difference.referenceScreenshot = 'https://via.placeholder.com/400x300?text=Reference';
    difference.testScreenshot = 'https://via.placeholder.com/400x300?text=Test';
  } else if (type === 'content') {
    difference.referenceValue = 'Bu bir örnek referans içerik metnidir.';
    difference.testValue = 'Bu farklı bir test içerik metnidir.';
  } else if (type === 'performance') {
    const refTime = Math.random() * 2000 + 100; // 100-2100ms
    const testTime = refTime * (Math.random() * 0.8 + 0.6); // %60-%140
    const diff = testTime - refTime;
    const percentDiff = (diff / refTime) * 100;

    difference.performanceData = {
      referenceTime: Math.round(refTime),
      testTime: Math.round(testTime),
      difference: Math.round(diff),
      percentageDifference: Math.round(percentDiff)
    };
  } else if (type === 'dom') {
    difference.referenceValue = '<div class="container"><h2>Başlık</h2><p>İçerik</p></div>';
    difference.testValue = '<div class="container modified"><h2 class="title">Başlık</h2><p>İçerik</p></div>';
  }

  return difference;
}

function generateMockReport(): Report {
  const startDate = new Date('2024-01-01');
  const endDate = new Date();
  const createdAt = formatDate(generateRandomDate(startDate, endDate));

  const domains = [
    'example.com',
    'acme-corp.com',
    'testwebsite.org',
    'myshop.store',
    'techblog.io',
    'portfolio.dev',
    'news-site.com',
    'web-app.io'
  ];

  const paths = [
    '',
    '/about',
    '/products',
    '/services',
    '/contact',
    '/blog',
    '/pricing',
    '/features'
  ];

  // Generate random URLs
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const path = paths[Math.floor(Math.random() * paths.length)];

  // One URL is the main site, the other is either staging, test, or a different version
  const prefixes = ['staging.', 'test.', 'dev.', 'beta.', 'v2.', 'new.'];
  const usePrefix = Math.random() > 0.5;
  const prefix = usePrefix ? prefixes[Math.floor(Math.random() * prefixes.length)] : '';

  const referenceUrl = `https://${domain}${path}`;
  const testUrl = `https://${prefix}${domain}${path}`;

  // Generate random counts for different types of differences
  const visualDifferences = Math.floor(Math.random() * 10);
  const contentDifferences = Math.floor(Math.random() * 8);
  const performanceDifferences = Math.floor(Math.random() * 5);
  const domDifferences = Math.floor(Math.random() * 7);

  const totalDifferences = visualDifferences + contentDifferences + performanceDifferences + domDifferences;

  // Generate differences
  const differences = [];

  for (let i = 0; i < visualDifferences; i++) {
    differences.push(generateRandomDifference('visual'));
  }

  for (let i = 0; i < contentDifferences; i++) {
    differences.push(generateRandomDifference('content'));
  }

  for (let i = 0; i < performanceDifferences; i++) {
    differences.push(generateRandomDifference('performance'));
  }

  for (let i = 0; i < domDifferences; i++) {
    differences.push(generateRandomDifference('dom'));
  }

  // Genel puanlama özeti
  const visualScore = Math.round(100 - (visualDifferences * (Math.random() * 10 + 5)));
  const contentScore = Math.round(100 - (contentDifferences * (Math.random() * 8 + 4)));
  const performanceScore = Math.round(100 - (performanceDifferences * (Math.random() * 15 + 8)));
  const domScore = Math.round(100 - (domDifferences * (Math.random() * 12 + 3)));

  const overallScore = Math.round((visualScore + contentScore + performanceScore + domScore) / 4);

  return {
    id: uuid(),
    createdAt,
    referenceUrl,
    testUrl,
    status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'failed' : 'running'),
    runtime: Math.floor(Math.random() * 120) + 10, // 10-130 seconds
    totalDifferences,
    visualDifferences,
    contentDifferences,
    performanceDifferences,
    domDifferences,
    differences,
    scoreSummary: {
      visualScore,
      contentScore,
      performanceScore,
      domScore,
      overallScore
    }
  };
}

// Generate a list of mock reports
export const mockReports: Report[] = Array.from({ length: 20 }, () => generateMockReport())
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by date descending

// Generated a filtered list for the report summaries (omitting the detailed differences)
export const mockReportSummaries: ReportSummary[] = mockReports.map(({
  id, createdAt, referenceUrl, testUrl, status,
  runtime, totalDifferences, visualDifferences,
  contentDifferences, performanceDifferences, domDifferences,
  scoreSummary
}) => ({
  id, createdAt, referenceUrl, testUrl, status,
  runtime, totalDifferences, visualDifferences,
  contentDifferences, performanceDifferences, domDifferences,
  scoreSummary
}));

// Helper function to get a report by ID
export function getReportById(id: string): Report | undefined {
  return mockReports.find(report => report.id === id);
}
