'use client';

import { Paper, Tooltip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';
import './Dashboard.css';

const overviewStats = [
  { label: 'Total Products', value: 120 },
  { label: 'Total Orders', value: 58 },
  { label: 'Total Users', value: 24 },
];

const salesData = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 18 },
  { name: 'Wed', orders: 9 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 16 },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="dashboard-page">
        <div className='text-lg'>
          Dashboard Overview
        </div>

        <div className="stat-grid">
          {overviewStats.map((item) => (
            <Paper key={item.label} className="stat-card" elevation={1}>
              <Tooltip title={item.label} arrow>
                <div className="stat-label text-sm">
                  {item.label}
                </div>
              </Tooltip>
              <div className="stat-value text-xl">
                {item.value}
              </div>
            </Paper>
          ))}
        </div>

        <Paper className="chart-card" elevation={1}>
          <div className="chart-header">
            <div style={{ fontWeight: 600 }}>
              Orders This Week
            </div>
            <div>
              Last 5 days
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="orders"
                  fill="#4cafef"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>
    </AdminLayout>
  );
}
