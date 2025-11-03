/**
 * Pre-flight check script to verify everything is set up correctly
 * Run with: node check-setup.js
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Running Setup Checks...\n");
console.log("=".repeat(70));

let hasErrors = false;

// Check 1: Build directory exists
console.log("📁 Check 1: Build directory...");
const buildDir = path.join(__dirname, "build");
if (fs.existsSync(buildDir)) {
  console.log("   ✅ Build directory exists");
} else {
  console.log("   ❌ Build directory NOT found");
  console.log("   ⚠️  Action: Copy your React app's build folder here");
  hasErrors = true;
}

// Check 2: index.html exists
console.log("\n📄 Check 2: index.html file...");
const indexPath = path.join(__dirname, "build", "index.html");
if (fs.existsSync(indexPath)) {
  console.log("   ✅ index.html found");
  
  // Check if it's a React app
  const content = fs.readFileSync(indexPath, "utf8");
  if (content.includes("root")) {
    console.log("   ✅ Looks like a React app");
  } else {
    console.log("   ⚠️  Warning: Doesn't look like a React app");
  }
} else {
  console.log("   ❌ index.html NOT found in build directory");
  hasErrors = true;
}

// Check 3: Dependencies installed
console.log("\n📦 Check 3: Dependencies...");
const nodeModulesPath = path.join(__dirname, "node_modules");
if (fs.existsSync(nodeModulesPath)) {
  console.log("   ✅ node_modules exists");
  
  // Check for express
  const expressPath = path.join(nodeModulesPath, "express");
  const isbotPath = path.join(nodeModulesPath, "isbot");
  
  if (fs.existsSync(expressPath)) {
    console.log("   ✅ Express installed");
  } else {
    console.log("   ❌ Express NOT found");
    hasErrors = true;
  }
  
  if (fs.existsSync(isbotPath)) {
    console.log("   ✅ isbot installed");
  } else {
    console.log("   ❌ isbot NOT found");
    hasErrors = true;
  }
} else {
  console.log("   ❌ node_modules NOT found");
  console.log("   ⚠️  Action: Run 'npm install'");
  hasErrors = true;
}

// Check 4: API configuration
console.log("\n🌐 Check 4: API configuration...");
const serverContent = fs.readFileSync(path.join(__dirname, "server.js"), "utf8");
if (serverContent.includes("YOUR_API_ENDPOINT")) {
  console.log("   ⚠️  Warning: API endpoint still has placeholder");
  console.log("   ⚠️  Action: Update line 54 in server.js with your API URL");
} else {
  console.log("   ✅ API endpoint configured");
}

// Check 5: Environment variables
console.log("\n⚙️  Check 5: Environment variables...");
if (process.env.API_URL) {
  console.log("   ✅ API_URL set:", process.env.API_URL);
} else {
  console.log("   ⚠️  Warning: API_URL not set");
  console.log("   💡 Tip: Create a .env file or set in ecosystem.config.js");
}

if (process.env.BASE_URL) {
  console.log("   ✅ BASE_URL set:", process.env.BASE_URL);
} else {
  console.log("   ⚠️  Warning: BASE_URL not set (will use localhost:3000)");
}

if (process.env.PORT) {
  console.log("   ✅ PORT set:", process.env.PORT);
} else {
  console.log("   ℹ️  Using default PORT: 3000");
}

// Check 6: PM2 config
console.log("\n🚀 Check 6: PM2 configuration...");
const pm2ConfigPath = path.join(__dirname, "ecosystem.config.js");
if (fs.existsSync(pm2ConfigPath)) {
  console.log("   ✅ ecosystem.config.js exists");
} else {
  console.log("   ⚠️  ecosystem.config.js not found (optional)");
}

console.log("\n" + "=".repeat(70));

// Summary
if (hasErrors) {
  console.log("\n❌ Setup incomplete. Please fix the errors above.");
  console.log("\n📖 For detailed setup instructions, see SETUP.md\n");
  process.exit(1);
} else {
  console.log("\n✅ All checks passed! Your setup looks good.");
  console.log("\n🚀 You can start the server with:");
  console.log("   npm start");
  console.log("\n🧪 Or test bot detection with:");
  console.log("   npm test");
  console.log("\n📖 For more info, see README.md\n");
}

