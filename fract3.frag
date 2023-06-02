
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define precision 0.01

vec2 getDot(int i){
    if (i == 0) return vec2(1.,0.);
    if (i == 1) return vec2(-0.5, -sqrt(3.)/2.);
    if (i == 2) return vec2(-0.5, sqrt(3.)/2.);
}

vec3 getColor(int i){
    if (i == 0) return vec3(1.,0.,1.);
    if (i == 1) return vec3(0.3843, 0.0, 1.0);
    if (i == 2) return vec3(0.0, 0.9333, 1.0);
}


vec3 newt1( in vec2 z)
{
    for( int i=0; i<057; i++ )
    {
        float magnitude = dot(z, z);
        z= (2.0 * z + vec2(z.x * z.x - z.y * z.y, -2.0 * z.x * z.y) / (magnitude * magnitude)) / 3.0;
        for(int j =0; j<3; j++)
        {
            if (distance(z, getDot(j)) < precision)
                return getColor(j);        
        } 
    }
}
vec3 newt2( in vec2 z)
{
    for( int i=0; i<57; i++ )
    {
        z = z - (z*z*z - 1.)/(3.*z*z);
        for(int j =0; j<3; j++ )
        {
            float distance = length(z - getDot(j));
            if (distance < precision)
                return getColor(j);        
        } 
    }
}

vec2 pow2(vec2 z){
    return vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y );
}
vec2 pow3(vec2 z){
    return vec2(2.*pow(z.x, 3.) + 1. - 6.*z.x*z.y*z.y, 6.*z.x*z.x*z.y - 2.*pow(z.y,3.));
}

vec3 newt3( in vec2 z)
{
    for( int i=0; i<157; i++ )
    {
        z =(2.*pow3(z) + 1.)/(3.*pow2(z));
        for(int j =0; j<3; j++ )
        {
            if (distance(z, getDot(j)) < precision)
                return getColor(j);        
        } 
    }
}

void main(){
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.xy;
        vec3 color = vec3(0);
        //if (uv.x < 0. && uv.y < 0.)
            color = newt1(uv);
        // else if (uv.x > 0. && uv.y > 0.)
        //     color = newt2(uv * 10. - 5.);

        // else if(uv.x < 0. && uv.y > 0.)
        //color = newt3(uv);
    gl_FragColor = vec4(color, 1.);
}