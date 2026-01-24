import Skills from "../models/Skill.js";


export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.findOne();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createSkills = async (req, res) => {
  try {
    const exists = await Skills.findOne();
    if (exists) {
      return res
        .status(400)
        .json({ message: "Skills already exist" });
    }

    const skills = await Skills.create(req.body);
    res.status(201).json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateSkills = async (req, res) => {
  try {
    const skills = await Skills.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!skills) {
      return res.status(404).json({ message: "Skills not found" });
    }

    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const  editSkillItem = async (req, res) => {
  try {
    const { category, index, name, icon } = req.body;

    const skills = await Skills.findOne();
    if (!skills || !skills[category]) {
      return res.status(404).json({ message: "Skills not found" });
    }

    if (!skills[category][index]) {
      return res.status(400).json({ message: "Invalid index" });
    }

    skills[category][index].name = name;
    skills[category][index].icon = icon;

    await skills.save();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const  addSkillItem = async (req, res) => {
  try {
    const { category, name, icon } = req.body;

    if (!category || !name || !icon) {
      return res.status(400).json({ message: "All fields required" });
    }

    const skills = await Skills.findOne();
    if (!skills) {
      return res.status(404).json({ message: "Skills document not found" });
    }

    if (!skills[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    skills[category].push({ name, icon });
    await skills.save();

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkillItem = async (req, res) => {
  try {
    const { category, index } = req.body;

    const skills = await Skills.findOne();
    if (!skills || !skills[category]) {
      return res.status(404).json({ message: "Skills not found" });
    }

    skills[category].splice(index, 1);
    await skills.save();

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
