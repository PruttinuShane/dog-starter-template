import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 1: Positive test for dogService
  it('should return imageUrl and success status when API call succeeds', async () => {
    const mockResponse = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal('fetch', mockFetch);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockResponse.message);
    expect(result.status).toBe('success');
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  // Test 2: Negative test for dogService
  it('should throw an error when API call fails', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal('fetch', mockFetch);

    await expect(getRandomDogImage()).rejects.toThrow('Failed to fetch dog image');
  });
});