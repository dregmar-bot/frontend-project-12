const routes = {
  serverApi: {
    dataPath: () => '/api/v1/data',
    loginPath: () => '/api/v1/login',
    signupPath: () => '/api/v1/signup',
  },
  undefinedPath: () => '*',
  chatPath: () => '/',
  loginPath: () => '/login',
  signupPath: () => '/signup',
};

export default routes;
