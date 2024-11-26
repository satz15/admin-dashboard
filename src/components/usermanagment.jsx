import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, editUser, deleteUser } from '../api/mockapi.js';
import { getLoggedInUser } from '../api/authapi.js';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAddUser = async () => {
    await addUser(newUser);
    setUsers(await fetchUsers());
    setNewUser({ name: '', email: '', role: 'User', status: 'Active' });
  };

  const handleEditUser = async (id, updatedUser) => {
    await editUser(id, updatedUser);
    setUsers(await fetchUsers());
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(await fetchUsers());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loggedInUser.role === 'admin' && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded mr-2"
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-cyan-950 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      )}
      <table className="table-auto w-full bg-white rounded shadow">
  <thead>
    <tr>
      <th className="border px-4 py-2 text-center text-lg">Name</th>
      <th className="border px-4 py-2 text-center text-lg">Email</th>
      <th className="border px-4 py-2 text-center text-lg">Role</th>
      <th className="border px-4 py-2 text-center text-lg">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td className="border px-4 py-2 text-center align-middle text-lg">{user.name}</td>
        <td className="border px-4 py-2 text-center align-middle text-lg">{user.email}</td>
        <td className="border px-4 py-2 text-center align-middle text-lg">{user.role}</td>
        <td className="border px-4 py-2 text-center align-middle text-lg">
          {(loggedInUser.role === 'admin' || loggedInUser.role === 'manager') && (
            <button
              className="text-blue-500 mr-2"
              onClick={() => setEditingUser(user.id)}
            >
              <FiEdit />
            </button>
          )}
          {loggedInUser.role === 'admin' && (
            <button
              className="text-red-500"
              onClick={() => handleDeleteUser(user.id)}
            >
              <FiTrash2 />
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default UserManagement;
