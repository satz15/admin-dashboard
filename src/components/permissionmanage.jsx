// const mockUsers = [
//     { username: 'admin', password: 'admin123', role: 'admin' },
//     { username: 'manager', password: 'manager123', role: 'manager' },
//     { username: 'user', password: 'user123', role: 'user' }, // Added user role
//   ];
    
//     let mockRoles = [
//       // { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
//       { id: 2, name: 'Manager', permissions: ['Read', 'Write', 'Delete'] },
//       { id: 3, name: 'Editor', permissions: ['Read', 'Write'] },
//     ];
    
//     // User CRUD Operations
//     let nextUserId = mockUsers.length + 1;
//     export const addUser = (newUser) => {
//       const id = nextUserId++;
//       mockUsers.push({ id, ...newUser });
//       return Promise.resolve();
//     };
    
//     export const fetchUsers = () => Promise.resolve([...mockUsers]);
    
//     export const editUser = (id, updatedUser) => {
//       const index = mockUsers.findIndex(user => user.id === id);
//       if (index !== -1) {
//         mockUsers[index] = { ...mockUsers[index], ...updatedUser };
//       }
//       return Promise.resolve(mockUsers[index]);
//     };
    
//     export const deleteUser = (id) => {
//       mockUsers = mockUsers.filter(user => user.id !== id);
//       return Promise.resolve();
//     };
    
//     // Role CRUD Operations
//     let nextRoleId = mockRoles.length + 1;
//     export const fetchRoles = () => Promise.resolve([...mockRoles]);
    
//     export const addRole = (newRole) => {
//       const id = nextRoleId++;
//       mockRoles.push({ id, ...newRole });
//       return Promise.resolve();
//     };
    
//     export const editRole = (id, updatedRole) => {
//       const index = mockRoles.findIndex(role => role.id === id);
//       if (index !== -1) {
//         mockRoles[index] = { 
//           ...mockRoles[index], 
//           ...updatedRole, 
//           permissions: Array.isArray(updatedRole.permissions) 
//             ? updatedRole.permissions 
//             : mockRoles[index].permissions,
//         };
//       }
//       return Promise.resolve(mockRoles[index]);
//     };
    
//     export const deleteRole = (id) => {
//       mockRoles = mockRoles.filter(role => role.id !== id);
//       return Promise.resolve();
//     };
  
//     export const login = ({ username, password }) => {
//       const user = mockUsers.find(
//         (user) => user.username === username && user.password === password
//       );
//       if (user) {
//         localStorage.setItem('loggedInUser', JSON.stringify(user));
//         return Promise.resolve(user);
//       }
//       return Promise.reject('Invalid credentials');
//     };
    
//     export const logout = () => {
//       localStorage.removeItem('loggedInUser');
//       return Promise.resolve();
//     };
    
//     export const getLoggedInUser = () => {
//       const user = localStorage.getItem('loggedInUser');
//       return user ? JSON.parse(user) : null;
//     };
    