/**
 * Test script to verify bot detection is working correctly
 * Run with: node test-bot-detection.js
 */

const { isbot } = require("isbot");

const testUserAgents = [
  // Social Media Bots
  {
    name: "WhatsApp",
    ua: "WhatsApp/2.20.50 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36"
  },
  {
    name: "Facebook",
    ua: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"
  },
  {
    name: "Twitter",
    ua: "Twitterbot/1.0"
  },
  {
    name: "LinkedIn",
    ua: "LinkedInBot/1.0 (compatible; Mozilla/5.0)"
  },
  {
    name: "iMessage",
    ua: "Applebot/0.1; +http://www.apple.com/go/applebot"
  },
  {
    name: "Slack",
    ua: "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)"
  },
  {
    name: "Discord",
    ua: "Discordbot/1.0"
  },
  
  // Search Engine Bots
  {
    name: "Google",
    ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  },
  {
    name: "Bing",
    ua: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"
  },
  
  // Regular Users
  {
    name: "Chrome (Human)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  },
  {
    name: "Safari (Human)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"
  },
  {
    name: "Firefox (Human)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0"
  }
];

console.log("🧪 Testing Bot Detection\n");
console.log("=" .repeat(70));

let botCount = 0;
let humanCount = 0;

testUserAgents.forEach(({ name, ua }) => {
  const isBot = isbot(ua);
  
  if (isBot) {
    botCount++;
    console.log(`✅ ${name.padEnd(20)} → BOT DETECTED`);
  } else {
    humanCount++;
    console.log(`👤 ${name.padEnd(20)} → Regular User`);
  }
});

console.log("=" .repeat(70));
console.log(`\n📊 Summary:`);
console.log(`   Bots detected: ${botCount}`);
console.log(`   Regular users: ${humanCount}`);
console.log(`   Total tested: ${testUserAgents.length}`);

if (botCount >= 7 && humanCount >= 3) {
  console.log(`\n✅ All tests passed! Bot detection is working correctly.`);
} else {
  console.log(`\n⚠️  Expected at least 7 bots and 3 regular users. Results may vary.`);
}

console.log("\n💡 Tip: Use these user agents to test your server:");
console.log("   curl -A \"WhatsApp/2.0\" http://localhost:3000/events/test");

