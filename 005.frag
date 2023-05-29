#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
#define PI 3.14159265359

vec4 palette( in float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.30, 0.20, 0.20);
    return vec4(a + b*cos( 6.28318*(c*t+d) ),1);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){

    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    //uv *= rotate2d(sin(u_time)*PI);

    vec4 color = vec4(0.0118, 0.0118, 0.0118, 1.0);
    if (mod(uv.x*10., 2.) < 1.)
        color = vec4(0.2588, 0.7059, 0.5373, 1.0);
    if (mod(uv.y*10., 2.) < 1.)
        color += vec4(0.2588, 0.7059, 0.5373, 1.0);
    else color += vec4(0.7412, 0.1725, 0.1725, 1.0);

    gl_FragColor = color;
}
