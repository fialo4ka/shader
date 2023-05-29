#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


void main() {
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    //vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 uvW = 6. * uv;//vec2(6. * uv.y,6. * uv.x) ;
    for(float i = 1.; i<8.;i++){
        uvW +=  vec2(0.7/ i* sin(i* uvW.y+u_time+0.3*i)+.8, 0.7/i*sin(uvW.x+u_time+0.3*i)+1.6);
    }

    vec3 color = vec3(0., 0.5*sin(uvW.y)+0., sin(uvW.x+uvW.y)+0.7);
    
    if (uv.y < 0.8)
        gl_FragColor = vec4(color,1.);
    else gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}