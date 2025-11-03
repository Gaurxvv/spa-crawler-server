# Next Steps for Your SPA Crawler Server

Your server is now set up and ready! Here's what you need to do next:

## ✅ What's Already Done

1. ✅ Server code is configured with bot detection
2. ✅ React build is in place ("Muscat Where To" app)
3. ✅ Bot detection library is installed and tested
4. ✅ All dependencies are installed
5. ✅ PM2 configuration is ready
6. ✅ Test scripts are available

## 🔧 What You Need to Configure

### 1. Update Your API Endpoint

**Critical:** You need to configure where the server fetches event data from.

**Option A: In server.js (line 54)**
```javascript
const apiUrl = process.env.API_URL || "https://api.muscatwhereto.com";
```

**Option B: In ecosystem.config.js (line 15)**
```javascript
API_URL: "https://api.muscatwhereto.com",
```

### 2. Configure Your Production URLs

Update `ecosystem.config.js` with your actual domains:

```javascript
env: {
  NODE_ENV: "production",
  PORT: 3000,
  BASE_URL: "https://muscatwhereto.com",          // Your public website URL
  SITE_NAME: "Muscat Where To",                   // Your site name
  API_URL: "https://api.muscatwhereto.com",       // Your API endpoint
},
```

## 🚀 How to Test

### Start the Server

First, make sure nothing is running on port 3000, then start:

```bash
npm start
```

Or with PM2:
```bash
pm2 start ecosystem.config.js
pm2 logs
```

### Run Tests

```bash
# Test bot detection
npm test

# Test full server functionality (requires server running)
npm run test:server

# Check setup
npm run check
```

### Manual Testing

**Test with bot user agents:**
```bash
# WhatsApp
curl -A "WhatsApp/2.0" http://localhost:3000/events/test-slug

# Facebook
curl -A "facebookexternalhit/1.1" http://localhost:3000/events/test-slug

# Twitter
curl -A "Twitterbot/1.0" http://localhost:3000/events/test-slug
```

**Open in browser:**
```
http://localhost:3000
http://localhost:3000/events/any-slug
```

## 🎯 Expected API Response

Your API endpoint should return JSON like this:

```json
{
  "title": "Summer Music Festival 2024",
  "description": "Join us for an amazing outdoor music festival featuring top artists.",
  "image": "https://muscatwhereto.com/images/events/festival.jpg",
  "imageUrl": "https://muscatwhereto.com/images/events/festival.jpg"
}
```

**Note:** The fields `description` or `excerpt` will both work, as will `image` or `imageUrl`.

## 📊 Validate Social Media Previews

Test your meta tags with real crawlers:

1. **Facebook**: https://developers.facebook.com/tools/debug/
   - Paste: `https://yourdomain.com/events/your-event-slug`
   - Click "Scrape Again" to refresh cache

2. **Twitter**: https://cards-dev.twitter.com/validator
   - Paste your URL

3. **LinkedIn**: https://www.linkedin.com/post-inspector/
   - Paste your URL

4. **WhatsApp**: Send yourself a test link

## 🔍 Troubleshooting

### "YOUR_API_ENDPOINT" Error

If you see this error, you haven't set your API_URL:
- Update `server.js` line 54, OR
- Set `API_URL` in `ecosystem.config.js`

### Port Already in Use

```bash
# Kill any process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm start
```

### Meta Tags Not Showing

1. Check if your API is accessible
2. Verify the API returns the correct format
3. Check server logs for errors
4. Test with: `npm run test:server`

### Bot Not Detected

The server logs bot detection. Check console output:
```bash
🤖 Bot detected: WhatsApp/2.0
📄 Requested route: /events/test-slug
```

## 📦 Deploy to Production

### Using PM2

```bash
# Start server
pm2 start ecosystem.config.js

# Save configuration
pm2 save

# Auto-start on reboot
pm2 startup

# View logs
pm2 logs

# Monitor
pm2 monit
```

### Using Heroku

```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### Environment Variables on Heroku

```bash
heroku config:set BASE_URL=https://yourdomain.com
heroku config:set API_URL=https://api.yourdomain.com
heroku config:set SITE_NAME="Muscat Where To"
```

## 🎉 You're All Set!

Once configured:
- ✅ Bots get server-rendered HTML with meta tags
- ✅ Real users get full React SPA experience
- ✅ Beautiful link previews on all social platforms
- ✅ No SSR complexity needed!

## 📚 Resources

- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `QUICKSTART.md` - 5-minute quick start

## 🆘 Still Need Help?

1. Run: `npm run check` to verify setup
2. Check: Server logs for errors
3. Test: Use `npm run test:server`
4. Read: `SETUP.md` for detailed troubleshooting

Good luck! 🚀

