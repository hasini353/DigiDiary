const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Homework = require("./models/Homework");
const Teacher = require("./models/Teacher");
const Parent = require("./models/Parent");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB Connection
mongoose.connect("mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/digidiary?appName=Cluster0")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// ✅ REGISTER TEACHER
app.post("/register-teacher", async (req, res) => {
  try {
    const { name, email, phone, school, schoolAddress, password } = req.body;

    // Validation
    if (!name || !email || !phone || !school || !schoolAddress || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Check if teacher exists
    const existingTeacher = await Teacher.findOne({ $or: [{ email }, { phone }] });
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: "Teacher already exists" });
    }

    // Create teacher
    const teacher = new Teacher({ name, email, phone, school, schoolAddress, password });
    await teacher.save();

    res.json({ success: true, message: "Teacher registered successfully ✅", teacher });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ REGISTER PARENT
app.post("/register-parent", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: "Name, phone, and password required" });
    }

    // Check if parent exists
    const existingParent = await Parent.findOne({ $or: [{ email }, { phone }] });
    if (existingParent) {
      return res.status(400).json({ success: false, message: "Parent already exists" });
    }

    // Create parent
    const parent = new Parent({ name, email, phone, password, students: [] });
    await parent.save();

    res.json({ success: true, message: "Parent registered successfully ✅", parent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ LOGIN TEACHER
app.post("/login-teacher", async (req, res) => {
  try {
    const { email, phone, password, schoolName, schoolAddress } = req.body;

    if (!email || !phone || !password || !schoolName || !schoolAddress) {
      return res.status(400).json({ success: false, message: "Email, phone, password, school name and address required" });
    }

    const teacher = await Teacher.findOne({ email, phone, school: schoolName, schoolAddress });
    
    if (!teacher) {
      return res.json({ success: false, message: "Teacher not found for this school branch" });
    }

    // Simple password check (in production, use bcrypt)
    if (teacher.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({ 
      success: true, 
      message: "Login successful ✅",
      teacher: { name: teacher.name, email: teacher.email, phone: teacher.phone, school: teacher.school, schoolAddress: teacher.schoolAddress }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ LOGIN PARENT
app.post("/login-parent", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "Email/phone and password required" });
    }

    // Find parent by email or phone
    const parent = await Parent.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    
    if (!parent) {
      return res.json({ success: false, message: "Parent not found" });
    }

    // Simple password check (in production, use bcrypt)
    if (parent.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({ 
      success: true, 
      message: "Login successful ✅",
      parent: { name: parent.name, email: parent.email, phone: parent.phone, students: parent.students }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ ADD HOMEWORK
app.post("/add-homework", async (req, res) => {
  try {
    const { class: cls, section, subject, date, text, teacher, school, schoolAddress } = req.body;

    // Validation
    if (!cls || !section || !subject || !date || !text || !teacher || !school || !schoolAddress) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hw = new Homework(req.body);
    await hw.save();
    res.json({ success: true, message: "Homework saved ✅" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET ALL HOMEWORK
app.get("/get-homework", async (req, res) => {
  try {
    const data = await Homework.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD CHILD TO PARENT
app.post("/add-child", async (req, res) => {
  try {
    const { parentPhone, child } = req.body;

    if (!parentPhone || !child) {
      return res.status(400).json({ success: false, message: "Parent phone and child name required" });
    }

    const parent = await Parent.findOne({ phone: parentPhone });

    if (!parent) {
      return res.json({ success: false, message: "Parent not found" });
    }

    if (parent.students.includes(child)) {
      return res.json({ success: false, message: "Child already added" });
    }

    parent.students.push(child);
    await parent.save();

    res.json({ success: true, message: "Child added ✅", students: parent.students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET ALL SCHOOL BRANCHES
app.get("/get-schools", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    const uniqueBranches = Array.from(new Set(
      teachers.map(t => JSON.stringify({ school: t.school, schoolAddress: t.schoolAddress }))
    )).map(branch => JSON.parse(branch));
    res.json(uniqueBranches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});

