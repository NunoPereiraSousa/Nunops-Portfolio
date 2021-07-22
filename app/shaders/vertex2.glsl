
varying float pulse;
varying vec2 vUv;

uniform float time;
uniform vec2 hover;
uniform float hoverState;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()
{
    vUv = uv;
    vec3 newPosition = position;

    float dist = distance(uv, hover);

    float proximity = 1. - map(dist, 0., 0.8, 0., 1.);

    // newPosition.z = 5. * sin(length(position) * 10. + time * 5.);
     newPosition.z = 5. * sin(length(position) * 4000. + time * 5.);

    // second theme
    // newPosition.z = 2. * sin(length(proximity) + time * 5.);

    // newPosition.z += hoverState*2.*sin(dist*10.);
    newPosition.z += hoverState*2.*sin(proximity*5.);
    pulse = 15.*newPosition.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}