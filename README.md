# Internal Claude Code Marketplace Hub

An internal marketplace hub for discovering organization-specific Claude Code plugins and tools specifically fro SafetyCulture.
This static site is deployed to GitHub Pages with internal visibility.

**Internal Site URL:** `https://[your-org].github.io/claude-code-marketplace/`

## 🔒 Internal Access Only

This marketplace is configured for internal use only. Access requires:

- Organization membership
- GitHub authentication
- Repository and Pages visibility set to "Internal"

## 🚀 Quick Start

The site is automatically deployed via GitHub Actions whenever changes are pushed to the `main` branch.

### Accessing the Marketplace

1. Ensure you're signed into GitHub with your organization account
2. Visit the GitHub Pages URL (shown after first deployment)
3. Browse available internal plugins and tools

## 📋 Deployment Setup

If this is your first deployment, follow these steps:

### Step 1: Repository Visibility

1. Go to repository **Settings**
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select **Internal** (requires GitHub Enterprise)
5. Confirm the change

### Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
3. After the first workflow runs, a **Visibility** option will appear
4. Set visibility to **Internal**
5. Note the site URL that appears

### Step 3: Trigger First Deployment

The GitHub Actions workflow is already configured. To deploy:

```bash
git push origin main
```

Or manually trigger from the **Actions** tab:

1. Go to **Actions**
2. Select "Deploy Next.js site to Pages"
3. Click "Run workflow"

### Step 4: Verify Deployment

1. Go to the **Actions** tab
2. Watch the workflow run (takes ~2-3 minutes)
3. Once completed, visit your Pages URL
4. Confirm the site loads and shows your internal marketplace

## 🏗️ Architecture

This is a **static Next.js site** exported to pure HTML/CSS/JS:

- No server-side rendering
- No API routes
- All content pre-rendered at build time
- Marketplace data fetched at build time from configured repositories

### Technology Stack

- **Framework:** Next.js 15 (static export)
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages via GitHub Actions
- **Package Manager:** Yarn

## 🔧 Managing Marketplaces

### Current Marketplaces

The site currently displays plugins from:

- **Internal Agents & Skills** - `mikkel-sc/agents-and-skills`

### Adding a New Internal Marketplace

To add another internal marketplace:

1. **Create the marketplace repository** with this structure:

```
my-internal-marketplace/
├── .claude-plugin/
│   └── marketplace.json
└── README.md
```

2. **Create `.claude-plugin/marketplace.json`** in your new repo:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "my-internal-marketplace",
  "owner": {
    "name": "Your Team Name",
    "url": "https://github.com/your-org"
  },
  "metadata": {
    "description": "Internal tools for [specific purpose]",
    "version": "1.0.0"
  },
  "plugins": [
    {
      "name": "example-plugin",
      "source": "your-org/plugin-repo",
      "description": "Plugin description",
      "version": "1.0.0",
      "author": "Your Team",
      "license": "Proprietary",
      "tags": ["internal", "tools"]
    }
  ]
}
```

3. **Edit `.claude-plugin/marketplaces.json`** in this repo and add your marketplace:

```json
{
  "id": "my-internal-tools",
  "name": "My Internal Tools",
  "description": "Specialized tools for our team",
  "owner": {
    "name": "Your Team",
    "url": "https://github.com/your-org"
  },
  "repository": "https://github.com/your-org/my-internal-marketplace",
  "manifestUrl": "https://raw.githubusercontent.com/your-org/my-internal-marketplace/main/.claude-plugin/marketplace.json",
  "tags": ["internal", "proprietary"],
  "homepage": "https://github.com/your-org/my-internal-marketplace",
  "verified": true,
  "addedAt": "2025-10-28"
}
```

4. **Commit and push** - The site will automatically rebuild and deploy

### Marketplace Entry Fields

| Field         | Required | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| `id`          | Yes      | Unique identifier (lowercase, hyphens only) |
| `name`        | Yes      | Display name for your marketplace           |
| `description` | Yes      | Brief description (1-2 sentences)           |
| `owner.name`  | Yes      | Marketplace owner/maintainer name           |
| `owner.url`   | No       | Link to owner's profile/team page           |
| `repository`  | Yes      | GitHub repository URL (must be internal)    |
| `manifestUrl` | Yes      | Raw GitHub URL to marketplace.json          |
| `tags`        | No       | Array of relevant tags/categories           |
| `homepage`    | No       | Marketplace website/docs (if any)           |
| `verified`    | Yes      | Set to true for internal marketplaces       |
| `addedAt`     | Yes      | Date added in YYYY-MM-DD format             |

## 🛠️ Local Development

### Prerequisites

- Node.js 20+ and Yarn installed
- Run `yarn install` to install dependencies

### Development Workflow

Since this is a **static site**, there are two ways to develop locally:

#### Option 1: Preview Production Build (Recommended)

This simulates exactly how the site will work on GitHub Pages:

```bash
# 1. Build the static site
yarn build

