#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}


vec4 cirkl(vec2 uv, vec2 center, float radius, vec4 color){
    if (length(uv - center) < radius)
        return color;
    else return vec4(0.0, 0.0, 0.0, 0.0);
}
vec3 palette(in float t)
{
    // vec3 a = vec3(0.5, 0.5, 0.5);
    // vec3 b = vec3(0.5, 0.5, 0.5);
    // vec3 c = vec3(1.0, 1.0, 1.0);
    // vec3 d = vec3(0.30, 0.20, 0.20);
    // vec3 a = vec3(0.138, 0.298, 1.688);
    // vec3 b = vec3(-0.127, 0.431, 0.386);
    // vec3 c = vec3(0.178, 0.619, 0.988);
    // vec3 d = vec3(-0.782, 3.513, 2.295);
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 0.7, 0.4);
    vec3 d = vec3(0.00, 0.15, 0.20);
    return a + b*cos( 6.28318*(c*t+d) );
    					
}


void main() {
    vec2 uv = (gl_FragCoord.xy *2. ) / u_resolution.y;

    for(float i=1.;i < 50.;i++){
        vec4 color = cirkl(uv, vec2(random(vec2(sin(i),sin(i)))*2., 
                                    random(vec2(pow(i-random(vec2(i,i)),2.)+exp(i*u_time*pow(0.1,7.)),sin(i*u_time*pow(0.1,7.)))))
                                    *1.,
                                random(vec2(exp(i),i))*0.1,
                                vec4(palette(i), 1.0));
        if (gl_FragColor.x == 0.)      
            gl_FragColor += color;
    }
}