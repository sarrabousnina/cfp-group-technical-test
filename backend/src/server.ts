import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Backend is ready on http://localhost:${PORT}`);
});