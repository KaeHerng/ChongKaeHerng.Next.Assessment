'use client';
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 6 }} />
    );
  }

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div style={{ position: 'relative', width: 50 }}>
      <img
        src={images[index]}
        alt=""
        style={{
          width: 50,
          height: 50,
          objectFit: 'cover',
          borderRadius: 6,
        }}
      />

      {images.length > 1 && (
        <>
          <button onClick={prev} style={navStyle('left')}>‹</button>
          <button onClick={next} style={navStyle('right')}>›</button>
        </>
      )}
    </div>
  );
}

const navStyle = (pos: 'left' | 'right') => ({
  position: 'absolute' as const,
  top: '50%',
  [pos]: -8,
  transform: 'translateY(-50%)',
  background: '#fff',
  borderRadius: '50%',
  border: '1px solid #ddd',
  width: 16,
  height: 16,
  fontSize: 12,
  cursor: 'pointer',
});
