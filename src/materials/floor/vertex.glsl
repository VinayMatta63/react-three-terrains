uniform float uElevationScalar;
uniform float uFrequency;
uniform float uValleyThreshold;
uniform float uPlateauThreshold;
uniform vec2 uPlayerPosition;
uniform float uScale;

varying vec2 vUv;
varying float vElevation;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    value += noise(p * frequency) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

// void main() {
//   vUv = uv;

//   vec2 distortedUV = uv + vec2(
//   sin(uv.y * 10.0) * 0.05,
//   cos(uv.x * 10.0) * 0.05
//   );

//   float rawElevation = fbm(distortedUV * uFrequency);

//   rawElevation = pow(rawElevation, 1.25);

//   float elevation;
//   if (rawElevation < uValleyThreshold) {
//     elevation = 0.0; // valley plane
//   } else if (rawElevation > uPlateauThreshold) {
//     elevation = 1.0; // mountain plateau
//   } else {
//     elevation = smoothstep(0.2, 0.8, rawElevation);
//   }

//   vElevation = elevation;

//   vec3 displacedPosition = position;
//   displacedPosition.z += elevation * uElevationScalar;

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
// }

void main() {
    vUv = uv;
    
    // Calculate world space UV coordinates that follow the player
    vec2 worldUV = (uv * uScale + uPlayerPosition.xy);
    
    // Add distortion to the world UV coordinates
    vec2 distortedUV = worldUV + vec2(
        sin(worldUV.y * 10.0) * 0.05,
        cos(worldUV.x * 10.0) * 0.05
    );
    
    // Calculate raw elevation with distorted coordinates
    float rawElevation = fbm(distortedUV * uFrequency);
    rawElevation = pow(rawElevation, 1.25);
    
    // Apply thresholds for more defined terrain features
    float elevation;
    if (rawElevation < uValleyThreshold) {
        elevation = 0.0; // valley plane
    } else if (rawElevation > uPlateauThreshold) {
        elevation = 1.0; // mountain plateau
    } else {
        elevation = smoothstep(uValleyThreshold, uPlateauThreshold, rawElevation);
    }
    
    vElevation = elevation;
    
    // Apply elevation to position
    vec3 pos = position;
    pos.z += elevation * uElevationScalar;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}