import Fastify from 'fastify';
import cors from '@fastify/cors';
import { propertyRoutes } from './routes/property.routes';

const app = Fastify({ logger: false });

app.register(cors, {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false,
});

app.register(propertyRoutes, { prefix: '/api' });

export default app;