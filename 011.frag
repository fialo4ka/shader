#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float plotPow(float x, float fy){
  return  smoothstep( x-0.005, x, fy) -
          smoothstep( x, x+0.005, fy);
}

float plotPow1(float x, float fy){
  return  step( x, fy) - step( x+0.01, fy);
}
void main(){
    float fy;
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y*5.;
    vec4 color = vec4(0.);
    for(float i = -2.; i < 2.; i += 0.1)
    {
        float fy = plotPow(uv.x + i, 0.); 
        color += vec4(fy,fy,fy,1.);
        fy = plotPow(uv.y + i, 0.); 
        color += vec4(fy,fy,fy,1.);
    }
    fy = plotPow1(uv.y, pow(uv.x, 2.) - 0.5);//(abs(sin(u_time)))*
    color += vec4(fy, 0., 0., 1.);
    gl_FragColor = color;

    if(length(vec2(uv.x +0.5, uv.y) -0.) < 0.6)
        gl_FragColor = vec4(0.2, 0.4549, 0.8392, 1.0);
    fy = (sin(u_time));// sqrt(pow(1.5,2.)-pow(u_time, 2.));    
    if(length(vec2(uv.x + fy + 0.5, uv.y-(cos(u_time))) -0.) < 0.6)
        gl_FragColor = vec4(fy, 0.4549, 0.8392, 1.0);   

    //fy = sqrt(pow(1.5,2.)-pow(u_time, 2.));
    //gl_FragColor = vec4(fy, 0.4549, 0.8392, 1.0);   


}