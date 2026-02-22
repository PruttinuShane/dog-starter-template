import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

vi.mock('../services/dogService');

import * as dogService from '../services/dogService';

const app = express();
app.use(express.json());

const { default: dogRouter } = await import('../routes/dogRoutes');
app.use('/api/dogs', dogRouter);

describe('dogRoutes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 4: Positive test for dogRoutes
  it('should return 200 with success true and image url', async () => {
    const mockImageUrl = 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg';

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue({
      imageUrl: mockImageUrl,
      status: 'success',
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockImageUrl);
  });

  // Test 5: Negative test for dogRoutes - returns 500 internal server error
  it('should return 500 with error message when request fails', async () => {
    vi.mocked(dogService.getRandomDogImage).mockRejectedValue(
      new Error('Failed to fetch dog image: Network error')
    );

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
  });
});