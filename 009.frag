#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float dot2(in vec2 v ) { return dot(v,v); }

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float sdBezier(in vec2 pos, in vec2 A, in vec2 B, in vec2 C )
{    
    vec2 a = B - A;
    vec2 b = A - 2.0*B + C;
    vec2 c = a * 2.0;
    vec2 d = A - pos;
    float kk = 1.0/dot(b,b);
    float kx = kk * dot(a,b);
    float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
    float kz = kk * dot(d,a);      
    float res = 0.0;
    float p = ky - kx*kx;
    float p3 = p*p*p;
    float q = kx*(2.0*kx*kx-3.0*ky) + kz;
    float h = q*q + 4.0*p3;
    if( h >= 0.0) 
    { 
        h = sqrt(h);
        vec2 x = (vec2(h,-h)-q)/2.0;
        vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
        float t = clamp( uv.x+uv.y-kx, 0.0, 1.0 );
        res = dot2(d + (c + b*t)*t);
    }
    else
    {
        float z = sqrt(-p);
        float v = acos( q/(p*z*2.0) ) / 3.0;
        float m = cos(v);
        float n = sin(v)*1.732050808;
        vec3  t = clamp(vec3(m+m,-n-m,n-m)*z-kx,0.0,1.0);
        res = min( dot2(d+(c+b*t.x)*t.x),
                   dot2(d+(c+b*t.y)*t.y) );
    }
    return sqrt( res );
}

float plotLineX(float st) {    
    return smoothstep(0.02, 0.0, abs(st));
}

vec4 Beard(vec2 uv, vec4 beardColor){
    float move = abs(sin(u_time*0.1))-0.4;
    vec2 v0L = vec2(0.3,0.1*(abs(cos(u_time*0.7)+ 0.1)));
    vec2 v0R = vec2(-0.3,0.1*abs(cos(u_time*0.7)+ 0.1));
    vec2 v1L = vec2(0.1,0.1)*abs(sin(u_time*0.7));
    vec2 v1R = vec2(-0.0,0.1)*abs(sin(u_time*0.7));
    vec2 v2 = vec2(0.,0.);
    if(plotLineX(sdBezier(vec2(uv.x-move,uv.y-move*0.3),v0L,v1L,v2)) > 0. 
        || plotLineX(sdBezier(vec2(uv.x-move,uv.y-move*0.3),v0R,v1R,v2)) > 0.)
           return beardColor;
    return vec4(0.);
}
float sinY(float x, float amplitude,float angularVelocity, float move){
    return amplitude * sin(u_time)  * sin((angularVelocity * x))-move;
}
vec4 waves(vec2 uv){
    vec4 result =vec4(0.0, 0.0, 0.0, 1.0);
    for(float i=1.;i< 7.;i++)
    {
        vec4 color = uv.y +.5 > sinY(uv.x, 0.01*i, 10.0, i*0.07) 
                        ? vec4(0.0, 0.0, 0.0, 1.0) 
                        : vec4(0.0,0.02*i, 1.-0.1*i, 1.0);
        if (result.x == 0.)      
            result += color;
    }
    return result;
}

vec4 skyGrad(vec2 uv){
    return vec4(1.-sin(uv.y), 0,sin(uv.y), 1.0);
}


void main() {
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.y;
    gl_FragColor = waves(uv);
    if (gl_FragColor.x == 0.)      
        gl_FragColor += vec4(Beard(uv, vec4(0.0549, 0.2745, 0.3608, 1.0)));
    if (gl_FragColor.x == 0. && gl_FragColor.y == 0. && gl_FragColor.z == 0.)
        gl_FragColor += skyGrad(uv);
}