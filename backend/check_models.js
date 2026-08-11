import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import Model from './models/Model.js';

async function checkModels() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const models = await Model.find({});
    console.log(`Found ${models.length} total models in database:`);
    
    models.forEach((m, idx) => {
      console.log(`\n--- Model #${idx + 1} ---`);
      console.log(`ID: ${m._id}`);
      console.log(`Name: ${m.name}`);
      console.log(`Category: ${m.category}`);
      console.log(`Status: ${m.status}`);
      console.log(`isVerified: ${m.isVerified}`);
      console.log(`isFeatured: ${m.isFeatured}`);
    });

    // Automatically update all 5 models to status: 'active' and isVerified: true if requested
    const res = await Model.updateMany(
      { status: { $ne: 'suspended' } },
      { $set: { status: 'active', isVerified: true } }
    );
    console.log('\nUpdated models result:', res);

    process.exit(0);
  } catch (err) {
    console.error('Error checking models:', err);
    process.exit(1);
  }
}

checkModels();
