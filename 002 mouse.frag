#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


void main(){

    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    vec2 mouse = (u_mouse.xy *2. - u_resolution.xy) / u_resolution.xy;
    //uv *= u_resolution / 100.;
    //uv = fract(uv *2.) - 0.5;
    
    vec2 center = mouse;//vec2(.3 * sin(u_time)/2.);
    float radius = 0.3 * sin(u_time*.2)/2.;
    vec3 col = (length(uv - center) > radius 
        ? vec3(0.3882, 0.5529, 0.7412):vec3(0.8588, 0.6667, 0.6667));

    gl_FragColor = vec4(col,1.0);
}
