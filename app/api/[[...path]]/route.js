import { NextResponse } from 'next/server'

// Minimal API placeholder — landing page is static.
export async function GET(_req, { params }) {
  return NextResponse.json({ ok: true, path: params?.path || [] })
}

export async function POST(req, { params }) {
  try {
    const body = await req.json().catch(() => ({}))
    return NextResponse.json({ ok: true, received: body, path: params?.path || [] })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
