
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float tep(){

    return 1. + abs(sin(u_time/4.));
}

float IterateMandelbrot( in vec2 c )
{
    const float B = 258.;

    float n = 0.0;
    vec2 z  = vec2(0.0);
    for( int i=0; i<20; i++ )
    {
        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c/0.2; // z = z² + c
        //z= c*c + c/0.2;
        //z = sin(z)/cos(z) + c;
        if(distance(c,z)>(B) ) break;
        n += 1.0;
    }

    //float sn = n - log(log(length(z))/log(B))/log(2.0); // smooth iteration count
    float sn = n - log2(log2(dot(z,z))) + 4.0;  // equivalent optimized smooth iteration count
    return sn;
}
void main(){
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.xy;
    gl_FragColor = vec4(IterateMandelbrot(uv)*0.1);
}