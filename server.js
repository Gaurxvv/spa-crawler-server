const express = require("express");
const path = require("path");
const fs = require("fs");
const { isbot } = require("isbot");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from React build
app.use(express.static(path.join(__dirname, "build"), {
  maxAge: "1d" // Cache static assets for 1 day
}));

// Global user agent list for debugging
const knownBots = [
  "WhatsApp",
  "facebookexternalhit",
  "Twitter",
  "LinkedInBot",
  "Applebot", // iMessage bot
  "Slackbot",
  "Discordbot",
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "Sogou",
  "Exabot",
  "facebot",
  "ia_archiver",
  "Slack-ImgProxy",
  "SkypeUriPreview"
];

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Function to generate meta tags for events
async function getEventMetaTags(slug) {
  try {
    // TODO: Replace with your actual API endpoint
    const apiUrl = process.env.API_URL || "YOUR_API_ENDPOINT";
    const response = await fetch(`${apiUrl}/events/${slug}`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const event = await response.json();
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    return `
    <!-- Event-specific meta tags -->
    <meta property="og:title" content="${escapeHtml(event.title)}" />
    <meta property="og:description" content="${escapeHtml(event.description || event.excerpt || "")}" />
    <meta property="og:image" content="${escapeHtml(event.image || event.imageUrl || "")}" />
    <meta property="og:url" content="${escapeHtml(`${baseUrl}/events/${slug}`)}" />
    <meta property="og:type" content="event" />
    <meta property="og:site_name" content="${escapeHtml(process.env.SITE_NAME || "Your Site")}" />
    
    <!-- Twitter Card meta tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(event.title)}" />
    <meta name="twitter:description" content="${escapeHtml(event.description || event.excerpt || "")}" />
    <meta name="twitter:image" content="${escapeHtml(event.image || event.imageUrl || "")}" />
    
    <!-- Additional meta tags -->
    <meta name="description" content="${escapeHtml(event.description || event.excerpt || "")}" />
    <title>${escapeHtml(event.title)}</title>
    `;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return `
    <meta property="og:title" content="Event Not Found" />
    <meta property="og:description" content="The requested event could not be found." />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Event Not Found" />
    <title>Event Not Found</title>
    `;
  }
}

// Helper function to read and inject meta tags into HTML
function injectMetaTags(html, metaTags) {
  // Remove any existing dynamic meta tags between <!-- Dynamic --> comments
  html = html.replace(/<!-- Dynamic -->[\s\S]*?<!-- \/Dynamic -->/g, "");
  
  // Inject new meta tags
  html = html.replace(
    /<head>/,
    `<head>\n    <!-- Dynamic -->\n    ${metaTags}\n    <!-- /Dynamic -->`
  );
  
  return html;
}

// Route handler for events with bot detection
app.get("/events/:slug", async (req, res) => {
  const userAgent = req.get("user-agent") || "";
  const isBot = isbot(userAgent);
  
  // Log for debugging
  if (isBot) {
    console.log(`🤖 Bot detected: ${userAgent}`);
    console.log(`📄 Requested route: /events/${req.params.slug}`);
  }

  if (isBot) {
    try {
      // Read the base HTML file
      const htmlFile = path.join(__dirname, "build", "index.html");
      
      if (!fs.existsSync(htmlFile)) {
        console.error("❌ index.html not found in build directory");
        return res.status(500).send("Server configuration error");
      }
      
      let html = fs.readFileSync(htmlFile, "utf8");

      // Generate meta tags for this event
      const metaTags = await getEventMetaTags(req.params.slug);

      // Inject meta tags into HTML
      html = injectMetaTags(html, metaTags);

      // Set proper headers for SEO
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("X-Robots-Tag", "index, follow");
      
      res.send(html);
    } catch (error) {
      console.error("❌ Error serving bot content:", error);
      // Fallback to regular index.html
      res.sendFile(path.join(__dirname, "build", "index.html"));
    }
  } else {
    // Serve regular React app for human users
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
});

// Optional: Add more routes for other pages (blog posts, products, etc.)
// app.get("/posts/:slug", async (req, res) => {
//   const userAgent = req.get("user-agent") || "";
//   const isBot = isbot(userAgent);
//   
//   if (isBot) {
//     // Similar logic as events...
//   } else {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   }
// });

// Catch-all handler for React Router (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, "build")}`);
});
