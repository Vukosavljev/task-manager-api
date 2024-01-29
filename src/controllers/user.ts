export const register = (req, res) => {
  const {
    body: { name, email, password },
  } = req;
  res.send({ name, email, password });
};

export const login = (req, res) => {
  const {
    body: { email, password },
  } = req;
  res.send({ email, password });
};

export const logout = (req, res) => {
  const {
    body: { email },
  } = req;
  res.send({ email });
};
