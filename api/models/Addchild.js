app.post("/add-child", async (req, res) => {
  const { parentPhone, child } = req.body;

  const parent = await Parent.findOne({ phone: parentPhone });

  if (!parent) {
    return res.json({ success: false, message: "Parent not found" });
  }

  parent.students.push(child);
  await parent.save();

  res.json({ success: true });
});
