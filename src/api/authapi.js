const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'manager', password: 'manager123', role: 'manager' },
  { username: 'sathish', password: 'user123', role: 'user' }, 
];

export const login = ({ username, password }) => {
  const user = mockUsers.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return Promise.resolve(user);
  }
  return Promise.reject('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem('loggedInUser');
  return Promise.resolve();
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
};
