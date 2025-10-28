# Build Fixes for Static Export

This document outlines the additional fixes that were required to successfully build the site for static export.

## Issues Encountered & Solutions

### Issue 1: Dynamic Routes Need Static Configuration

**Error:**

```
Error: export const dynamic = "force-static"/export const revalidate not configured on route
```

**Affected Files:**

- `app/sitemap.ts`
- `app/robots.ts`
- `app/opengraph-image.tsx`
- `app/icon.tsx`
- `app/apple-icon.tsx`
- `app/icon-192.tsx`
- `app/icon-512.tsx`
- `app/manifest.ts`

**Solution:**
Added `export const dynamic = 'force-static';` to each file to explicitly mark them for static generation.

**Example:**

```typescript
import { MetadataRoute } from "next";

export const dynamic = "force-static"; // ← Added this line

export default function sitemap(): MetadataRoute.Sitemap {
  // ... rest of the code
}
```

### Issue 2: Dynamic Routes Missing generateStaticParams()

**Error:**

```
Error: Page "/markdown/marketplace/[id]" is missing "generateStaticParams()"
so it cannot be used with "output: export" config.
```

**Affected Files:**

- `app/marketplace/[id]/page.tsx`
- `app/markdown/marketplace/[id]/page.tsx`

**Solution:**
Added `generateStaticParams()` function to pre-generate all marketplace detail pages at build time.

**Example:**

```typescript
import marketplacesData from "@/.claude-plugin/marketplaces.json";

// Generate static params for all marketplaces
export async function generateStaticParams() {
  return marketplacesData.marketplaces.map((marketplace) => ({
    id: marketplace.id,
  }));
}
```

### Issue 3: Server Actions Not Supported

**Error:**

```
Server Actions are not supported with static export.
```

**Affected File:**

- `app/actions.ts`

**Solution:**
Removed `'use server';` directive and converted server actions to regular build-time functions.

**Before:**

```typescript
"use server";

export async function getMarketplacesData(): Promise<FetchedMarketplace[]> {
  // ...
}
```

**After:**

```typescript
// Build-time data fetching functions (no server actions for static export)
export async function getMarketplacesData(): Promise<FetchedMarketplace[]> {
  // ...
}
```

## Files Modified (Build Fixes)

1. ✏️ `app/sitemap.ts` - Added `dynamic = 'force-static'`
2. ✏️ `app/robots.ts` - Added `dynamic = 'force-static'`
3. ✏️ `app/opengraph-image.tsx` - Added `dynamic = 'force-static'`
4. ✏️ `app/icon.tsx` - Added `dynamic = 'force-static'`
5. ✏️ `app/apple-icon.tsx` - Added `dynamic = 'force-static'`
6. ✏️ `app/icon-192.tsx` - Added `dynamic = 'force-static'`
7. ✏️ `app/icon-512.tsx` - Added `dynamic = 'force-static'`
8. ✏️ `app/manifest.ts` - Added `dynamic = 'force-static'`
9. ✏️ `app/marketplace/[id]/page.tsx` - Added `generateStaticParams()`
10. ✏️ `app/markdown/marketplace/[id]/page.tsx` - Added `generateStaticParams()`
11. ✏️ `app/actions.ts` - Removed `'use server'` directive

## Build Results

✅ **Build completed successfully!**

```
Route (app)                                            Size  First Load JS  Revalidate  Expire
┌ ○ /                                               11.1 kB         129 kB          1h      1y
├ ○ /_not-found                                         0 B         118 kB
├ ○ /about                                              0 B         118 kB
├ ○ /apple-icon                                         0 B            0 B
├ ○ /icon                                               0 B            0 B
├ ○ /icon.svg                                           0 B            0 B
├ ○ /manifest.webmanifest                               0 B            0 B
├ ○ /markdown                                           0 B         118 kB          1h      1y
├ ○ /markdown/about                                     0 B         118 kB          1d      1y
├ ● /markdown/marketplace/[id]                          0 B         118 kB          1h      1y
├   └ /markdown/marketplace/internal-agents-skills                                  1h      1y
├ ● /marketplace/[id]                               8.42 kB         126 kB          1h      1y
├   └ /marketplace/internal-agents-skills                                           1h      1y
├ ○ /opengraph-image                                    0 B            0 B
├ ○ /robots.txt                                         0 B            0 B
└ ○ /sitemap.xml                                        0 B            0 B
```

**Output:**

- Static files generated in `out/` directory
- Total build time: 8.71s
- 17 pages generated

## Testing Locally

To test the static site locally:

```bash
# Option 1: Use npx serve
npx serve out

# Option 2: Use Python's HTTP server
cd out
python3 -m http.server 8000
```

Then visit `http://localhost:8000` (or the port shown) to preview the site.

## Notes

- All dynamic routes are now pre-rendered at build time
- The site fetches marketplace data during the build process
- No server-side rendering or API routes are used
- Middleware still runs for security headers (GitHub Pages compatible)

## Next Steps

1. ✅ Build successful - ready to commit
2. ⏳ Commit and push changes
3. ⏳ GitHub Actions will automatically deploy to Pages
4. ⏳ Set repository and Pages visibility to "Internal"
5. ⏳ Access site at your GitHub Pages URL

---

**Build completed:** October 29, 2025
**Build command:** `yarn build`
**Build output:** `out/` directory
