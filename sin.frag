#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float countSin(vec2 uv){
   return sin(uv.x*8. * cos(u_time))/3.- 0.3;
}
float drawSin(vec2 uv, float fy)
{   
    return smoothstep(fy,fy-0.02,uv.y) - smoothstep(fy+0.02,fy,uv.y); 
}
float shift(int i){ return 0.05*float(i);}

void main()
{    
    
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    vec4 color =  vec4(0.0,0.0,0.0,1.);
    
    float fyy = countSin(uv);
    float sm = drawSin(uv,fyy);
    gl_FragColor = color-(sm);
    for(int i=1; i<10;i++){
        float fy = countSin(uv-shift(i));
        sm = drawSin(uv-shift(i),fy);
        if(uv.y > fyy)
            gl_FragColor += color-(sm);
        fyy = fyy < fyy-shift(i) ? fy-shift(i) : fyy;
        fyy = fyy < fy+shift(i) ? fy+shift(i) : fyy;
    }
}
