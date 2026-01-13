'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AdminLayout from '@/components/layout/AdminLayout';
import { mockUsers } from './mockUsers';
import './users.css';

export type UserRole = 'admin' | 'staff';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'staff' as UserRole,
    status: 'active' as UserStatus,
  });

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', email: '', role: 'staff', status: 'active' });
    setOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editing.id ? { ...user, ...form } : user
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setOpen(false);
  };

  const filtered = useMemo(() => {
    return users.filter((item) => {
      const matchText = item.name.toLowerCase().includes(search.toLowerCase());

      return matchText;
    })
  }, [search, users])

  return (
    <AdminLayout>
      <div>
        <div className="users-header">
          <h2>User Management</h2>
          <div className='users-filters'>
            <TextField
                size="small"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={openCreate}>
              Create User
            </Button>
          </div>
        </div>

        <div className="users-table">
          <div className="table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {filtered.map((user) => (
            <div key={user.id} className="table-row">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <div>
                <span className={`status-${user.status}`}>{user.status}</span>
              </div>
              <div>
                <button
                  className="edit-btn"
                  onClick={() => openEdit(user)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            {editing ? 'Edit User' : 'Create User'}
          </DialogTitle>

          <DialogContent className="form-grid">
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              select
              label="Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as UserRole })
              }>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as UserStatus })
              }>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
