# Setup Guide: SPA Crawler Server

This guide will walk you through setting up the server step-by-step.

## Prerequisites

- Node.js (v16 or higher)
- A built React application
- Your API endpoint URL

## Step-by-Step Setup

### Step 1: Prepare Your React Build

First, build your React application:

```bash
# Navigate to your React app
cd /path/to/your-react-app

# Build for production
npm run build

# The build directory should now exist
ls build/
```

Your build directory should contain:
- `index.html`
- `static/` folder (with CSS, JS, images)

### Step 2: Copy Build to Server Project

Copy the build folder to this server project:

**On Linux/Mac:**
```bash
cp -r build /path/to/spa-crawler-server/
```

**On Windows:**
```bash
xcopy /E /I build C:\path\to\spa-crawler-server\build
```

**Or manually:** Copy the entire `build` folder into the `spa-crawler-server` directory.

Your project structure should look like:
```
spa-crawler-server/
├── build/
│   ├── index.html
│   └── static/
│       ├── css/
│       ├── js/
│       └── media/
├── server.js
├── package.json
└── ...
```

### Step 3: Configure Your API Endpoint

Open `server.js` and find line 54. Replace the API endpoint:

```javascript
// Find this line:
const apiUrl = process.env.API_URL || "YOUR_API_ENDPOINT";

// Replace with your actual API:
const apiUrl = process.env.API_URL || "https://api.yoursite.com";
```

### Step 4: Set Environment Variables

**Option A: Create .env file (Recommended for development)**

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=production
BASE_URL=http://localhost:3000
SITE_NAME=My Event App
API_URL=https://api.yoursite.com
```

**Option B: Update PM2 config (Recommended for production)**

Edit `ecosystem.config.js`:

```javascript
env: {
  NODE_ENV: "production",
  PORT: 3000,
  BASE_URL: "https://yourdomain.com",
  SITE_NAME: "My Event App",
  API_URL: "https://api.yourdomain.com",
},
```

### Step 5: Test Bot Detection

Before running the server, test that bot detection works:

```bash
npm test
```

You should see output showing various bots detected.

### Step 6: Start the Server

**Development:**
```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
📁 Serving static files from: /path/to/build
```

**Production with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 7: Test with Real Bots

Test your server with bot user agents:

```bash
# Test with WhatsApp bot
curl -A "WhatsApp/2.0" http://localhost:3000/events/my-event-slug

# Test with Facebook bot
curl -A "facebookexternalhit/1.1" http://localhost:3000/events/my-event-slug

# Test with Twitter bot
curl -A "Twitterbot/1.0" http://localhost:3000/events/my-event-slug
```

You should see HTML output with injected meta tags.

### Step 8: Validate Social Media Previews

Use these tools to test real social media crawlers:

1. **Facebook**: https://developers.facebook.com/tools/debug/
   - Paste your URL: `https://yourdomain.com/events/my-event-slug`

2. **Twitter**: https://cards-dev.twitter.com/validator
   - Paste your URL

3. **LinkedIn**: https://www.linkedin.com/post-inspector/
   - Paste your URL

4. **WhatsApp**: Send yourself a test link

## Expected API Response

Your API endpoint should return JSON in this format:

```json
{
  "title": "Summer Music Festival 2024",
  "description": "Join us for an amazing outdoor music festival featuring top artists.",
  "image": "https://example.com/images/festival-poster.jpg",
  "imageUrl": "https://example.com/images/festival-poster.jpg"
}
```

**Field mapping:**
- `title` → Used for og:title and Twitter card
- `description` or `excerpt` → Used for og:description
- `image` or `imageUrl` → Used for og:image

## Troubleshooting

### Problem: Server won't start

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
npm install
```

---

### Problem: 500 error when bot requests URL

**Error in logs:** `index.html not found in build directory`

**Solution:** Make sure you copied the build folder from your React app.

---

### Problem: No meta tags in bot response

**Check:**
1. Is your API returning the correct format?
2. Check server logs for API errors
3. Test your API directly: `curl https://api.yoursite.com/events/my-slug`

---

### Problem: WhatsApp preview not working

**Common issues:**
1. Image URL must be absolute (starting with https://)
2. Image must be publicly accessible
3. Image should be at least 300x200 pixels
4. Check WhatsApp's debugger: https://developers.facebook.com/tools/debug/

---

### Problem: PM2 not restarting server

**Solution:**
```bash
pm2 delete all
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## File Structure Checklist

Make sure you have:

```
✅ build/
   ✅ index.html
   ✅ static/
✅ server.js
✅ package.json
✅ ecosystem.config.js
✅ README.md
✅ SETUP.md (this file)
✅ .env (optional, for local dev)
```

## Next Steps

1. ✅ Bot detection working
2. ✅ Meta tags injecting
3. ✅ Social media previews showing correctly
4. 📝 Deploy to production
5. 📝 Set up monitoring
6. 📝 Add caching (if needed)

## Common Deployment Options

- **Heroku**: Add `Procfile` with `web: node server.js`
- **DigitalOcean App Platform**: Use `npm start` script
- **AWS EC2**: Use PM2 with nginx reverse proxy
- **Vercel/Netlify**: These are NOT recommended for this setup (use Node.js servers)

## Need Help?

1. Check server logs: `pm2 logs`
2. Test bot detection: `npm test`
3. Review `README.md` for additional info
4. Check your React app is built correctly

