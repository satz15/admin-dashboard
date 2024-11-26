import React, { useState, useEffect } from 'react';
import { fetchRoles, editRole, deleteRole } from '../api/mockapi.js';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const RoleManagement = ({ userRole }) => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPermissions, setUpdatedPermissions] = useState([]);

  const permissionsOptions = ['Read', 'Write', 'Delete'];

  useEffect(() => {
    fetchRoles().then((data) => {
      if (userRole === 'Manager') {
        data = data.filter((role) => role.name !== 'Admin');
      }
      setRoles(data);
    });
  }, [userRole]);

  const handleEdit = (role) => {
    setEditingRole(role.id);
    setUpdatedName(role.name);
    setUpdatedPermissions(role.permissions);
  };

  const handlePermissionChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setUpdatedPermissions(selectedOptions);
  };

  const saveEdit = async () => {
    const updatedRole = { name: updatedName, permissions: updatedPermissions };
    await editRole(editingRole, updatedRole);
    setRoles(await fetchRoles());
    setEditingRole(null);
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    setRoles(await fetchRoles());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <table className="table-auto w-full bg-slate-100 rounded shadow">
  <thead>
    <tr>
      <th className="border px-4 py-2 text-center text-lg">Role</th>
      <th className="border px-4 py-2 text-center text-lg">Permissions</th>
      <th className="border px-4 py-2 text-center text-lg">Actions</th>
    </tr>
  </thead>
  <tbody>
    {roles.map((role) => (
      <tr key={role.id}>
        {editingRole === role.id ? (
          <>
            <td className="border px-4 py-2 text-center align-middle">
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="border rounded px-2"
              />
            </td>
            <td className="border px-4 py-2 text-center align-middle">
              <select
                multiple
                value={updatedPermissions}
                onChange={handlePermissionChange}
                className="border rounded px-2 w-full"
              >
                {permissionsOptions.map((perm) => (
                  <option key={perm} value={perm}>
                    {perm}
                  </option>
                ))}
              </select>
            </td>
            <td className="border px-4 py-2 text-center align-middle">
              <button className="text-green-500 mr-2" onClick={saveEdit}>
                Save
              </button>
              <button className="text-red-500" onClick={() => setEditingRole(null)}>
                Cancel
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="border px-4 py-2 text-center align-middle text-lg">{role.name}</td>
            <td className="border px-4 py-2 text-center align-middle text-lg">
              {role.permissions.join(', ')}
            </td>
            <td className="border px-4 py-2 text-center align-middle text-lg">
              <button className="text-blue-500 mr-2 " onClick={() => handleEdit(role)}>
                <FiEdit />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(role.id)}>
                <FiTrash2 />
              </button>
            </td>
          </>
        )}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default RoleManagement;
