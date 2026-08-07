import mongoose from "mongoose";

const uri =
  "mongodb+srv://surya93362_db_user:YOUR_NEW_PASSWORD@modeling.4mzhirz.mongodb.net/modeling_agency_db?retryWrites=true&w=majority&appName=modeling";

try {
  await mongoose.connect(uri);
  console.log("✅ Connected");
} catch (e) {
  console.error(e);
}