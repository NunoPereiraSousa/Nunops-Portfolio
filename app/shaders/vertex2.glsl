
varying float pulse;
varying vec2 vUv;

uniform float time;
uniform vec2 hover;
uniform float hoverState;

void main()
{
    vUv = uv;
    vec3 newPosition = position;

    float dist = distance(uv, hover);

    newPosition.z = 5. * sin(length(position) * 10. + time * 2.);
    newPosition.z += hoverState*2.*sin(dist*5.);
    pulse = 15.*newPosition.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}