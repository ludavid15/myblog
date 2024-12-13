const fs = require("fs");
const path = require("path");

// File paths
const TOPICS_FILE = path.join("/", "myapp", "public", "topics.json");
const BLOG_POSTS_FILE = path.join("/", "myapp", "public", "blog_posts.json");
const OUTPUT_FILE = path.join("/", "myapp", "public", "posts_directory.json");

// Helper function to normalize strings (lowercase, trim spaces)
function normalizeString(str) {
  return str ? str.toLowerCase().trim() : "";
}

function organizeBlogPosts() {
  try {
    // Load and parse topics.json
    const topicsData = fs.readFileSync(TOPICS_FILE, "utf-8");
    const topics = JSON.parse(topicsData);

    // Load and parse blog_posts.json
    const blogPostsData = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
    const blogPosts = JSON.parse(blogPostsData);

    // Transform blogPosts array into an object grouped by topic
    const postsByTopic = blogPosts.reduce((acc, post) => {
      const normalizedTopic = normalizeString(post.topic);
      if (!acc[normalizedTopic]) {
        acc[normalizedTopic] = [];
      }
      acc[normalizedTopic].push({
        title: post.title,
        date: post.date,
        file: post.file,
        path: post.path,
        topic: post.topic
      });
      return acc;
    }, {});

    // Combine topics with their respective posts
    const organizedTopics = topics.map(topic => {
      const normalizedTopicName = normalizeString(topic.name);
      return {
        name: topic.name,
        icon: topic.icon,
        path: topic.path,
        posts: postsByTopic[normalizedTopicName] || [] // Fallback to empty array
      };
    });

    // Write the result to the output file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(organizedTopics, null, 4), "utf-8");
    console.log(`Organized blog posts saved to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Error organizing blog posts:", error.message);
  }
}

// Run the function
organizeBlogPosts();
