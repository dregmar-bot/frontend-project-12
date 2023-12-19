const authorize = (user, cb) => {
  cb(user);
  const { username, password, token } = user;
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('token', token);
};

export default authorize;
