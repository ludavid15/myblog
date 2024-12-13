/*
This script extracts meta-data headers from all markdown files in the
directoryPath folder, and saves them into a .json file in the public
folder. That .json file provides a directory of all blog posts.
*/

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); 

// Directory containing your Markdown files
const directoryPath = path.join('/', 'myapp', 'src', 'posts');

// Output JSON file
const outputJson =  path.join('/', 'myapp', 'public', 'blog_posts.json');

// Array to store extracted metadata
const metadataList = [];

// Function to extract metadata from a file
function extractMetadata(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(fileContent);

  // Store metadata along with file name for context
  metadataList.push({
    file: path.basename(filePath),
    ...parsed.data
  });
}

// Process all markdown files in the directory
fs.readdirSync(directoryPath)
  .filter(file => file.endsWith('.md'))
  .forEach(file => {
    const filePath = path.join(directoryPath, file);
    extractMetadata(filePath);
  });

// Write metadata to JSON file
fs.writeFileSync(outputJson, JSON.stringify(metadataList, null, 2), 'utf8');
console.log(`Metadata extracted to ${outputJson}`);
