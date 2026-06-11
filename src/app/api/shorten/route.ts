import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Server-side call to TinyURL to bypass CORS restrictions
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Gym Demo Generator)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const shortUrl = await response.text();
    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('Error in API shorten:', error);
    return NextResponse.json({ error: 'Error shortening URL' }, { status: 500 });
  }
}
