# Internal Marketplace Deployment Checklist

Use this checklist to complete the deployment of your internal Claude Code marketplace.

## ✅ Completed (Already Done)

- [x] Configure Next.js for static export (`output: 'export'`)
- [x] Remove PostHog analytics dependencies
- [x] Remove PostHog instrumentation code
- [x] Update Content Security Policy (remove PostHog domains)
- [x] Configure marketplaces.json with agents-and-skills repo
- [x] Create GitHub Actions deployment workflow
- [x] Update README with internal deployment instructions
- [x] Create agents-and-skills setup guide

## 🔧 Manual Steps Required

### 1. Set Up agents-and-skills Repository

**Status:** ⏳ Needs Verification

**Action Required:**

1. Go to `https://github.com/mikkel-sc/agents-and-skills`
2. Check if `.claude-plugin/marketplace.json` exists
3. If not, create it following: `docs/agents-and-skills-setup.md`
4. Verify the file structure matches the guide
5. Test raw URL access:
   ```
   https://raw.githubusercontent.com/mikkel-sc/agents-and-skills/main/.claude-plugin/marketplace.json
   ```

**Expected Result:** Valid JSON returned with your marketplace configuration

### 2. Set Repository Visibility to Internal

**Status:** ⏳ Action Required

**Action Required:**

1. Go to this repository's **Settings**
2. Scroll to "Danger Zone" section
3. Click "Change visibility"
4. Select **Internal** (requires GitHub Enterprise)
5. Type the repository name to confirm
6. Click "I understand, change repository visibility"

**Why:** Ensures only organization members can access the code

### 3. Set agents-and-skills Repository Visibility

**Status:** ⏳ Action Required

**Action Required:**

1. Go to `https://github.com/mikkel-sc/agents-and-skills` → **Settings**
2. Repeat the same visibility change to **Internal**

**Why:** Ensures marketplace data is only accessible to organization members

### 4. Install Dependencies

**Status:** ⏳ Action Required

**Action Required:**

```bash
cd /Users/mikkelbergmann/projects/claude-code-marketplace
yarn install
```

**Why:** Removes PostHog packages and ensures clean dependency tree

### 5. Test Local Build

**Status:** ⏳ Recommended

**Action Required:**

```bash
yarn build
```

**Expected Result:**

- Build completes successfully
- Creates `out/` directory with static files
- No errors about PostHog or dynamic features

**If Build Fails:**

- Check error messages in terminal
- Verify all server-side features are removed
- Ensure no dynamic routes or API routes exist

### 6. Commit and Push Changes

**Status:** ⏳ Action Required

**Action Required:**

```bash
git add .
git commit -m "Configure for internal static deployment

- Add static export configuration
- Remove PostHog analytics
- Configure internal marketplace (agents-and-skills)
- Add GitHub Actions deployment workflow
- Update documentation for internal use"

git push origin main
```

**Why:** Triggers the automated deployment workflow

### 7. Enable GitHub Pages

**Status:** ⏳ Action Required

**Action Required:**

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
3. Save the configuration

**Why:** Enables the deployment target for the workflow

### 8. Monitor First Deployment

**Status:** ⏳ Action Required

**Action Required:**

1. Go to **Actions** tab
2. Watch "Deploy Next.js site to Pages" workflow
3. Wait for it to complete (~2-3 minutes)
4. Check for any errors

**Expected Result:**

- Build job completes successfully
- Deploy job completes successfully
- Green checkmarks on both jobs

**If Deployment Fails:**

- Click on the failed job to see error details
- Common issues:
  - Pages not enabled (see Step 7)
  - Permission issues (check workflow permissions)
  - Build errors (see Step 5)

### 9. Set GitHub Pages Visibility to Internal

**Status:** ⏳ Action Required (After First Deployment)

**Action Required:**

1. After first successful deployment, go back to **Settings** → **Pages**
2. A new **Visibility** dropdown will appear
3. Change from "Public" to **Internal**
4. Confirm the change

**Why:** Ensures the deployed site requires authentication and organization membership

### 10. Access and Verify the Site

**Status:** ⏳ Action Required

**Action Required:**

1. Copy the GitHub Pages URL from **Settings** → **Pages**
   - Format: `https://[org-name].github.io/claude-code-marketplace/`
2. Open the URL in your browser
3. Sign in with your GitHub organization account if prompted
4. Verify:
   - Site loads correctly
   - "Internal Agents & Skills" marketplace appears
   - Clicking the marketplace shows plugin details

**Expected Result:**

- Site loads with no errors
- Marketplace card is visible
- Theme toggle works
- Search functionality works

### 11. Test Marketplace Data Loading

**Status:** ⏳ Action Required

**Action Required:**

1. Click on "Internal Agents & Skills" card
2. Verify plugins are displayed
3. Check that plugin information is correct
4. Test any plugin installation instructions

**Expected Result:**

- Marketplace detail page loads
- Plugins are listed with correct information
- No "Failed to load" errors

**If No Plugins Show:**

- Verify agents-and-skills marketplace.json has plugins array populated
- Check browser console for errors
- Verify raw GitHub URL is accessible

## 📝 Post-Deployment

### Document the Site URL

**Action Required:**

1. Update your team documentation with the Pages URL
2. Share access instructions with team members
3. Add URL to internal wiki/documentation

### Set Up Monitoring (Optional)

**Action Required:**

1. Star the repository to get notifications
2. Enable email notifications for workflow failures
3. Create a team responsible for maintaining the marketplace

### Plan Content Updates

**Action Required:**

1. Schedule regular reviews of plugin listings
2. Establish process for adding new marketplaces
3. Document contribution guidelines for team members

## 🔄 Future Updates

To update the marketplace content:

1. Edit `.claude-plugin/marketplaces.json` to add/remove marketplaces
2. Commit and push changes
3. GitHub Actions automatically rebuilds and deploys
4. Changes live in ~2-3 minutes

To update plugins in agents-and-skills:

1. Edit agents-and-skills repository
2. Update `.claude-plugin/marketplace.json` with new plugins
3. Commit and push changes
4. Trigger a rebuild of this marketplace site (push any change or manual workflow run)

## ❓ Need Help?

- **Build Issues:** See `README.md` → Troubleshooting section
- **agents-and-skills Setup:** See `docs/agents-and-skills-setup.md`
- **GitHub Pages:** See [GitHub Pages Docs](https://docs.github.com/en/pages)
- **Workflow Issues:** Check `.github/workflows/deploy.yml` and GitHub Actions logs

## 📊 Status Summary

**Overall Progress:** 8/11 automated tasks completed

**Next Action:** Run `yarn install` then commit and push changes

**Estimated Time to Complete:** 15-20 minutes (mostly waiting for deployment)

---

**Last Updated:** 2025-10-28
