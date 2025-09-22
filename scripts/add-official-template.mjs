import { createClient } from '@supabase/supabase-js';
import minimist from 'minimist';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be defined in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

const { title, items, description } = args;

if (!title || !items || !description) {
  console.error(`
  Usage:
  node scripts/add-official-template.mjs --title "My Roulette" --items '[{"name":"Item 1"}, {"name":"Item 2"}]' --description "This is a description."
  `);
  process.exit(1);
}

// Validate items JSON
let parsedItems;
try {
  parsedItems = JSON.parse(items);
  if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
    throw new Error('Items must be a non-empty array.');
  }
  // A simple check for the item structure
  if (!parsedItems.every(item => typeof item === 'object' && item !== null && 'name' in item)) {
    throw new Error('Each item must be an object with a "name" property.');
  }
} catch (error) {
  console.error('Error: --items argument must be a valid JSON string representing a non-empty array of objects with a "name" property.');
  console.error(error.message);
  process.exit(1);
}

// Create a localized description object
const supportedLanguages = ['en', 'ja', 'fr', 'es'];
const localizedDescription = supportedLanguages.reduce((acc, lang) => {
    acc[lang] = description;
    return acc;
}, {});


async function addOfficialTemplate() {
  console.log('Adding new official template...');

  const rouletteData = {
    title: title,
    items: parsedItems,
    description: localizedDescription,
    user_id: null,
    is_template: true,
    is_profile_public: false,
    allow_fork: true,
    supported_languages: supportedLanguages,
    tags: ['official'], // Add an 'official' tag
  };

  try {
    const { data, error } = await supabase
      .from('roulettes')
      .insert([rouletteData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('Successfully added official template:');
    console.log(data);
  } catch (error) {
    console.error('Error adding official template:', error.message);
  }
}

addOfficialTemplate();
