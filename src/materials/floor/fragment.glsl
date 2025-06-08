varying vec2 vUv;
varying float vElevation;

void main() {
  vec3 lowColor = vec3(0.1, 0.3, 0.1);
  vec3 highColor = vec3(0.6, 1.0, 0.6);
  vec3 finalColor = mix(lowColor, highColor, vElevation);

  gl_FragColor = vec4(finalColor, vElevation + 0.25); 
}
