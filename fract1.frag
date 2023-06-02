
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

const float MAX_ITERATION = 128.;

float mandelbrot(vec2 uv){
    vec2 c = 5.*uv - vec2(0.7,0.);
    vec2 z = vec2(0.);
    float iter = 0.;
    for(float i=0.; i<MAX_ITERATION;i++){
        z= vec2(z.x*z.x - z.y*z.y, 2.*z.x*z.y)+c*0.5;
        if(dot(z,z)>6.)
        return iter/MAX_ITERATION;
        iter ++;
    }
    return 0.;

}
vec2 roots(int i)
{
	if (i == 0) return vec2(1, 0); 
	if (i == 1) return vec2(-.5, sqrt(3.)/2.); 
	if (i == 2) return vec2(-.5, -sqrt(3.)/2.);
}
vec3 palette(int i) {
    if (i == 0) return vec3(1.0, 0.0, 0.0); 
	if (i == 1) return vec3(0.0, 1.0, 0.0); 
	if (i == 2) return vec3(0.0, 0.0, 1.0); 
}

#define THRESHOLD 0.1
#define MAX_ITERATIONS 100
#define ANTI_ALIASING 2
vec2 f(vec2 z) {
    float magnitude = dot(z, z);
    return (2.0 * z + vec2(z.x * z.x - z.y * z.y, -2.0 * z.x * z.y) / (magnitude * magnitude)) / 3.0;
}

vec3 man(vec2 z){
    for (int iterations = 0; iterations < MAX_ITERATIONS; ++iterations) {

        //z = (pow(z, vec2(3.)) - 1.)/(3. * dot(z, z) * dot(z, z));
    	// z =  (2.0 * z + vec2(z.x * z.x - z.y * z.y, -2.0 * z.x * z.y) / (dot(z, z) * dot(z, z))) / 3.0;
        //z = (2.* z +  vec2(z.x * z.x - z.y * z.y, -2.0 * z.x * z.y)/ (dot(z, z) * dot(z, z)))/ 3.;
        //z -= 2.*sin(z)/cos(z);
        z -= (vec2(z.x * z.x - z.y * z.y, -2.0 * z.x * z.y));
        for (int root = 0; root < 3; ++root) {
            vec2 difference = z - roots(root);
            float distance = dot(difference, difference);
            if (distance < THRESHOLD) {
    			return palette(root) * (0.75 + 0.25 * cos(0.25 * (float(iterations) - log2(log(distance) / log(THRESHOLD)))));
            }
        }
    }
}


void main()
{    
    // //vec2 uv = gl_FragCoord.xy;
    // vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    // //uv = (uv/ pow(2., u_time) - vec2(-2., 0.));
    // vec4 color =  vec4(0.0,0.0,0.0,1.);
    // float m = man(uv);
    // color += m;
    // gl_FragColor = vec4(color);

    // // gl_FragColor = vec4(vec3(length(man(uv))),1.);
    float zoom  = exp(-5.0 * (0.9 - cos(u_time / 5.0)));
    vec2 center = vec2(0.14918, 0.09001);
    vec3 color = vec3(0);
    
    for (int x = 0; x < ANTI_ALIASING; ++x) {
        for (int y = 0; y < ANTI_ALIASING; ++y) {
            color += man(center + zoom * ((2.0 * (gl_FragCoord.xy + vec2(x, y) / float(ANTI_ALIASING)) - u_resolution.xy) / u_resolution.y - center));
        }
    }
    
    gl_FragColor = vec4(color / float(ANTI_ALIASING * ANTI_ALIASING), 1.0);

}
