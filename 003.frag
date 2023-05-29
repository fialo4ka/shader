/* Main function, uniforms & utils */
#ifdef GL_ES
    precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec4 palette( in float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.30, 0.20, 0.20);
    return vec4(a + b*cos( 6.28318*(c*t+d) ),1);
}

vec4 cirkl(vec2 uv, vec2 center, float radius, vec4 color){
    if (length(uv - center) < radius)
        return color;
    else return vec4(0.0, 0.0, 0.0, 1.0);
}



void main(){
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.xy;
    uv = fract(uv *2.) - 0.5;
    vec2 p1 = vec2(0.);
    for (float z = -5.; z< 5.; z++){   
        for (float i = 1.; i< 50.; i++){   
            vec2 p2 = vec2(sin(z*0.1+u_time)/i,cos(z*0.1+u_time)/i);  
            gl_FragColor += cirkl(uv, p2, 0.0005 *i, palette( u_time *0.4));                
        }
    }
    gl_FragColor += cirkl(uv, p1, 0.05,palette( u_time *0.4)); 
}
