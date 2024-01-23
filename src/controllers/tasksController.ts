export const getTasks = (req, res) => {
  res.status(200).json({
    success: true,
    tasks: [],
  });
};
