export const base64String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
jest.mock('merge-images');
import mergeImages from 'merge-images';
mergeImages.mockResolvedValue(base64String);
