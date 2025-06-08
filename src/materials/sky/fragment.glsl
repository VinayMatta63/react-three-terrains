uniform vec3 colorTop;
uniform vec3 colorBottom;
uniform vec3 colorMiddle;
uniform float blendMiddle;
uniform float blendIntensity;
varying vec2 vUv;

void main() {
  vec3 mixedTop = mix(colorMiddle, colorTop, smoothstep(0.498, 0.502, vUv.y));
  vec3 mixedBottom = mix(colorMiddle, colorBottom, smoothstep(0.502, 0.498, vUv.y));
  vec3 mixedColor = mix(colorBottom, colorTop, smoothstep(0.45, 0.55, vUv.y));

  float blendMiddle = smoothstep(0.5 - blendMiddle, 0.5, vUv.y)  * smoothstep(0.5 + blendMiddle, 0.5, vUv.y) * blendIntensity;
  vec3 finalColor = mix(mixedColor, colorMiddle, blendMiddle);
  gl_FragColor = vec4(finalColor, 1.0);
  
}