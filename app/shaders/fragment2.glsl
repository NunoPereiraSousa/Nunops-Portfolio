varying float pulse;
varying vec2 vUv;
varying vec3 vNormal;

uniform float time;

void main()
{
    float sinePulse = 1. + sin(vUv.x * 10. + time * 10.) * 0.5;

    gl_FragColor = vec4(vUv.x, sinePulse * 0.7, sinePulse, 1.);
    gl_FragColor = vec4(vUv.x, sinePulse, sinePulse, 1.);
    gl_FragColor = vec4(vUv.x, 0.5, sinePulse, 1.);

    // second theme
    gl_FragColor = vec4(vUv.x, 0.5,  0.5, 1.);
}