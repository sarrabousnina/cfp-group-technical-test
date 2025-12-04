import { FastifyInstance } from 'fastify';
import { createSchema, updateSchema } from '../schemas/property.schema';
import * as service from '../services/property.service';

export async function propertyRoutes(fastify: FastifyInstance) {
  // GET /properties
  fastify.get('/properties', async () => {
    return service.findAll();
  });

  // GET /properties/:id
  fastify.get<{ Params: { id: string } }>('/properties/:id', async (req, reply) => {
    const prop = service.findById(req.params.id);
    if (!prop) return reply.status(404).send({ error: 'Not found' });
    return prop;
  });

  // POST /properties
  fastify.post<{ Body: any }>('/properties', async (req, reply) => {
    try {
      const data = createSchema.parse(req.body);
      const prop = service.createOne(data);
      return reply.status(201).send(prop);
    } catch (err) {
      return reply.status(400).send({ error: 'Validation failed' });
    }
  });

  // PUT /properties/:id
  fastify.put<{ Params: { id: string }; Body: any }>('/properties/:id', async (req, reply) => {
    try {
      const data = updateSchema.parse(req.body);
      const prop = service.updateOne(req.params.id, data);
      if (!prop) return reply.status(404).send({ error: 'Not found' });
      return prop;
    } catch (err) {
      return reply.status(400).send({ error: 'Validation failed' });
    }
  });

  // DELETE /properties/:id
  fastify.delete<{ Params: { id: string } }>('/properties/:id', async (req, reply) => {
    const ok = service.deleteOne(req.params.id);
    if (!ok) return reply.status(404).send({ error: 'Not found' });
    return reply.status(204).send();
  });
}