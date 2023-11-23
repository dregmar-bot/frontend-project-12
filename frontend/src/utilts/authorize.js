
const authorize = (user, cb) => {
  cb(user);
  localStorage.activeUser = JSON.stringify(user);
}

export default authorize;
