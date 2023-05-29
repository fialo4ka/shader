#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


vec4 palette( in float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.30, 0.20, 0.20);
    return vec4(a + b*cos( 6.28318*(c*t+d) ),1);
}

void main(){

    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    float angel = sin(u_time/10.);
    for (float z = 1.; z< 32.; z++){   
        uv = (abs(uv)-.5)*1.1;
        uv *= mat2(cos(angel),-sin(angel),sin(angel),cos(angel));
    }
    float res = length(uv);
    gl_FragColor = vec4(length(uv+sin(u_time/13.)), 
        length(uv+cos(u_time/12.)),
        length(uv*sin(u_time/2.)),1);
}
