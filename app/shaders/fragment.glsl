varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;

void main()	{

	vec2 newUV = vUv;


	vec4 oceanView = texture2D(uImage, newUV);


	// gl_FragColor = vec4(vNoise,0.,0.,1.);
	gl_FragColor = oceanView;
	gl_FragColor.rgb += 0.01*vec3(vNoise);
	// gl_FragColor = vec4(vNoise,0.,0.,1.);
}