const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // your password here
  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin",
  });
  console.log("✅ Admin created: username=admin, password=admin123");
  mongoose.disconnect();
});
