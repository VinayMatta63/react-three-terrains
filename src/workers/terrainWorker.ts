// fbmWorker.js

// Utility for consistent fract like GLSL
const fract = (x: number) => x - Math.floor(x);

// Simple 2D hash function
function hash(x: number, y: number) {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
}

// 2D noise function
function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);

  const xf = x - xi;
  const yf = y - yi;

  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);

  const u = xf * xf * (3.0 - 2.0 * xf);
  const v = yf * yf * (3.0 - 2.0 * yf);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

// FBM (Fractal Brownian Motion)
function fbm(x: number, y: number, octaves = 5) {
  let value = 0.0;
  let amplitude = 0.5;
  let frequency = 1.0;

  for (let i = 0; i < octaves; i++) {
    value += noise(x * frequency, y * frequency) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

// Web worker message handling
onmessage = function (e) {
  const { x, y, frequency = 1.0, scale = 1.0, elevationScalar = 1.0 } = e.data;

  const scaledX = x / scale;
  const scaledY = y / scale;

  const rawElevation = fbm(scaledX * frequency, scaledY * frequency);
  const elevation = rawElevation * elevationScalar;

  postMessage(elevation);
};
