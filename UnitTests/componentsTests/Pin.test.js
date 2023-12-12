import { Pin } from "../../components/Pin";

// Test pin colors
describe('Pin function', () => {
  it('returns correct color for rating 2', () => {
    const result = Pin(2);
    expect(result).toBe('#031cfc');
  });

  it('returns correct color for rating 0', () => {
    const result = Pin(0);
    expect(result).toBe('#f7a202');
  });

  it('returns correct color for rating 1', () => {
    const result = Pin(1);
    expect(result).toBe('#f3f702');
  });

  it('returns null for unknown rating', () => {
    const result = Pin(3);
    expect(result).toBeNull();
  });
});
