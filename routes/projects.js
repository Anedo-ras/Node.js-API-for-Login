const express = require('express');
const Project = require('..././models/project');
const auth = require('../../middleware/authMiddleware');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  const project = new Project({ ...req.body, owner: req.user.id });
  await project.save();
  res.status(201).json(project);
});

router.get('/', async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
});

router.put('/:id', async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ message: 'Project deleted' });
});

module.exports = router;
