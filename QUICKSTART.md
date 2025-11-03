# Quick Start Guide

Get your SPA crawler server running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Your React Build
```bash
# From your React app directory
npm run build
# Copy the entire build folder to this project
cp -r build ../spa-crawler-server/
```

### 3. Update API Endpoint
Edit `server.js` line 54:
```javascript
const apiUrl = process.env.API_URL || "https://api.yoursite.com";
```

### 4. Run Setup Check
```bash
npm run check
```

### 5. Start Server
```bash
npm start
```

### 6. Test It!
```bash
# Test bot detection
npm test

# Test with a real bot
curl -A "WhatsApp/2.0" http://localhost:3000/events/test-slug

# Test with human browser
open http://localhost:3000/events/test-slug
```

## 🎯 What You Need to Configure

| Item | Where | Example |
|------|-------|---------|
| API Endpoint | `server.js` line 54 | `https://api.yoursite.com` |
| Base URL | `ecosystem.config.js` | `https://yoursite.com` |
| Site Name | `ecosystem.config.js` | `My Event App` |

## 📝 Your API Should Return

```json
{
  "title": "Event Name",
  "description": "Event description",
  "image": "https://example.com/image.jpg"
}
```

## 🚀 Deploy to Production

### With PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### With Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

## ✅ Validation Checklist

- [ ] `npm install` completed
- [ ] Build folder copied
- [ ] API endpoint configured
- [ ] `npm run check` passes
- [ ] `npm test` shows bot detection
- [ ] Server starts with `npm start`
- [ ] Bot requests return meta tags

## 🆘 Having Issues?

Run the checks:
```bash
npm run check    # Verify setup
npm test         # Test bot detection
```

Read more:
- `SETUP.md` - Detailed setup guide
- `README.md` - Full documentation

## 🎉 You're Done!

Your server is now ready to serve beautiful link previews to:
- WhatsApp, Facebook, Twitter, LinkedIn
- iMessage, Slack, Discord
- All other social platforms

Test with real crawlers:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

