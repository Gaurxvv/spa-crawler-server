/**
 * Test script to verify the server is working correctly
 * This tests bot detection and meta tag injection
 */

const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

console.log('🧪 Testing SPA Crawler Server...\n');

function makeRequest(url, userAgent, description) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: 'GET',
      headers: {
        'User-Agent': userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function runTests() {
  console.log('='.repeat(70));
  
  // Test 1: Regular homepage with human user agent
  console.log('\n📄 Test 1: Homepage (Human User)');
  try {
    const result = await makeRequest('/', null, 'Human user visiting homepage');
    console.log(`${colors.green}✅ Status: ${result.statusCode}${colors.reset}`);
    
    if (result.body.includes('Muscat Where To')) {
      console.log(`${colors.green}✅ Content: React app served correctly${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Content: Unexpected content${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}💡 Make sure the server is running on port 3000${colors.reset}\n`);
    return;
  }

  // Test 2: Homepage with bot user agent
  console.log('\n🤖 Test 2: Homepage (Bot User)');
  try {
    const result = await makeRequest('/', 'WhatsApp/2.0', 'Bot visiting homepage');
    console.log(`${colors.green}✅ Status: ${result.statusCode}${colors.reset}`);
    console.log(`${colors.blue}ℹ️  Bot detected and served static HTML${colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  }

  // Test 3: Events page with bot user agent (this should inject meta tags)
  console.log('\n🎯 Test 3: Events Page (Bot User) - Meta Tag Injection');
  try {
    const result = await makeRequest('/events/test-event', 'WhatsApp/2.0', 'Bot visiting event page');
    console.log(`${colors.green}✅ Status: ${result.statusCode}${colors.reset}`);
    
    // Check for dynamic meta tags
    if (result.body.includes('<!-- Dynamic -->')) {
      console.log(`${colors.green}✅ Dynamic meta tags section found${colors.reset}`);
      
      // Check for specific meta tags
      const hasOgTitle = result.body.includes('og:title');
      const hasOgDescription = result.body.includes('og:description');
      const hasTwCard = result.body.includes('twitter:card');
      
      if (hasOgTitle && hasOgDescription && hasTwCard) {
        console.log(`${colors.green}✅ Meta tags: Open Graph and Twitter Card tags present${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️  Meta tags: Some tags missing${colors.reset}`);
      }
      
      // Show a snippet of the injected content
      const dynamicStart = result.body.indexOf('<!-- Dynamic -->');
      const dynamicEnd = result.body.indexOf('<!-- /Dynamic -->');
      if (dynamicStart !== -1 && dynamicEnd !== -1) {
        const dynamicContent = result.body.substring(dynamicStart, dynamicEnd + 20);
        console.log(`${colors.blue}\n📝 Injected meta tags:${colors.reset}`);
        console.log(dynamicContent.split('\n').slice(0, 3).map(line => line.trim()).filter(Boolean).join('\n'));
        console.log(`${colors.blue}...${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}⚠️  No dynamic meta tags found${colors.reset}`);
      console.log(`${colors.yellow}   This might be because API_URL is not configured${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  }

  // Test 4: Events page with human user agent (should serve React app)
  console.log('\n👤 Test 4: Events Page (Human User) - React App');
  try {
    const result = await makeRequest('/events/test-event', null, 'Human user visiting event page');
    console.log(`${colors.green}✅ Status: ${result.statusCode}${colors.reset}`);
    
    if (result.body.includes('root')) {
      console.log(`${colors.green}✅ Content: Regular React app served to human user${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Content: Unexpected content${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Testing complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Configure API_URL in server.js or ecosystem.config.js');
  console.log('   2. Test with real social media validators:');
  console.log('      - Facebook: https://developers.facebook.com/tools/debug/');
  console.log('      - Twitter: https://cards-dev.twitter.com/validator');
  console.log('      - LinkedIn: https://www.linkedin.com/post-inspector/');
  console.log('\n');
}

runTests().catch(console.error);

