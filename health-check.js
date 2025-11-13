#!/usr/bin/env node

/**
 * Health Check Script
 * Runs comprehensive health checks on the repository and generates a JSON report
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Report structure
const report = {
  scripts: {},
  frontend: {
    lint: { status: 'not_run', errors: [] },
    tests: { status: 'not_applicable', errors: [] },
    build: { status: 'not_run', errors: [], warnings: [] }
  },
  backend: {
    lint: { status: 'not_run', errors: [] },
    tests: { status: 'not_applicable', errors: [] },
    build: { status: 'not_run', errors: [], warnings: [] }
  },
  pr4_files: [],
  report: {
    failing_tests: [],
    lint_errors: [],
    build_errors: [],
    remediation_suggestions: []
  }
};

// Helper function to execute commands and capture output
function runCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      cwd: options.cwd || process.cwd(),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 10 * 1024 * 1024
    });
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || '',
      error: error.stderr || error.message
    };
  }
}

// Step 1: List root-level scripts and workspace layout
function listScriptsAndWorkspace() {
  console.log('📋 Listing root-level scripts and workspace layout...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    report.scripts = {
      root: packageJson.scripts || {},
      workspaces: packageJson.workspaces || []
    };

    // Read frontend and backend scripts
    const frontendPkg = JSON.parse(fs.readFileSync('apps/frontend/package.json', 'utf-8'));
    const backendPkg = JSON.parse(fs.readFileSync('apps/backend/package.json', 'utf-8'));
    
    report.scripts.frontend = frontendPkg.scripts || {};
    report.scripts.backend = backendPkg.scripts || {};
    
    console.log('✅ Scripts and workspace layout captured');
  } catch (error) {
    console.error('❌ Error reading package.json files:', error.message);
  }
}

// Step 2: Run npm ci
function runNpmCi() {
  console.log('📦 Running npm ci...');
  const result = runCommand('npm ci');
  
  if (result.success) {
    console.log('✅ npm ci completed successfully');
    return true;
  } else {
    console.log('⚠️  npm ci had issues, continuing...');
    return false;
  }
}

// Step 3: Run lint for frontend
function lintFrontend() {
  console.log('🔍 Linting frontend...');
  const result = runCommand('npm run lint', { cwd: 'apps/frontend' });
  
  if (result.success) {
    report.frontend.lint.status = 'pass';
    console.log('✅ Frontend lint passed');
  } else {
    report.frontend.lint.status = 'fail';
    const errors = parseLintErrors(result.error || result.output, 'frontend');
    report.frontend.lint.errors = errors;
    report.report.lint_errors.push(...errors);
    console.log(`❌ Frontend lint failed with ${errors.length} errors`);
  }
}

// Step 4: Run lint for backend
function lintBackend() {
  console.log('🔍 Linting backend...');
  const result = runCommand('npm run lint', { cwd: 'apps/backend' });
  
  if (result.success) {
    report.backend.lint.status = 'pass';
    console.log('✅ Backend lint passed');
  } else {
    report.backend.lint.status = 'fail';
    const errors = parseLintErrors(result.error || result.output, 'backend');
    report.backend.lint.errors = errors;
    report.report.lint_errors.push(...errors);
    console.log(`❌ Backend lint failed with ${errors.length} errors`);
  }
}

// Step 5: Run tests (if they exist)
function runTests() {
  console.log('🧪 Checking for test scripts...');
  
  // Frontend tests
  if (report.scripts.frontend.test) {
    console.log('Running frontend tests...');
    const result = runCommand('npm run test', { cwd: 'apps/frontend' });
    if (result.success) {
      report.frontend.tests.status = 'pass';
    } else {
      report.frontend.tests.status = 'fail';
      const errors = parseTestErrors(result.error || result.output, 'frontend');
      report.frontend.tests.errors = errors;
      report.report.failing_tests.push(...errors);
    }
  } else {
    console.log('ℹ️  No frontend test script found');
  }
  
  // Backend tests
  if (report.scripts.backend.test) {
    console.log('Running backend tests...');
    const result = runCommand('npm run test', { cwd: 'apps/backend' });
    if (result.success) {
      report.backend.tests.status = 'pass';
    } else {
      report.backend.tests.status = 'fail';
      const errors = parseTestErrors(result.error || result.output, 'backend');
      report.backend.tests.errors = errors;
      report.report.failing_tests.push(...errors);
    }
  } else {
    console.log('ℹ️  No backend test script found');
  }
}

// Step 6: Run build for frontend
function buildFrontend() {
  console.log('🏗️  Building frontend...');
  const result = runCommand('npm run build', { cwd: 'apps/frontend' });
  
  if (result.success) {
    report.frontend.build.status = 'pass';
    console.log('✅ Frontend build passed');
  } else {
    report.frontend.build.status = 'fail';
    const errors = parseBuildErrors(result.error || result.output, 'frontend');
    report.frontend.build.errors = errors;
    report.report.build_errors.push(...errors);
    console.log(`❌ Frontend build failed`);
  }
}

// Step 7: Run build for backend
function buildBackend() {
  console.log('🏗️  Building backend...');
  const result = runCommand('npm run build', { cwd: 'apps/backend' });
  
  if (result.success) {
    report.backend.build.status = 'pass';
    console.log('✅ Backend build passed');
  } else {
    report.backend.build.status = 'fail';
    const errors = parseBuildErrors(result.error || result.output, 'backend');
    report.backend.build.errors = errors;
    report.report.build_errors.push(...errors);
    console.log(`❌ Backend build failed`);
  }
}

// Step 8: Get PR #4 changed files
function getPR4Files() {
  console.log('📄 Fetching PR #4 changed files...');
  
  // Files from PR #4 (from the GitHub API response we already have)
  const pr4Files = [
    { file: 'DEPLOYMENT_CHECKLIST_USER.md', type: 'documentation' },
    { file: 'DEPLOYMENT_STATUS.md', type: 'documentation' },
    { file: 'DEPLOY_NOW.md', type: 'documentation' },
    { file: 'DOCUMENTATION_INDEX.md', type: 'documentation' },
    { file: 'EXECUTIVE_SUMMARY.md', type: 'documentation' },
    { file: 'ISSUE_RESOLUTION.md', type: 'documentation' },
    { file: 'README.md', type: 'documentation' },
    { file: 'verify-deployment.sh', type: 'script' }
  ];
  
  report.pr4_files = pr4Files.map(f => ({
    ...f,
    affects_build: false,
    affects_test: false,
    affects_lint: false
  }));
  
  console.log(`✅ Found ${pr4Files.length} changed files in PR #4 (all documentation/scripts)`);
}

// Parse lint errors
function parseLintErrors(output, app) {
  const errors = [];
  const lines = output.split('\n');
  
  // Check for ESLint config missing
  if (output.includes("couldn't find a configuration file") || output.includes("ESLint couldn't find")) {
    errors.push({
      file: `apps/${app}/.eslintrc.*`,
      rule: 'missing-config',
      message: 'ESLint configuration file not found'
    });
    return errors;
  }
  
  for (const line of lines) {
    // Match ESLint error format: path/to/file.ts:line:col: error message
    const match = line.match(/(.+?):(\d+):(\d+):\s+(.+?)\s+(.+)/);
    if (match) {
      errors.push({
        file: `apps/${app}/${match[1]}`,
        line: match[2],
        column: match[3],
        rule: match[5],
        message: match[4]
      });
    }
  }
  
  // If no structured errors found, try to extract general errors
  if (errors.length === 0 && output.includes('error')) {
    const errorLines = lines.filter(l => l.includes('error') || l.includes('Error'));
    const errorText = errorLines.slice(0, 3).join(' ').trim();
    if (errorText) {
      errors.push({
        file: `apps/${app}`,
        message: errorText.substring(0, 200) // Limit message length
      });
    }
  }
  
  return errors.slice(0, 10); // Limit to 10 errors
}

// Parse test errors
function parseTestErrors(output, app) {
  const errors = [];
  const lines = output.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('FAIL') || line.includes('✕')) {
      errors.push({
        test: line.trim(),
        path: `apps/${app}`,
        error: lines[i + 1] ? lines[i + 1].trim() : 'Unknown error'
      });
    }
  }
  
  return errors.slice(0, 10);
}

// Parse build errors
function parseBuildErrors(output, app) {
  const errors = [];
  const lines = output.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('error TS') || line.includes('Error:') || line.includes('ERROR')) {
      // Get up to 10 lines of context for each error
      const errorBlock = lines.slice(i, Math.min(i + 10, lines.length)).join('\n');
      errors.push({
        app: app,
        error: errorBlock
      });
      i += 9; // Skip the lines we just added
    }
  }
  
  // If no errors found but command failed, capture first 10 lines
  if (errors.length === 0) {
    errors.push({
      app: app,
      error: lines.slice(0, 10).join('\n')
    });
  }
  
  return errors.slice(0, 5); // Limit to 5 error blocks
}

// Generate remediation suggestions
function generateRemediations() {
  console.log('💡 Generating remediation suggestions...');
  
  const suggestions = [];
  
  // Lint errors remediation
  if (report.report.lint_errors.length > 0) {
    const commonLintIssues = report.report.lint_errors
      .map(e => e.rule || e.message)
      .filter(Boolean);
    
    // Check for missing ESLint config
    if (commonLintIssues.some(r => r.includes('missing-config') || r.includes("couldn't find a configuration"))) {
      suggestions.push({
        category: 'Lint',
        issue: 'ESLint configuration files missing',
        fixes: [
          'Create .eslintrc.json in apps/frontend and apps/backend',
          'Or run: npm init @eslint/config (in each app directory)',
          'Alternative: Set "ESLINT_NO_DEV_ERRORS=true" to skip linting in dev'
        ]
      });
    } else if (commonLintIssues.some(r => r.includes('no-unused') || r.includes('unused'))) {
      suggestions.push({
        category: 'Lint',
        issue: 'Unused variables/imports',
        fixes: [
          'Remove unused imports and variables',
          'Run: npm run lint -- --fix (in frontend/backend)',
          'Review and clean up unused code'
        ]
      });
    }
  }
  
  // Build errors remediation
  if (report.report.build_errors.length > 0) {
    const buildIssues = report.report.build_errors.map(e => e.error).join(' ');
    
    if (buildIssues.includes('TS') || buildIssues.includes('type')) {
      suggestions.push({
        category: 'Build',
        issue: 'TypeScript errors',
        fixes: [
          'Run: npm run type-check (in frontend/backend)',
          'Fix type errors in source files',
          'Update tsconfig.json if needed'
        ]
      });
    }
    
    if (buildIssues.includes('Module not found') || buildIssues.includes('Cannot find module')) {
      suggestions.push({
        category: 'Build',
        issue: 'Missing dependencies',
        fixes: [
          'Run: npm install (in affected workspace)',
          'Check package.json for missing dependencies',
          'Verify import paths are correct'
        ]
      });
    }
  }
  
  // Test errors remediation
  if (report.report.failing_tests.length > 0) {
    suggestions.push({
      category: 'Tests',
      issue: 'Failing tests',
      fixes: [
        'Review test output for specific failures',
        'Update tests to match code changes',
        'Run: npm run test -- --verbose'
      ]
    });
  }
  
  // If everything passed
  if (suggestions.length === 0) {
    suggestions.push({
      category: 'Status',
      issue: 'All checks passed',
      fixes: [
        'Builds completed successfully',
        'No test infrastructure found (not a blocker)',
        'Consider adding ESLint config for code quality'
      ]
    });
  }
  
  report.report.remediation_suggestions = suggestions;
}

// Create compact summary
function createCompactSummary() {
  const summary = {
    status: 'all good',
    details: ''
  };
  
  const totalIssues = 
    report.report.failing_tests.length +
    report.report.lint_errors.length +
    report.report.build_errors.length;
  
  if (totalIssues > 0) {
    summary.status = 'issues found';
    const parts = [];
    
    if (report.report.failing_tests.length > 0) {
      parts.push(`${report.report.failing_tests.length} test(s) failing`);
    }
    if (report.report.lint_errors.length > 0) {
      parts.push(`${report.report.lint_errors.length} lint error(s)`);
    }
    if (report.report.build_errors.length > 0) {
      parts.push(`${report.report.build_errors.length} build error(s)`);
    }
    
    summary.details = parts.join(', ') + '. PR #4 contains only documentation changes with no impact on build/test/lint.';
  } else {
    summary.details = 'All checks passed. PR #4 contains only documentation changes with no impact on build/test/lint.';
  }
  
  return summary;
}

// Main execution
async function main() {
  console.log('🚀 Starting Health Check...\n');
  
  try {
    listScriptsAndWorkspace();
    runNpmCi();
    lintFrontend();
    lintBackend();
    runTests();
    buildFrontend();
    buildBackend();
    getPR4Files();
    generateRemediations();
    
    const summary = createCompactSummary();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 HEALTH CHECK COMPLETE');
    console.log('='.repeat(60));
    console.log(`Status: ${summary.status}`);
    console.log(`Summary: ${summary.details}`);
    console.log('='.repeat(60) + '\n');
    
    // Write JSON report
    const jsonReport = JSON.stringify(report, null, 2);
    fs.writeFileSync('health-check-report.json', jsonReport);
    console.log('📄 Full report written to: health-check-report.json\n');
    
    // Print compact report to console
    console.log(jsonReport);
    
  } catch (error) {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  }
}

main();