# 2. Serve the static files
yarn dev
```

The `dev` script will:

- Kill any process on port 3000
- Serve the pre-built `out/` directory using `serve`
- Visit `http://localhost:3000` to see the site

**Note:** After making changes, you need to run `yarn build` again and restart `yarn dev`.

#### Option 2: Next.js Development Server (For Active Development)

For faster iteration during development, you can use the Next.js dev server:

```bash
# Temporarily change the dev script in package.json back to:
# "dev": "next dev --turbopack"

yarn dev
```

Visit `http://localhost:3000` to see the site with hot-reload enabled.

**Important:** Remember to test with `yarn build` before deploying to ensure static export works correctly.

### Testing the Static Build

To verify the build will work on GitHub Pages:

```bash
# Build the static site
yarn build

# Serve it locally (multiple options)
npx serve out              # Option 1: Using serve
cd out && python3 -m http.server 8000   # Option 2: Python server
```

### Build Output

The build generates:

- Static HTML/CSS/JS files in the `out/` directory
- All pages pre-rendered at build time
- No server-side code (fully static)
- Ready for deployment to GitHub Pages

### Project Structure

```
.claude-plugin/
  └── marketplaces.json      # Marketplace listings (edit this)
.github/
  └── workflows/
      └── deploy.yml         # Automated deployment
app/
  ├── page.tsx              # Homepage (marketplace grid)
  ├── marketplace/[id]/     # Marketplace detail pages
  └── about/                # About page
components/
  ├── MarketplaceCard.tsx   # Marketplace display card
  ├── PluginCard.tsx        # Plugin display card
  └── SearchBar.tsx         # Search functionality
lib/
  └── github.ts             # GitHub API utilities
types/
  ├── marketplace.ts        # Marketplace types
  └── plugin.ts            # Plugin types
next.config.ts             # Next.js config (static export)
```

## 📝 Verifying agents-and-skills Repository

The `agents-and-skills` repository needs the following structure to work properly:

### Required Structure

```
agents-and-skills/
├── .claude-plugin/
│   └── marketplace.json    # REQUIRED: Marketplace manifest
├── plugins/                # Your plugin directories
└── README.md
```

### Required marketplace.json Format

