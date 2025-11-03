# SPA Crawler Server

A Node.js server that serves your React Single Page Application with dynamic meta tags for social media crawlers (WhatsApp, Facebook, Twitter, LinkedIn, iMessage, Slack, Discord, etc.) while maintaining the SPA experience for real users.

## 🎯 How It Works

1. **Bot Detection**: Uses the `isbot` package to identify social media crawlers and bots
2. **Dynamic Meta Tags**: Injects Open Graph and Twitter Card meta tags into the HTML for specific routes
3. **SPA Experience**: Regular users still get the full React SPA experience
4. **No SSR Required**: Works without server-side rendering - just serves static HTML with pre-filled meta tags

## 🚀 Setup

### 1. Build Your React App

Make sure your React app is built and ready:

```bash
cd your-react-app
npm run build
# Copy the build folder to this project
cp -r build ../spa-crawler-server/
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file (or set environment variables in PM2):

```env
PORT=3000
BASE_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
SITE_NAME=Your Site Name
```

### 4. Update Your API Endpoint

Edit `server.js` and replace `YOUR_API_ENDPOINT` in the `getEventMetaTags` function (line 54) with your actual API URL.

### 5. Start the Server

**Development:**
```bash
npm start
```

**Production with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📁 Project Structure

```
spa-crawler-server/
├── server.js              # Main server file
├── package.json           # Dependencies
├── ecosystem.config.js    # PM2 configuration
├── build/                 # React build output (create this)
│   └── index.html
├── README.md              # This file
└── .env                   # Environment variables (create this)
```

## 🔧 Configuration

### Supported Routes

Currently configured for `/events/:slug`. You can add more routes following the same pattern:

```javascript
app.get("/posts/:slug", async (req, res) => {
  const userAgent = req.get("user-agent") || "";
  const isBot = isbot(userAgent);
  
  if (isBot) {
    // Fetch post data and inject meta tags
    const post = await fetchPostData(req.params.slug);
    const metaTags = generatePostMetaTags(post);
    // ... inject into HTML
  } else {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
});
```

### API Response Format

Your API should return data in this format for events:

```json
{
  "title": "Event Title",
  "description": "Event description",
  "image": "https://example.com/image.jpg",
  "imageUrl": "https://example.com/image.jpg"
}
```

### PM2 Configuration

Edit `ecosystem.config.js` to customize:
- Port number
- Memory limits
- Autorestart behavior
- Environment variables

## 🧪 Testing

### Test Bot Detection Locally

You can simulate bot requests using curl:

```bash
# Test with WhatsApp user agent
curl -A "WhatsApp/2.0" http://localhost:3000/events/my-event-slug

# Test with Facebook user agent
curl -A "facebookexternalhit/1.1" http://localhost:3000/events/my-event-slug

# Test with Twitter user agent
curl -A "Twitterbot/1.0" http://localhost:3000/events/my-event-slug
```

### Validate Meta Tags

Use online tools:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## 🔍 Bot Detection

This server detects the following bots:
- WhatsApp
- Facebook (facebookexternalhit)
- Twitter (Twitterbot)
- LinkedIn (LinkedInBot)
- iMessage (Applebot)
- Slack (Slackbot)
- Discord (Discordbot)
- Googlebot, Bingbot, and other search engines

The `isbot` package handles detection automatically.

## 📝 Meta Tags Generated

For each dynamic route, the following meta tags are injected:

**Open Graph:**
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`

**Twitter Card:**
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

**Standard:**
- `title`
- `description`

## 🐛 Troubleshooting

### Meta tags not appearing
1. Check that your API is accessible
2. Verify the API response format matches expected structure
3. Check server logs for errors

### Build folder not found
```bash
# Create the build directory with your React app
npm run build  # In your React app directory
```

### Bot detection not working
- Check user-agent in logs
- Verify `isbot` package is installed
- Test with curl using bot user agents

## 📦 Dependencies

- **express**: Web server framework
- **isbot**: Bot detection library

## 🔒 Security Notes

- HTML content is automatically escaped to prevent XSS attacks
- Static files are served with cache headers
- Bot detection prevents unnecessary processing for human users

## 📄 License

ISC

