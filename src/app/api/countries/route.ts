import { NextResponse } from 'next/server';
const Country_base = process.env.NEXT_PUBLIC_COUNTRYBASE;

export async function GET() {
  try {
    console.log('Country_base', Country_base)

    const res = await fetch(`${Country_base}v3.1/all?fields=name,cca2,region,population,flags`);
    const data = await res.json();

    // console.log('data', data)

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch countries' }, { status: 500 });
  }
}
