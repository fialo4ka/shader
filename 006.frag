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

float plotPow(float st, float pct){
  return  smoothstep( pct-0.02, pct, st) -
          smoothstep( pct, pct+0.02, st);
}

float plotLineX(float st) {    
    return smoothstep(0.01, 0.0, abs(st));
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(){

    //float coef = sin(u_time * .5)*.8;
    float coef = 5.;

    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    float c = random(u_time * uv);

    float pct = plotPow(uv.y, pow(uv.x, coef)+.08);
    vec3 color = pct*vec3(c, 0.9333, 0.6392);
    pct = plotPow(uv.x, pow(uv.y, coef)+.08);
    color += pct*vec3(c, 0.9333, 0.6392);
    pct = plotPow(uv.y,-pow(uv.x, coef)-.08);
    color += pct*vec3(c, 0.9333, 0.6392);
    pct = plotPow(uv.x,-pow(uv.y, coef)-.08);
    color += pct*vec3(c, 0.9333, 0.6392);   
    color += plotLineX(uv.x)*vec3(c, 0.6353, 0.6118);
    color += plotLineX(uv.y)*vec3(c, 0.6353, 0.6118);
    gl_FragColor = vec4(color,1.0);
}
