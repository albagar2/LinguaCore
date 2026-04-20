import request from 'supertest';
import app from '../app';

describe('Auth Module', () => {
  it('should return 401 for unauthorized lesson access', async () => {
    const res = await request(app).get('/api/lessons');
    expect(res.statusCode).toEqual(401);
  });

  it('should have a working health check', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('ok');
  });
});
