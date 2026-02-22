import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';
import { Request, Response } from 'express';

describe('dogController', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 3: Positive test for dogController
  it('should return success true and dog image data', async () => {
    const mockServiceData = {
      imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
      status: 'success',
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockServiceData);

    const mockReq = {} as Request;
    const mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    await getDogImage(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData,
    });
  });
});