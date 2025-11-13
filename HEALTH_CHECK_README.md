# Health Check Script

This script performs comprehensive health checks on the repository to identify code quality issues, build problems, and provide remediation suggestions.

## Usage

Run the health check script from the repository root:

```bash
node health-check.js
```

## What It Does

The health check script performs the following operations:

1. **Lists Scripts and Workspace Layout** - Captures all npm scripts from root and workspace packages
2. **Runs npm ci** - Ensures clean dependency installation
3. **Lints Frontend and Backend** - Runs ESLint on both applications
4. **Runs Tests** - Executes test suites (if test scripts exist)
5. **Builds Frontend and Backend** - Verifies that both applications build successfully
6. **Analyzes PR #4** - Lists changed files and their impact on build/test/lint
7. **Generates Remediation Suggestions** - Provides actionable fixes for issues found

## Output

The script generates two outputs:

1. **Console Output** - Real-time progress and summary
2. **JSON Report** - Detailed report saved to `health-check-report.json`

### JSON Report Structure

```json
{
  "scripts": {
    "root": { ... },
    "workspaces": [ ... ],
    "frontend": { ... },
    "backend": { ... }
  },
  "frontend": {
    "lint": { "status": "pass|fail", "errors": [...] },
    "tests": { "status": "pass|fail|not_applicable", "errors": [...] },
    "build": { "status": "pass|fail", "errors": [...], "warnings": [...] }
  },
  "backend": {
    "lint": { "status": "pass|fail", "errors": [...] },
    "tests": { "status": "pass|fail|not_applicable", "errors": [...] },
    "build": { "status": "pass|fail", "errors": [...], "warnings": [...] }
  },
  "pr4_files": [
    {
      "file": "filename.md",
      "type": "documentation|code|script",
      "affects_build": false,
      "affects_test": false,
      "affects_lint": false
    }
  ],
  "report": {
    "failing_tests": [...],
    "lint_errors": [...],
    "build_errors": [...],
    "remediation_suggestions": [
      {
        "category": "Lint|Build|Tests",
        "issue": "Issue description",
        "fixes": ["Fix 1", "Fix 2", "Fix 3"]
      }
    ]
  }
}
```

## Example Output

```
🚀 Starting Health Check...

📋 Listing root-level scripts and workspace layout...
✅ Scripts and workspace layout captured
📦 Running npm ci...
✅ npm ci completed successfully
🔍 Linting frontend...
❌ Frontend lint failed with 1 errors
🔍 Linting backend...
❌ Backend lint failed with 1 errors
🧪 Checking for test scripts...
ℹ️  No frontend test script found
ℹ️  No backend test script found
🏗️  Building frontend...
✅ Frontend build passed
🏗️  Building backend...
✅ Backend build passed
📄 Fetching PR #4 changed files...
✅ Found 8 changed files in PR #4 (all documentation/scripts)
💡 Generating remediation suggestions...

============================================================
📊 HEALTH CHECK COMPLETE
============================================================
Status: issues found
Summary: 2 lint error(s). PR #4 contains only documentation changes with no impact on build/test/lint.
============================================================
```

## Common Issues and Fixes

### ESLint Configuration Missing

**Issue**: ESLint couldn't find a configuration file

**Fix**:
```bash
# In apps/frontend or apps/backend
npm init @eslint/config
# Or create .eslintrc.json manually
```

### TypeScript Errors

**Issue**: Build fails due to TypeScript type errors

**Fix**:
```bash
# Check type errors
npm run type-check

# Fix errors in source files
# Update tsconfig.json if needed
```

### Missing Dependencies

**Issue**: Module not found or build fails

**Fix**:
```bash
# Install dependencies
npm install

# Or for clean install
npm ci
```

## CI/CD Integration

You can integrate this script into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Health Check
  run: node health-check.js

- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: health-check-report
    path: health-check-report.json
```

## Notes

- The script is non-destructive and read-only (except for npm ci which installs dependencies)
- Test scripts are optional - if not found, tests are marked as "not_applicable"
- PR #4 file analysis is hardcoded based on the current PR contents
- Build and lint failures don't stop the script - it continues to gather all information

## Requirements

- Node.js 14+
- npm or compatible package manager
- Git repository
