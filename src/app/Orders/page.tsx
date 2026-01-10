'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AdminLayout from '@/components/layout/AdminLayout';
import { mockOrders } from './mockorders';
import './orders.css';

// types/order.ts
export interface Order {
  id: number;
  customerName: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  products: {
    productId: number;
    title: string;
    price: number;
    quantity: number;
  }[];
}

const statusOptions = ['all', 'pending', 'completed', 'cancelled'] as const;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<typeof statusOptions[number]>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setOrders(mockOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchText = item.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'all' ? true : item.status === status;
      return matchText && matchStatus;
    });
  }, [orders, search, status]);

  return (
    <AdminLayout>
      <div>
        <h2 className='text-lg' style={{ marginBottom: 16 }}>Orders Management</h2>

        <div className="orders-header">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="products-table-wrapper">
            <div className="product-table">
                <div className="table-header text-sm">
                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>Order ID</div>
                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>Customer</div>
                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>Date</div>
                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>Total</div>
                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>Status</div>
                    <div style={{ minWidth: 100, width: 'calc(100%)'}} className="actions">Actions</div>
                </div>
                {filteredOrders.length === 0 && <div className='text-sm' style={{ textAlign: 'center', padding: 10 }}>= No Product =</div>}
                {filteredOrders.length > 0 && 
                <div className="table-body text-sm">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="table-row">
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>{order.id}</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>{order.customerName}</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>{order.date}</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>RM {order.total.toFixed(2)}</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>
                                <span className={`status-${order.status}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="actions" style={{ minWidth: 100, width: 'calc(100%)'}}>
                                <div className="details-button" onClick={() => setSelectedOrder(order)}>
                                    Details
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>

        <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} fullWidth maxWidth="sm">
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {selectedOrder?.products.map((p) => (
              <div key={p.productId} style={{ marginBottom: 8 }}>
                {p.title} - {p.quantity} × RM {p.price}
              </div>
            ))}
            <div style={{ marginTop: 12, fontWeight: 600 }}>
              Total: RM {selectedOrder?.total.toFixed(2)}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
