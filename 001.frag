#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


vec3 palette( in float t)
{
    // vec3 a = vec3(0.5, 0.5, 0.5);
    // vec3 b = vec3(0.5, 0.5, 0.5);
    // vec3 c = vec3(1.0, 1.0, 1.0);
    // vec3 d = vec3(0.30, 0.20, 0.20);
    vec3 a = vec3(0.138, 0.298, 1.688);
    vec3 b = vec3(-0.127, 0.431, 0.386);
    vec3 c = vec3(0.178, 0.619, 0.988);
    vec3 d = vec3(-0.782, 3.513, 2.295);
    
    return a + b*cos( 6.28318*(c*t+d) );
}


float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }
float sdRhombus( in vec2 p, in vec2 b ) 
{
    p = abs(p);
    float h = clamp( ndot(b-2.0*p,b)/dot(b,b), -1.0, 1.0 );
    float d = length( p-0.5*b*vec2(1.0-h,1.0+h) );
    return d * sign( p.x*b.y + p.y*b.x - b.x*b.y );
}

void main(){

    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.xy;
    //vec2 uv = (gl_FragCoord.xy *2.) / u_resolution.xy -1.;
    //uv *= u_resolution / 100.;
    //uv = fract(uv *2.) - 0.5;
    float d = length(uv);
    vec3 col = palette(sdBox(uv, vec2(.1, .1))-u_time * 0.4);//
    gl_FragColor = vec4( col, 1.0);
}
