
// OG prince_of_travel code
// import WPAPI from 'wpapi';
// import fs from 'fs/promises';
// import path from 'path';
// import fetch from 'node-fetch'; // Ensure node-fetch is installed
// import { fileURLToPath } from 'url'; // Import fileURLToPath for resolving directory

// // Get the directory name from import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define the number of posts per page
// const POSTS_PER_PAGE = 100;
// const RETRY_LIMIT = 3;
// const RETRY_DELAY = 2000; // 2 seconds

// // Map of API endpoints to filenames
// const endpointMap = {
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=reviews&_embed': 'reviews.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=news&_embed': 'news.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=deals&_embed': 'deals.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=guides&_embed': 'guides.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=insights&_embed': 'insights.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=insights&_embed': 'about.json',
//   // Add more endpoints and filenames here
//   'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/credit-cards': 'credit-cards.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/hotel-programs': 'hotel-programs.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/points': 'points-programs.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/airlines': 'airlines.json',
//   'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/airports': 'airports.json',
// };

// // Function to fetch data with retry logic
// const fetchWithRetry = async (url, retries = RETRY_LIMIT) => {
//   while (retries > 0) {
//     try {
//       console.log(`Fetching ${url}`);
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       console.log(`Successfully fetched ${url}`);
//       return await response.json();
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//       retries--;
//       if (retries > 0) {
//         console.log(`Retrying ${url}... (${retries} attempts left)`);
//         await new Promise(res => setTimeout(res, RETRY_DELAY));
//       } else {
//         throw error;
//       }
//     }
//   }
// };

// // Function to fetch all pages of posts from a WordPress endpoint
// const fetchAllPosts = async (endpoint) => {
//   let page = 1;
//   let allPosts = [];
//   let hasMorePages = true;

//   while (hasMorePages) {
//     const paginatedEndpoint = `${endpoint}&per_page=${POSTS_PER_PAGE}&page=${page}`;
//     try {
//       console.log(`Fetching page ${page} from ${paginatedEndpoint}`);
//       const data = await fetchWithRetry(paginatedEndpoint);
//       if (data.length === 0) {
//         hasMorePages = false;
//         console.log(`No more posts on page ${page}`);
//       } else {
//         allPosts = allPosts.concat(data);
//         console.log(`Fetched ${data.length} posts from page ${page}`);
//         page++;
//       }
//     } catch (error) {
//       console.error(`Failed to fetch data from ${paginatedEndpoint}:`, error);
//       break;
//     }
//   }

//   console.log(`Total posts fetched: ${allPosts.length}`);
//   return allPosts;
// };

// // Function to fetch data from an endpoint and save it to a JSON file
// const fetchDataAndSave = async (endpoint, filename) => {
//   try {
//     console.log(`Starting to fetch data from ${endpoint}`);
//     let data;
//     const isWordPressEndpoint = endpoint.includes('/wp-json/wp/v2/posts');
    
//     if (isWordPressEndpoint) {
//       // Use WPAPI for WordPress endpoints
//       const wp = new WPAPI({ endpoint: 'https://princeoftravel.wpenginepowered.com/wp-json' });
//       const allPosts = await fetchAllPosts(endpoint);
//       data = allPosts;
//     } else {
//       // Fetch data from non-WordPress endpoints
//       data = await fetchWithRetry(endpoint);
//     }

//     console.log(`Saving data to ${filename}`);
//     await fs.writeFile(path.join(__dirname, 'src/data', filename), JSON.stringify(data, null, 2), 'utf8');
//     console.log(`${filename} has been saved.`);
//   } catch (err) {
//     console.error(`Error fetching data from ${endpoint}:`, err);
//   }
// };

// // Fetch data from all endpoints and save to separate files
// const fetchAllData = async () => {
//   for (const [endpoint, filename] of Object.entries(endpointMap)) {
//     console.log(`Processing endpoint ${endpoint}`);
//     await fetchDataAndSave(endpoint, filename);
//   }
// };

// fetchAllData();

// console.log('Scheduler is running...');


// updated schedule code
import WPAPI from 'wpapi';
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import { fileURLToPath } from 'url'; // Import fileURLToPath for resolving directory

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the number of posts per page
const POSTS_PER_PAGE = 100;
const RETRY_LIMIT = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Map of API endpoints to filenames
const endpointMap = {
  // 'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=reviews&_embed': 'reviews.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=news&_embed': 'news.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=deals&_embed': 'deals.json',
  'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=guides&_embed': 'guides.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=insights&_embed': 'insights.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=insights&_embed': 'about.json',
  // // Add more endpoints and filenames here
  // 'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/credit-cards': 'credit-cards.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/hotel-programs': 'hotel-programs.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/points': 'points-programs.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/airlines': 'airlines.json',
  // 'https://princeoftravel.wpenginepowered.com/wp-json/pot/v1/airports': 'airports.json',
};

// Function to fetch data with retry logic
const fetchWithRetry = async (url, retries = RETRY_LIMIT) => {
  while (retries > 0) {
    try {
      console.log(`Fetching ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Successfully fetched ${url}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      retries--;
      if (retries > 0) {
        console.log(`Retrying ${url}... (${retries} attempts left)`);
        await new Promise(res => setTimeout(res, RETRY_DELAY));
      } else {
        throw error;
      }
    }
  }
};

// Function to fetch all pages of posts from a WordPress endpoint
const fetchAllPosts = async (endpoint) => {
  let page = 1;
  let allPosts = [];
  let hasMorePages = true;

  while (hasMorePages) {
    const paginatedEndpoint = `${endpoint}&per_page=${POSTS_PER_PAGE}&page=${page}`;
    try {
      console.log(`Fetching page ${page} from ${paginatedEndpoint}`);
      const data = await fetchWithRetry(paginatedEndpoint);
      if (data.length === 0) {
        hasMorePages = false;
        console.log(`No more posts on page ${page}`);
      } else {
        allPosts = allPosts.concat(data);
        console.log(`Fetched ${data.length} posts from page ${page}`);
        page++;
      }
    } catch (error) {
      console.error(`Failed to fetch data from ${paginatedEndpoint}:`, error);
      break;
    }
  }

  console.log(`Total posts fetched: ${allPosts.length}`);
  return allPosts;
};

// Function to fetch data from an endpoint and save it to a JSON file
const fetchDataAndSave = async (endpoint, filename) => {
  try {
    console.log(`Starting to fetch data from ${endpoint}`);
    let data;
    const isWordPressEndpoint = endpoint.includes('/wp-json/wp/v2/posts');
    
    if (isWordPressEndpoint) {
      // Use WPAPI for WordPress endpoints
      const wp = new WPAPI({ endpoint: 'https://princeoftravel.wpenginepowered.com/wp-json' });
      const allPosts = await fetchAllPosts(endpoint);
      data = allPosts;
    } else {
      // Fetch data from non-WordPress endpoints
      data = await fetchWithRetry(endpoint);
    }

    console.log(`Saving data to ${filename}`);
    await fs.writeFile(path.join(__dirname, 'data', filename), JSON.stringify(data, null, 2), 'utf8');
    console.log(`${filename} has been saved.`);
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
  }
};

// Fetch data from all endpoints and save to separate files
const fetchAllData = async () => {
  for (const [endpoint, filename] of Object.entries(endpointMap)) {
    console.log(`Processing endpoint ${endpoint}`);
    await fetchDataAndSave(endpoint, filename);
  }
};

fetchAllData();

console.log('Scheduler is running...');
