#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    uv *= 10.;
    vec2 ipos = floor(uv);
    vec3 color = vec3(random(ipos ) , 
    random(ipos),
    random(ipos - sin(u_time*pow(0.1,6.))*32.));
    gl_FragColor = vec4(color,1.0);
}