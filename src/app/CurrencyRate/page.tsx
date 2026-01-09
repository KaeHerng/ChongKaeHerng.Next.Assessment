'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import AdminLayout from '@/components/layout/AdminLayout';
import './CurrencyRate.css';

interface CurrencyRate {
  code: string;
  rate: number;
}

export default function CurrencyPage() {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://cdn.moneyconvert.net/api/latest.json');

        console.log('res', res)

        if (!res.ok) {
          throw new Error('Failed to fetch currency rates');
        }

        const data = await res.json();

        console.log('data', data.rate)
        const mappedRates: CurrencyRate[] = Object.entries(data.rates).map(
          ([code, rate]) => ({
            code,
            rate: Number(rate),
          })
        );

        console.log('mappedRates', mappedRates)

        setRates(mappedRates);
      } catch (err) {
        setError('Unable to load currency data');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const filteredRates = useMemo(() => {
    return rates.filter((item) =>
      item.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [rates, search]);

  return (
    <AdminLayout>
      <div className="currency-page">
        <div className="text-lg">Currency Rates</div>

        <Paper className="currency-toolbar" elevation={1}>
          <TextField
            label="Search currency"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        <Paper className="currency-table-card" elevation={1}>
          {loading && (
            <div className="loading-state">
              <CircularProgress size={28} />
            </div>
          )}

          {error && <div className="error-state">{error}</div>}

          {!loading && !error && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell align="right">Rate (vs USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No currency found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRates.map((item) => (
                      <TableRow key={item.code}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell align="right">
                          {item.rate.toFixed(4)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </div>
    </AdminLayout>
  );
}
