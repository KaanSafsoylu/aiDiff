import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Viewport sizes for responsive comparison
const VIEWPORT_SIZES = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

export async function POST(req: NextRequest) {
  try {
    const { referenceUrl, testUrl } = await req.json();

    if (!referenceUrl || !testUrl) {
      return NextResponse.json(
        { error: 'Both referenceUrl and testUrl are required' },
        { status: 400 }
      );
    }

    // Create a unique ID for this comparison
    const comparisonId = uuidv4();
    
    // Create directory for storing screenshots
    const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots', comparisonId);
    await mkdir(screenshotsDir, { recursive: true });

    // Launch browser
    const browser = await chromium.launch();
    const results = [];

    // Take screenshots for each viewport size
    for (const viewport of VIEWPORT_SIZES) {
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
      });

      // Capture reference screenshot
      const referencePage = await context.newPage();
      await referencePage.goto(referenceUrl, { waitUntil: 'networkidle' });
      const referenceScreenshot = await referencePage.screenshot({ fullPage: true });
      const referenceImage = PNG.sync.read(referenceScreenshot);

      // Capture test screenshot
      const testPage = await context.newPage();
      await testPage.goto(testUrl, { waitUntil: 'networkidle' });
      const testScreenshot = await testPage.screenshot({ fullPage: true });
      const testImage = PNG.sync.read(testScreenshot);

      // Create diff image
      const { width, height } = referenceImage;
      const diffImage = new PNG({ width, height });
      
      // Compare images
      const diffPixels = pixelmatch(
        referenceImage.data,
        testImage.data,
        diffImage.data,
        width,
        height,
        { threshold: 0.1 }
      );

      // Calculate difference percentage
      const diffPercentage = (diffPixels / (width * height)) * 100;

      // Save images
      const referenceFilename = `${viewport.name}-reference.png`;
      const testFilename = `${viewport.name}-test.png`;
      const diffFilename = `${viewport.name}-diff.png`;

      await writeFile(path.join(screenshotsDir, referenceFilename), PNG.sync.write(referenceImage));
      await writeFile(path.join(screenshotsDir, testFilename), PNG.sync.write(testImage));
      await writeFile(path.join(screenshotsDir, diffFilename), PNG.sync.write(diffImage));

      results.push({
        viewport: viewport.name,
        diffPercentage: diffPercentage.toFixed(2),
        images: {
          reference: `/screenshots/${comparisonId}/${referenceFilename}`,
          test: `/screenshots/${comparisonId}/${testFilename}`,
          diff: `/screenshots/${comparisonId}/${diffFilename}`,
        },
      });

      await context.close();
    }

    await browser.close();

    return NextResponse.json({
      comparisonId,
      results,
    });
  } catch (error) {
    console.error('Visual comparison error:', error);
    return NextResponse.json(
      { error: 'Failed to compare URLs' },
      { status: 500 }
    );
  }
} 