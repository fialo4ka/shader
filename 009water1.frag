#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float sinY(float x, float amplitude,float angularVelocity, float move){
    return amplitude * sin(u_time)  * sin((angularVelocity * x))-move;
}

void main() 
{
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    for(float i=1.;i< 7.;i++)
    {
        vec4 color = uv.y +.5 > sinY(uv.x, 0.01*i, 10.0, i*0.07) 
                        ? vec4(0.0, 0.0, 0.0, 1.0) 
                        : vec4(0.0, 0.02*i, 1.-0.1*i, 1.0);
        if (gl_FragColor.x == 0.)      
            gl_FragColor += color;
    }
}