The file at `.claude-plugin/marketplace.json` should follow this structure:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "internal-agents-skills",
  "owner": {
    "name": "mikkel-sc",
    "url": "https://github.com/mikkel-sc"
  },
  "metadata": {
    "description": "Custom agents and skills for internal use",
    "version": "1.0.0"
  },
  "plugins": [
    {
      "name": "your-agent-name",
      "source": "mikkel-sc/agents-and-skills",
      "description": "Agent description",
      "version": "1.0.0",
      "author": "Your Team",
      "license": "Proprietary",
      "tags": ["agents", "internal"]
    }
  ]
}
```

### Validation Steps

1. Navigate to your `agents-and-skills` repository
2. Ensure `.claude-plugin/marketplace.json` exists
3. Verify the JSON is valid (use a JSON validator)
4. Test the raw URL directly:
   ```
   https://raw.githubusercontent.com/mikkel-sc/agents-and-skills/main/.claude-plugin/marketplace.json
   ```
5. The URL should return valid JSON when accessed

## 🔄 How Updates Work

1. **Update marketplace listings:** Edit `.claude-plugin/marketplaces.json`
2. **Commit and push:** `git push origin main`
3. **Automatic deployment:** GitHub Actions builds and deploys automatically
4. **Live in ~2-3 minutes:** Changes appear at your GitHub Pages URL

## ✅ Static Hosting Verification

This project is **fully compatible with static hosting** (GitHub Pages, Netlify, Vercel, etc.). Here's what makes it work:

### Static Export Configuration ✅

- ✅ `output: 'export'` enabled in `next.config.ts`
- ✅ `images.unoptimized: true` for static image handling
- ✅ All dynamic routes have `generateStaticParams()`
- ✅ No server actions (removed `'use server'`)
- ✅ No API routes
- ✅ Build generates pure HTML/CSS/JS in `out/` directory

### What Works on Static Hosting ✅

- ✅ All pages pre-rendered at build time
- ✅ Client-side navigation (React Router)
- ✅ Search functionality (client-side filtering)
- ✅ Theme switching (localStorage)
- ✅ External data fetching at build time
- ✅ All Next.js App Router features compatible with static export

### What Doesn't Work (But Isn't Needed) ⚠️

- ⚠️ **Middleware Security Headers:** The `middleware.ts` file won't execute on GitHub Pages (requires Node.js server). However:
  - GitHub Pages provides its own security headers
  - The site functions perfectly without middleware
  - Security headers can be added via GitHub Pages configuration if needed
- ⚠️ **Server-side rendering:** Not needed (everything is pre-rendered)
- ⚠️ **API routes:** Not supported (all data fetched at build time)

### Testing Static Hosting Locally

To verify the site works exactly as it will on GitHub Pages:

```bash
# Build the static site
yarn build

# Serve it (simulates static hosting)
yarn dev

# OR use any static server
npx serve out
cd out && python3 -m http.server 8000
```

If it works locally with one of these static servers, it will work on GitHub Pages! ✅

## 🐛 Troubleshooting

### Build Fails

- Check the **Actions** tab for error details
- Verify all `manifestUrl` values are accessible
- Ensure `next.config.ts` has `output: 'export'`
- Check that all dynamic routes have `generateStaticParams()`
- Remove any `'use server'` directives

### Marketplace Not Showing

- Verify the `manifestUrl` is publicly accessible (even if repo is internal)
- Check the marketplace.json format matches the schema
- Review build logs in GitHub Actions

### Images Not Loading

- Ensure `images.unoptimized: true` is set in `next.config.ts`
- Check image URLs are HTTPS
- Verify CSP headers allow the image domain

### Site Not Accessible

- Confirm Pages visibility is set to "Internal"
- Verify you're signed into GitHub
- Check your organization membership
- Ensure repository visibility is "Internal"

### Local Development Issues

- If `yarn dev` fails, ensure you've run `yarn build` first
- If port 3000 is in use, the dev script will attempt to kill the process
- For active development with hot-reload, temporarily use `next dev --turbopack`

## 📚 Additional Resources

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Workflows](https://docs.github.com/en/actions)
- [Claude Code Plugins Documentation](https://www.anthropic.com/news/claude-code-plugins)

## 🤝 Contributing

To contribute improvements:

1. Create a feature branch
2. Make your changes
3. Test locally with `yarn build`
4. Submit a pull request

## 📄 License

MIT (for internal use)

---

**Note:** This is an internal tool. Marketplace content, plugins, and tools are proprietary to the organization.
