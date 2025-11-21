import fs from 'fs';
import path from 'path';

// Directories to search
const searchDirs = ['src', 'app'];

// Track statistics
let stats = {
  jsFilesFound: 0,
  jsxFilesFound: 0,
  jsFilesRemoved: 0,
  jsxFilesRemoved: 0,
  jsFilesKept: 0,
  jsxFilesKept: 0
};

/**
 * Recursively find all .js and .jsx files in a directory
 */
function findJsFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and other common directories
      if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(file)) {
        findJsFiles(filePath, fileList);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check if a TypeScript equivalent exists for a JS file
 */
function hasTypeScriptEquivalent(jsFilePath) {
  const isJsx = jsFilePath.endsWith('.jsx');
  const basePath = jsFilePath.slice(0, isJsx ? -4 : -3);
  
  // Check for .ts equivalent
  const tsPath = basePath + '.ts';
  if (fs.existsSync(tsPath)) {
    return { exists: true, path: tsPath };
  }
  
  // Check for .tsx equivalent
  const tsxPath = basePath + '.tsx';
  if (fs.existsSync(tsxPath)) {
    return { exists: true, path: tsxPath };
  }
  
  return { exists: false };
}

/**
 * Main cleanup function
 */
function cleanupJsFiles(dryRun = true) {
  console.log('🔍 Scanning for JavaScript files...\n');

  let allJsFiles = [];
  
  // Find all JS files in specified directories
  searchDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const files = findJsFiles(dirPath);
      allJsFiles = allJsFiles.concat(files);
      console.log(`Found ${files.length} JS/JSX files in ${dir}/`);
    } else {
      console.log(`⚠️  Directory ${dir}/ not found, skipping...`);
    }
  });

  console.log(`\n📊 Total JS/JSX files found: ${allJsFiles.length}\n`);

  if (allJsFiles.length === 0) {
    console.log('✅ No JavaScript files to clean up!');
    return;
  }

  const filesToRemove = [];
  const filesToKeep = [];

  // Check each JS file
  allJsFiles.forEach(jsFile => {
    const isJsx = jsFile.endsWith('.jsx');
    
    if (isJsx) {
      stats.jsxFilesFound++;
    } else {
      stats.jsFilesFound++;
    }

    const tsEquivalent = hasTypeScriptEquivalent(jsFile);
    
    if (tsEquivalent.exists) {
      filesToRemove.push({ js: jsFile, ts: tsEquivalent.path });
    } else {
      filesToKeep.push(jsFile);
    }
  });

  // Display results
  console.log('📋 ANALYSIS RESULTS:\n');
  console.log(`✅ Files to KEEP (no TS equivalent): ${filesToKeep.length}`);
  if (filesToKeep.length > 0) {
    filesToKeep.forEach(file => {
      const relativePath = path.relative(process.cwd(), file);
      console.log(`   - ${relativePath}`);
    });
  }

  console.log(`\n🗑️  Files to REMOVE (TS equivalent exists): ${filesToRemove.length}`);
  if (filesToRemove.length > 0) {
    filesToRemove.forEach(({ js, ts }) => {
      const relativeJs = path.relative(process.cwd(), js);
      const relativeTs = path.relative(process.cwd(), ts);
      console.log(`   - ${relativeJs} → ${relativeTs} exists`);
    });
  }

  // Remove files if not dry run
  if (!dryRun && filesToRemove.length > 0) {
    console.log('\n🔥 REMOVING FILES...\n');
    
    filesToRemove.forEach(({ js }) => {
      try {
        fs.unlinkSync(js);
        const isJsx = js.endsWith('.jsx');
        
        if (isJsx) {
          stats.jsxFilesRemoved++;
        } else {
          stats.jsFilesRemoved++;
        }
        
        const relativePath = path.relative(process.cwd(), js);
        console.log(`   ✓ Removed: ${relativePath}`);
      } catch (error) {
        console.error(`   ✗ Error removing ${js}: ${error.message}`);
      }
    });

    stats.jsFilesKept = filesToKeep.filter(f => f.endsWith('.js')).length;
    stats.jsxFilesKept = filesToKeep.filter(f => f.endsWith('.jsx')).length;

    console.log('\n📊 FINAL STATISTICS:');
    console.log(`   .js files found: ${stats.jsFilesFound}`);
    console.log(`   .js files removed: ${stats.jsFilesRemoved}`);
    console.log(`   .js files kept: ${stats.jsFilesKept}`);
    console.log(`   .jsx files found: ${stats.jsxFilesFound}`);
    console.log(`   .jsx files removed: ${stats.jsxFilesRemoved}`);
    console.log(`   .jsx files kept: ${stats.jsxFilesKept}`);
    console.log('\n✅ Cleanup complete!');
  } else if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files were actually removed');
    console.log('   Run with --execute flag to actually remove files');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = !args.includes('--execute');

if (isDryRun) {
  console.log('========================================');
  console.log('   DRY RUN MODE');
  console.log('========================================\n');
}

cleanupJsFiles(isDryRun);
