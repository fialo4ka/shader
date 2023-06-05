#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// float step(){

// }

void main(){
    float fy;
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y*5.;
    gl_FragColor = vec4(0.0, 0.8824, 1.0, 1.0);    
    
    if(uv.x > -4.9 && uv.x <4.9 && uv.y<-4.2)
        gl_FragColor = vec4(0.9529, 0.8275, 0.7569, 1.0); 
    
    uv.x+= abs(0.1*sin(u_time)-0.01)-0.01;  
    uv.y+= abs(0.1*sin(u_time)-0.01)-0.01;

    uv.y -= 1.;
    if(length(vec2(uv.x, uv.y+1.) -0.) < 3.4)
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.); 
    if(uv.x > -1.5 && uv.x <1.5 && uv.y<2.)
        gl_FragColor = vec4(0.9529, 0.8275, 0.7569, 1.0); 
    for(float i=0.; i< 2.;i++){
        if(length(vec2(uv.x + 2.5*i-1.25, uv.y+1.2) -0.) < 1.9)
            gl_FragColor = vec4(0.9412, 0.7804, 0.6863, 1.0); 
    } 

    if(length(vec2(uv.x, uv.y+1.) -0.) < 3.)
        gl_FragColor = vec4(0.9725, 0.8745, 0.8196, 1.0); 
    if(length(vec2(uv.x, uv.y+1.) -0.) < 3.4 && uv.y > 1.2)
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); 
   


    uv.x -= 1.25;
    for(float i=0.; i< 2.;i++){
        if(length(vec2(uv.x+3.4*i-0.45, uv.y+2.0) -0.) < 0.65)
            gl_FragColor = vec4(0.9804, 0.8039, 0.749, 1.0); 
        fy = (sin(u_time)*0.2); 
        if(length(vec2(uv.x + 2.5*i, uv.y) -0.) < 0.9)
            gl_FragColor = vec4(0.9451, 0.9569, 0.9725, 1.0);
        if(length(vec2(uv.x + 2.5*i+fy, uv.y) -0.) < 0.6)
            gl_FragColor = vec4(0.149, 0.4784, 0.9059, 1.0);
        if(length(vec2(uv.x + 2.5*i+fy, uv.y) -0.) < 0.4)
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        float stepY = abs(cos(u_time)-0.01);    
        //float stepY = 1.; 
        if(length(vec2(uv.x + 2.5*i , uv.y) -0.) < 1.2 && uv.y < -0.8 *stepY && uv.y < 0.)
            gl_FragColor = vec4(0.9922, 0.8039, 0.6941, 1.0);         
        if(length(vec2(uv.x + 2.5*i , uv.y) -0.) < 1.2 && uv.y > 0.5 *stepY && uv.y > 0. )
            gl_FragColor = vec4(0.9529, 0.749, 0.6314, 1.0); 
        if(uv.x >.5 && uv.x < 1.5 || uv.x < -3. && uv.x > -4.)
        {
            if(uv.y> 0.5 *stepY && uv.y < 0.5*stepY+0.1)
                gl_FragColor = vec4(0.2784, 0.0667, 0.0118, 1.0);
        } 
        float stepL = abs(0.1*sin(u_time)-0.01)-0.01;  
        //float stepL = 0.;
        if(length(vec2(uv.x + .8*i+0.85, uv.y+2.9) -0.) < 0.9 && uv.y > -2.2)
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        if(length(vec2(uv.x +1.25, uv.y + 1.8+stepL) -0.) < 0.9 && uv.y < -2.3-stepL)
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);        
    }

    // uv.x +=1.25;
    // if(uv.x > -0.01 && uv.x < .01)
    //     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    // if(uv.y > -2.02 && uv.y < -2.01)
    //     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); 
}