export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const response = {
    message: 'Hello, world!',
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
