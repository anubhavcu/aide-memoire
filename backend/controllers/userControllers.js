// this module will have CRUD operations on /api/user route

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  res.json({
    name: name,
    email: email,
  });
};

module.exports = { registerUser };
