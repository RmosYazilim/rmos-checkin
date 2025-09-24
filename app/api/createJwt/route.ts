import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

function toBase64Url(input: Buffer | string): string {
  const base64 = Buffer.isBuffer(input)
    ? input.toString('base64')
    : Buffer.from(input, 'utf8').toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function GET() {
  try {
    const claims: Record<string, unknown> = {
      iss: 'https://rmosgeneral.com/',
      iat: 1758271640,
      exp: 1789807640,
      aud: 'https://rmosgeneral.com/',
      sub: 'jrocket@example.com',
      GivenName: 'Johnny',
      Surname: 'Rocket',
      Email: 'jrocket@example.com',
      Role: ['Manager', 'Project Administrator'],
    };

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırması eksik: TOKEN_SECRET tanımlı değil' },
        { status: 400 }
      );
    }

    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = toBase64Url(JSON.stringify(header));
    const encodedPayload = toBase64Url(JSON.stringify(claims));

    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = createHmac('sha256', Buffer.from(secret, 'utf-8'))
      .update(data)
      .digest();
    const encodedSignature = toBase64Url(signature);

    const token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'İç sunucu hatası' }, { status: 500 });
  }
}
