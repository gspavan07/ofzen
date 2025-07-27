export async function POST(request) {
  const { username, password } = await request.json();
  
  // Simple admin credentials (in production, use proper authentication)
  if (username === 'admin' && password === 'ofzen2024') {
    return Response.json({ success: true, token: 'admin-token' });
  }
  
  return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}