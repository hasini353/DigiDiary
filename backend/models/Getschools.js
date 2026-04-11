app.get("/get-schools", async (req, res) => {
  const teachers = await Teacher.find();

  const schools = [...new Set(teachers.map(t => t.school))];

  res.json(schools);
});
