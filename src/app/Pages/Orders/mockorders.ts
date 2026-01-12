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

export const mockOrders: Order[] = [
  {
    id: 1,
    customerName: 'Stephen Curry',
    date: '2025-01-02',
    total: 600,
    status: 'completed',
    products: [
      { productId: 1, title: 'Curry 6 Shoe', price: 50, quantity: 2 },
      { productId: 2, title: 'Mac Book', price: 500, quantity: 1 },
    ],
  },
  {
    id: 2,
    customerName: 'Lebron James',
    date: '2025-01-05',
    total: 450,
    status: 'pending',
    products: [
      { productId: 3, title: 'Mac Book 2', price: 450, quantity: 1 },
    ],
  },
  {
    id: 3,
    customerName: 'Kevin Durant',
    date: '2025-01-01',
    total: 500,
    status: 'completed',
    products: [
      { productId: 3, title: 'Rocket Jersey', price: 250, quantity: 2 },
    ],
  },
  {
    id: 4,
    customerName: 'Luka Doncic',
    date: '2025-01-01',
    total: 1000,
    status: 'cancelled',
    products: [
      { productId: 3, title: 'Rocket Jersey', price: 250, quantity: 1 },
      { productId: 2, title: 'Mac Book', price: 500, quantity: 1 },
      { productId: 1, title: 'Curry 6 Shoe', price: 50, quantity: 6 },
    ],
  },
  {
    id: 5,
    customerName: 'James Harden',
    date: '2025-01-02',
    total: 850,
    status: 'completed',
    products: [
      { productId: 1, title: 'Curry 6 Shoe', price: 50, quantity: 2 },
      { productId: 3, title: 'Rocket Jersey', price: 100, quantity: 1 },
      { productId: 6, title: 'item abcdef', price: 300, quantity: 1 },
      { productId: 7, title: 'item ghijkl', price: 50, quantity: 1 },
      { productId: 8, title: 'item cccvvvv', price: 50, quantity: 1 },
      { productId: 100, title: 'item 123qweqwe', price: 200, quantity: 1 },
    ],
  },
];
