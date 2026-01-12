'use client';

import './products.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Snackbar, Alert,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminLayout from '@/components/layout/AdminLayout';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../../api';
import ImageSlider from '@/components/ImageSlider';

type ProductStatus = 'active' | 'inactive';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  images?: string[];
}

const productobject = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  category: z.string(),
  price: z.number().min(0),
  stock: z.number().min(0),
  status: z.enum(['active', 'inactive']),
  images: z.any().optional(),
});

type FormData = z.infer<typeof productobject>;

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState('');
    const [showmessage, setshowmessage] = useState('');
    const [editing, setEditing] = useState<Product | null>(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<'all' | ProductStatus>('all');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(productobject),
        defaultValues: {
          name: '',
          description: '',
          category: '',
          price: 0,
          stock: 0,
          status: 'active',
          images: [],
        },
    });

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const returnProducts = await fetchProducts();
            console.log('returnProducts', returnProducts)

            if (returnProducts.success) {
                const mapped = returnProducts.data.products.map((p: any) => ({
                    id: p.id,
                    name: p.title,
                    description: p.description,
                    category: p.category,
                    price: p.price,
                    stock: p.stock,
                    status: Math.random() > 0.5 ? 'active' : 'inactive',
                    // image: p.images[0] || '',
                    images: Array.isArray(p.images) ? p.images : [],
                }));
                setProducts(mapped);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }

    const filtered = useMemo(() => {
        return products.filter((item) => {
            const matchText =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                status === 'all' ? true : item.status === status;

            return matchText && matchStatus;
        });
    }, [products, search, status]);

    const setOpenAddProduct = () => {
        form.reset({
          name: '',
          description: '',
          category: '',
          price: 0,
          stock: 0,
          status: 'active',
          images: [],
        });
        setImagePreviews([]);
        setEditing(null);
        setOpen(true);
    }

    const onSubmit = async (data: FormData) => {
      try {

        const mergedData = {
          ...data,
          images: imagePreviews.length > 0 ? imagePreviews : data.images,
        };

        if (editing) {
          const Update = await updateProduct(editing.id, mergedData);

        //   console.log('Update', Update)
          if (Update.success) {

            // await getProducts(); <= shoulde be call like this but since this is fake api unable to really update 

            setProducts((prev) =>
              prev.map((p) => (p.id === editing.id ? { ...p, ...mergedData } : p))
            );
            setMessage('Product updated successfully!');
            setshowmessage('success');
          } else {
            console.error('Update failed:', Update.message);
            setMessage(Update.message || 'action failed');
            setshowmessage('error');
          }
        } else {
          const Add = await addProduct(mergedData);
          console.log('Add', Add)
          if (Add.success) {
            // await getProducts(); <= shoulde be call like 
            const newProduct = {
              id: Add.data.id || Date.now(),
              ...mergedData,
            };
            setProducts((prev) => [...prev, newProduct]);
            setMessage('Product added successfully!');
            setshowmessage('success');
          } else {
            setMessage(Add.message || 'action failed');
            setshowmessage('error');
            console.error('Add failed:', Add.message);
          }
        }

        form.reset();
        setEditing(null);
        setOpen(false);
      } catch (error) {
        console.error('Submit product failed:', error);
      } finally {
        setImagePreviews([]);
      }
    };

    const onEdit = (p: Product) => {
        setEditing(p);
        form.reset({
          name: p.name,
          description: p.description,
          category: p.category,
          price: p.price,
          stock: p.stock,
          status: p.status ?? 'active',
          images: p.images ?? [],
        });
        setOpen(true);
    };
    

    const closeModal = () => {
        setOpen(false)
        setImagePreviews([]);
    }

    const onDelete = async (id: number) => {
        try {
          const deleteproduct = await deleteProduct(id);
          console.log('deleteproduct', deleteproduct)

          if (deleteproduct.success) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
            // getProducts(); <= should call like this with the real API
            setMessage('Product deleted successfully!');
            setshowmessage('success');
          } else {
            setMessage(deleteproduct.message || 'delete failed');
            setshowmessage('error');
            console.error('Delete failed:', deleteproduct.message);
          }
        } catch (error) {
          setMessage('delete failed');
          setshowmessage('error');
          console.error('Delete product error:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="products-page">
                <div className="products-header">
                    <div className="products-title text-lg">Products</div>

                    <div className="products-filters">
                        <TextField
                            sx={{
                              minWidth: 200,
                              '& .MuiInputBase-input': {
                                color: 'var(--foreground)',
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'var(--searchborder)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'var(--foreground)',
                                },
                              },
                            }}
                            size="small"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <TextField
                            size="small"
                            sx={{
                              '& .MuiInputBase-input': {
                                color: 'var(--foreground)',
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'var(--searchborder)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'var(--foreground)',
                                },
                              },
                            }}
                            select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>

                        <Button variant="contained" onClick={() => setOpenAddProduct()}>
                            Add Product
                        </Button>
                    </div>
                </div>

                <div className="products-table-wrapper">
                    <div className="product-table">
                        <div className="table-header text-sm">
                            <div style={{ minWidth: 100, width: 'calc(100%/2)'}}>Image</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>Name</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>Category</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>Price</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>Stock</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}}>Status</div>
                            <div style={{ minWidth: 100, width: 'calc(100%)'}} className="actions">Actions</div>
                        </div>
                        {products.length === 0 && <div className='text-sm' style={{ textAlign: 'center', padding: 10 }}>= No Product =</div>}
                        {products.length > 0 && 
                        <div className="table-body text-sm">
                            {filtered.map((product) => (
                                <div key={product.id} className="table-row">
                                    <div style={{ minWidth: 100, width: 'calc(100%/2)'}}>
                                      {product.images ? (
                                        <ImageSlider images={product.images || []} />
                                      ) : (
                                        <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 6 }} />
                                      )}
                                    </div>
                                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>{product.name}</div>
                                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>{product.category}</div>
                                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>RM {product.price}</div>
                                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>{product.stock}</div>
                                    <div style={{ minWidth: 100, width: 'calc(100%)'}}>
                                        <span className={`status ${product.status}`}>
                                            {product.status}
                                        </span>
                                    </div>
                                    <div className="actions" style={{ minWidth: 100, width: 'calc(100%)'}}>
                                        <div className="EditButton" onClick={() => onEdit(product)}>
                                            Edit
                                        </div>
                                        <div className="DeleteButton" onClick={() => onDelete(product.id)}>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                </div>

                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                  <DialogTitle>{editing ? 'Edit Product' : 'New Product'}</DialogTitle>
                  <DialogContent>
                    <div className="form-grid">
                      <Button variant="outlined" component="label">
                        Upload Images
                        <input
                          hidden
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setImagePreviews(files.map((f) => URL.createObjectURL(f)));
                          }}
                        />
                      </Button>
                      
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {imagePreviews.map((img, i) => (
                          <img key={i} src={img} width={60} height={60} />
                        ))}
                      </div>
                    
                      <TextField label="Name" {...form.register('name')} />
                      <TextField label="Category" {...form.register('category')} />
                      <TextField label="Description" {...form.register('description')} />
                      <TextField
                        label="Price"
                        type="number"
                        {...form.register('price', { valueAsNumber: true })}
                      />
                      <TextField
                        label="Stock"
                        type="number"
                        {...form.register('stock', { valueAsNumber: true })}
                      />
                      <Controller
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <TextField
                            select
                            label="Status"
                            fullWidth
                            {...field}>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                          </TextField>
                        )}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => closeModal()}>Cancel</Button>
                    <Button variant="contained" onClick={form.handleSubmit(onSubmit)}>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <Snackbar
                  open={!!Message}
                  autoHideDuration={3000}
                  onClose={() => setMessage('')}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                  <Alert onClose={() => setMessage('')} severity={showmessage as 'success' | 'error'} sx={{ width: '100%' }}>
                    {Message}
                  </Alert>
                </Snackbar>
            </div>
        </AdminLayout>
    );
}
