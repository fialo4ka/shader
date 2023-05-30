float countSin(vec2 uv){
   return sin(uv.x*5.)/2.;
}

float drawSin(vec2 uv, float fy)
{   
    return smoothstep(fy,fy-0.02,uv.y) - smoothstep(fy+0.02,fy,uv.y); 
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{    
    
    vec2 uv = (fragCoord.xy *2. - iResolution.xy) / iResolution.y;
    vec4 color =  vec4(0.0,0.0,0.0,1.);
    
    float fy[12];
    float sm[12];
    for(int i=0;i<12;i++){
        fy[i] = countSin(uv-0.1*float(i));
        sm[i] = drawSin(uv-0.1*float(i),fy[i]);
    }
    fragColor = color-(sm[0]);
    
    for(int i=1;i<3;i++){
            if(uv.y > fy[i-1])
                fragColor += color-(sm[i]);
    }

}
