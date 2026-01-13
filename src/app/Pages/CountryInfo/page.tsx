'use client';

import './CountryInfo.css';
import { TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

interface Country {
  name: string;
  code: string;
  region: string;
  population: number;
  flag: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/countries'); 
      const data = await res.json();
      console.log('data', data)
      const mapped: Country[] = data.map((c: any) => ({
        name: c.name.common,
        code: c.cca2,
        region: c.region,
        population: c.population,
        flag: c.flags.png,
      }));
      setCountries(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return countries.filter((item) => {
      const MatchText = 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase())

        return MatchText;
    })
  }, [countries, search])

  return (
    <AdminLayout>
      <div className="countries-page">
        <div className="countries-header">
          <div className="countries-title text-lg">Countries</div>

          <div className="countries-filters text-sm">
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
              placeholder="Search country or Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="countries-table-wrapper">
          <div className="country-table">
            <div className="table-header text-sm">
              <div style={{ minWidth: 80, width: 'calc(100%/2)' }}>Flag</div>
              <div style={{ minWidth: 160, width: '100%' }}>Country</div>
              <div style={{ minWidth: 100, width: '100%' }}>Code</div>
              <div style={{ minWidth: 120, width: '100%' }}>Region</div>
              <div style={{ minWidth: 160, width: '100%' }}>Population</div>
            </div>

            {loading && (
              <div className="text-sm" style={{ textAlign: 'center', padding: 12 }}>
                Loading...
              </div>
            )}

            {!loading && error && (
              <div className="text-sm" style={{ textAlign: 'center', padding: 12 }}>
                {error}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="text-sm" style={{ textAlign: 'center', padding: 12 }}>
                = No Country =
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="table-body text-sm">
                {filtered.map((country) => (
                  <div key={country.code} className="table-row text-sm">
                    <div style={{ minWidth: 80, width: 'calc(100%/2)' }}>
                      {country.flag ? (
                        <img
                          src={country.flag}
                          alt={country.name}
                          style={{
                            width: 36,
                            height: 24,
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                        />
                      ) : (
                        <div style={{ width: 36, height: 24, background: '#eee' }} />
                      )}
                    </div>

                    <div style={{ minWidth: 160, width: '100%' }}>
                      {country.name}
                    </div>

                    <div style={{ minWidth: 100, width: '100%' }}>
                      {country.code}
                    </div>

                    <div style={{ minWidth: 120, width: '100%' }}>
                      {country.region}
                    </div>

                    <div style={{ minWidth: 160, width: '100%' }}>
                      {country.population.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
