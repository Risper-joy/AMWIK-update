// File: scripts/checkUsers.ts
// Run this from terminal: npx ts-node scripts/checkUsers.ts

import connectDB from "@/lib/db";
import User from "@/models/User";

async function checkUsers() {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    // Find all users without password filter
    const users = await User.find().select("+password");
    console.log("📊 Total users found:", users.length);

    users.forEach((user: any, index: number) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password exists: ${!!user.password}`);
      console.log(`   Password length: ${user.password?.length || 0}`);
      console.log(`   Password starts with: ${user.password?.substring(0, 10) || "N/A"}...`);
      console.log(`   Is bcrypt hash: ${user.password?.startsWith("$2") ? "YES" : "NO"}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkUsers();