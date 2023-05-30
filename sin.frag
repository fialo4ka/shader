#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float countSin(vec2 uv){
   return sin(uv.x*8.)/2.;
}

float drawSin(vec2 uv, float fy)
{   
    return smoothstep(fy,fy-0.02,uv.y) - smoothstep(fy+0.02,fy,uv.y); 
}
float shift(int i){ return 0.1*float(i);}

void main()
{    
    
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    vec4 color =  vec4(0.0,0.0,0.0,1.);
    
    float fy[12];
    float sm[12];
    for(int i=0;i<12;i++){
        fy[i] = countSin(uv-shift(i));
        sm[i] = drawSin(uv-shift(i),fy[i]);
    }
    gl_FragColor = color-(sm[0]);
    float fyy =fy[0];
    for(int i=1;i<8;i++){
        if(uv.y > fyy)
            gl_FragColor += color-(sm[i]);
        fyy = fyy < fy[i-1]-shift(i) ? fy[i]-shift(i) : fyy;
        fyy = fyy < fy[i]+shift(i) ? fy[i]+shift(i) : fyy;
    }
}
