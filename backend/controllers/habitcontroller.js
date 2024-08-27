const Habit = require('../models/habit');

exports.createHabit = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const habit = new Habit({
      userId: req.user.id,
      title,
      description,
      category,
    });
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id, isDeleted: false });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { title, description, category, isCompleted } = req.body;
    let habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: 'Habit not found' });
    if (habit.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title, description, category, isCompleted },
      { new: true }
    );
    res.json(habit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.json({ msg: 'Habit deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};