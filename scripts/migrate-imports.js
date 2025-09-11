#!/usr/bin/env node

/**
 * Migration script to update import paths for the new N-layer architecture
 * Run with: node scripts/migrate-imports.js
 */

const fs = require('fs');
const path = require('path');

// Import mappings from old to new structure
const importMappings = {
  // UI Components
  "from '../../components/common'": "from '../components/ui'",
  "from '../../../components/common'": "from '../../components/ui'",
  "from '../../../../components/common'": "from '../../../components/ui'",
  
  // Auth Components
  "from '../../components/auth'": "from '../components/features/auth'",
  "from '../../../components/auth'": "from '../../components/features/auth'",
  "from '../../../../components/auth'": "from '../../../components/features/auth'",
  
  // Dashboard Components - Layout
  "from '../../../components/dashboard'": "from '../../components/layout'",
  "from '../../components/dashboard'": "from '../components/layout'",
  
  // Dashboard Components - Features
  "DashboardLayout,": "// DashboardLayout moved to layout layer",
  "Header,": "// Header moved to layout layer", 
  "Sidebar,": "// Sidebar moved to layout layer",
};

// Specific component import updates
const componentMappings = {
  "import { DashboardLayout": "import { DashboardLayout } from '../components/layout';\nimport {",
  "} from '../../../components/dashboard'": "} from '../../components/features/dashboard'",
  "} from '../../components/dashboard'": "} from '../components/features/dashboard'",
};

function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Apply import mappings
    Object.keys(importMappings).forEach(oldImport => {
      const newImport = importMappings[oldImport];
      if (content.includes(oldImport)) {
        content = content.replace(new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newImport);
        updated = true;
      }
    });
    
    // Apply component-specific mappings
    Object.keys(componentMappings).forEach(oldPattern => {
      const newPattern = componentMappings[oldPattern];
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
        updated = true;
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function findJSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findJSFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function main() {
  console.log('🚀 Starting import migration...\n');
  
  const srcDir = path.join(__dirname, '..', 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src directory not found. Make sure you\'re running this from the project root.');
    process.exit(1);
  }
  
  const jsFiles = findJSFiles(srcDir);
  
  console.log(`📁 Found ${jsFiles.length} JavaScript/TypeScript files\n`);
  
  jsFiles.forEach(filePath => {
    updateImportsInFile(filePath);
  });
  
  console.log('\n✨ Migration complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the updated imports');
  console.log('2. Test your application');
  console.log('3. Remove old component files if everything works');
  console.log('4. Update any remaining manual imports');
}

if (require.main === module) {
  main();
}

module.exports = { updateImportsInFile, findJSFiles };
