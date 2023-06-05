#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float plotPow(float x, float fy){
  return  smoothstep( x-0.02, x, fy) -
          smoothstep( x, x+0.02, fy);
}
float plotPowB(float x, float fy){
  return  smoothstep( x-0.2, x, fy) -
          smoothstep( x, x+0.2, fy);
}
float plotHart(float x, float fy){
        return  smoothstep( x-0.3, x, fy) -
                smoothstep( x, x+0.3, fy);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float heart(float x){
    float fy;
    fy = pow(sin(x),63.) * sin(x+1.5)*15.;
    if(x -6. < cos(u_time/2.)/sin(u_time/2.))
        return 0.;
    else
        return fy ;
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

void main(){
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y*5.;
    gl_FragColor = vec4(gl_FragCoord.x*0.001, 
        gl_FragCoord.y*0.001,u_mouse.x*0.001+u_mouse.y*0.001,1.);

    float st = random(vec2(uv.x,uv.x))*(7.*sin(floor(uv.x+u_time)*4321.));   
    float fy = plotPow(uv.x, st);
    gl_FragColor += vec4(fy,0.,0.,1.);
    st = random(vec2(uv.y*2.,uv.y))*sin(clamp(uv.y,3.,4.)*cos(uv.y*5.*floor(uv.x+u_time*0.3)));   
    fy = plotPow(uv.y*.4, st);    
    gl_FragColor += vec4(fy,0.,0.,1.);
    if (uv.x > -1.5 && uv.x < 1.5)
        st = heart(-uv.x+7.9);
    if(st != 0. ){
        fy = plotHart(uv.y, st);    
        gl_FragColor += vec4(0.,1.,1.,1.)*fy;   
    }
}
