# agents-and-skills Repository Setup Guide

This document outlines what needs to be configured in the `agents-and-skills` repository for it to work with the internal marketplace hub.

## Required Structure

Your `agents-and-skills` repository must have this structure:

```
agents-and-skills/
├── .claude-plugin/
│   └── marketplace.json    ← REQUIRED: Main marketplace manifest
├── plugins/                 ← Your agent/skill plugin directories
│   ├── agent-1/
│   │   └── .claude-plugin/
│   │       └── plugin.json
│   └── skill-1/
│       └── .claude-plugin/
│           └── plugin.json
└── README.md
```

## Step 1: Create the Marketplace Manifest

Create `.claude-plugin/marketplace.json` with the following content:

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
    "version": "1.0.0",
    "tags": ["internal", "agents", "skills", "proprietary"]
  },
  "plugins": []
}
```

## Step 2: Add Your Plugins

For each agent or skill in your repository, add an entry to the `plugins` array:

```json
{
  "plugins": [
    {
      "name": "example-agent",
      "source": "mikkel-sc/agents-and-skills/plugins/example-agent",
      "description": "Description of what this agent does",
      "version": "1.0.0",
      "author": "Your Team Name",
      "license": "Proprietary",
      "tags": ["agent", "automation"],
      "homepage": "https://github.com/mikkel-sc/agents-and-skills",
      "repository": "https://github.com/mikkel-sc/agents-and-skills",
      "manifestPath": "plugins/example-agent/.claude-plugin/plugin.json"
    }
  ]
}
```

## Step 3: Individual Plugin Manifests

Each plugin directory should have its own `.claude-plugin/plugin.json`:

```json
{
  "$schema": "https://anthropic.com/claude-code/plugin.schema.json",
  "name": "example-agent",
  "version": "1.0.0",
  "description": "Detailed description of the agent",
  "author": "Your Team Name",
  "license": "Proprietary",
  "main": "index.js",
  "tags": ["agent", "automation"],
  "permissions": ["read", "write", "network"],
  "dependencies": {
    "node": ">=18.0.0"
  }
}
```

## Step 4: Verify the Setup

### Test the Manifest URL

Open this URL in your browser:

```
https://raw.githubusercontent.com/mikkel-sc/agents-and-skills/main/.claude-plugin/marketplace.json
```

You should see valid JSON returned. If you get a 404 error:

- Ensure the file exists at `.claude-plugin/marketplace.json`
- Check that you're on the `main` branch (or update the URL to match your default branch)
- Verify the repository allows raw file access

### Validate JSON Format

Use a JSON validator to ensure your marketplace.json is valid:

- Copy the content of your marketplace.json
- Paste it into https://jsonlint.com/
- Fix any syntax errors

### Check Plugin References

For each plugin in your `plugins` array:

1. Verify the `source` path is correct
2. Ensure the `manifestPath` points to a valid plugin.json
3. Confirm all referenced files exist in the repository

## Step 5: Repository Settings

### Visibility

The `agents-and-skills` repository should be set to **Internal** (requires GitHub Enterprise):

1. Go to repository **Settings**
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select **Internal**

### Raw File Access

Even with an internal repository, the raw.githubusercontent.com URLs should be accessible to authenticated organization members.

## Example: Complete marketplace.json

Here's a complete example with two plugins:

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
    "version": "1.0.0",
    "tags": ["internal", "agents", "skills", "proprietary"]
  },
  "plugins": [
    {
      "name": "code-reviewer",
      "source": "mikkel-sc/agents-and-skills/plugins/code-reviewer",
      "description": "Automated code review agent for internal projects",
      "version": "1.0.0",
      "author": "Internal DevTools Team",
      "license": "Proprietary",
      "tags": ["agent", "code-review", "automation"],
      "repository": "https://github.com/mikkel-sc/agents-and-skills",
      "manifestPath": "plugins/code-reviewer/.claude-plugin/plugin.json"
    },
    {
      "name": "database-migration",
      "source": "mikkel-sc/agents-and-skills/plugins/database-migration",
      "description": "Skill for managing database migrations across environments",
      "version": "1.2.0",
      "author": "Internal DevOps Team",
      "license": "Proprietary",
      "tags": ["skill", "database", "devops"],
      "repository": "https://github.com/mikkel-sc/agents-and-skills",
      "manifestPath": "plugins/database-migration/.claude-plugin/plugin.json"
    }
  ]
}
```

## Troubleshooting

### "Cannot fetch marketplace data"

**Cause:** The marketplace.json file is not accessible or invalid.

**Solutions:**

1. Verify the file exists at `.claude-plugin/marketplace.json`
2. Check the raw URL is accessible when logged into GitHub
3. Validate JSON syntax
4. Ensure repository visibility allows organization access

### "No plugins found"

**Cause:** The `plugins` array is empty or invalid.

**Solutions:**

1. Add at least one plugin entry to the `plugins` array
2. Verify all plugin fields are correctly formatted
3. Check that referenced plugin manifests exist

### "Plugin manifest not found"

**Cause:** Individual plugin.json files are missing or incorrectly referenced.

**Solutions:**

1. Verify `manifestPath` points to existing files
2. Ensure each plugin directory has `.claude-plugin/plugin.json`
3. Check file paths are relative to repository root

## Next Steps

Once you've set up the agents-and-skills repository:

1. Commit and push your changes
2. Test the raw URL access
3. Go back to the marketplace hub and trigger a new deployment
4. Verify your plugins appear in the internal marketplace

## Reference Links

- [Claude Code Plugin Schema](https://anthropic.com/claude-code/plugin.schema.json)
- [Claude Code Marketplace Schema](https://anthropic.com/claude-code/marketplace.schema.json)
- [Claude Code Plugins Documentation](https://www.anthropic.com/news/claude-code-plugins)
