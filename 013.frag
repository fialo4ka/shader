#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PIXEL (2.0/u_resolution.y)
#define RADIUS (0.5 - 3.*PIXEL)

// vec3 subpixDist( in vec2 pos ) {
//     vec2 posL = pos + vec2(PIXEL / -3., 0.); // LEFT
//     float dL = distance(vec2(0.5, 0.5), posL);
//     vec2 posM = pos + vec2( 0., 0.); // MIDDLE
//     float dM = distance(vec2(0.5, 0.5), posM);
//     vec2 posR = pos + vec2(PIXEL / +3., 0.); // RIGHT
//     float dR = distance(vec2(0.5, 0.5), posR);
//     return vec3(dL, dM, dR); // Red: Left, G: Middle, G: Right
// }
// vec3 circ4( in vec2 pos)
// {
//     return vec3(smoothstep(RADIUS-PIXEL, RADIUS+PIXEL, subpixDist(pos)));
// }

// Recommended:
// ---------------------
//#define SMOOTHSTEP
#define DIV
//#define SIGN

// Not recommended:
// ---------------------
//#define POW
//#define FLOOR


vec4 circle(vec2 uv, vec2 origin, float radius, vec4 color)
{
    float d = length(uv - origin) - radius;// distance from uv to the edge of the circle.
    
    // VERY VIABLE:-------------------------
    
    // using smoothstep() is idiomatic, fast, and clean (no bleeding).
    #ifdef SMOOTHSTEP
    float a = 1.0 -smoothstep(0.,0.006, d);
    #endif
    
    // using a divide gives a very long falloff, so it bleeds which I think is pretty.
    #ifdef DIV
    const float amount = 300.0;// bigger number = more accurate / crisper falloff.
    float a = clamp(1.0 / (clamp(d, 1.0/amount, 1.0)*amount), 0.,1.);
    #endif

    // using sign() which gives 1 50% AA value. it's cheap, but kind of ugly.
    #ifdef SIGN
	const float epsilon = 0.0007;
    if(abs(d) <= epsilon) d = 0.;// is there a way to optimize this out?
    float a = (sign(-d) + 1.0) / 2.0;
    #endif

    // NOT SO VIABLE:-------------------------
    
    // using pow() to crispen edges. pretty, but I think smoothstep has about the same effect and is cheaper..
    #ifdef POW
    float a = pow(clamp(1.0 - d,0.,1.),200.0);
    #endif
    
    // you can also use floor() to create a sharp edge, but you'll have to first
    // go through the DIV method above. floor just eliminates the smoothness and bleeding.
    // Not very useful...
    #ifdef FLOOR
    const float amount = 100000.0;// bigger number = more accurate
    float a = floor( clamp(1.0 / (clamp(d, 1.0/amount, 1.0)*amount), 0.,1.) );
    #endif

    return vec4(color.rgb, color.a * a);
}

void main(){

	// vec2 uv = gl_FragCoord.xy / u_resolution.yy;
    
    // // background color
    // gl_FragColor = vec4(1.0);

    // // red circle
    // vec4 c1 = circle(uv, vec2(0.5, 0.5), 0.3, vec4(.85,0.,0.,1));
	// gl_FragColor = mix(gl_FragColor, c1, c1.a);

    // // blue circle
    // vec4 c2 = circle(uv, vec2(0.5, 0.5), 0.2, vec4(.2,0.,0.8,1));
	// gl_FragColor = mix(gl_FragColor, c2, c2.a);


    // vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.x;
    // gl_FragColor = vec4(0.1176, 0.2431, 0.8078, 1.0);  
    // if(uv.x>0.)
    //     gl_FragColor = vec4(0.8078, 0.1176, 0.1176, 1.0);  
    // if(uv.x >= 0. && uv.y < 0.) { // Bottom-right corner
    //     gl_FragColor = vec4(circ4(uv+vec2(0., 1.)), 1.0);
    // }

    
    // float d = length(uv -0.5);
    // float fg = smoothstep(0., 0.3, 1.-d);//- smoothstep(-0.3, 0.0, d);
    // float fg1 = smoothstep(0., 0.3, 1.-0.8);
    // float r = 0.5;
    // float col =  smoothstep(r, r - 0.01, d) ;

    // if (d < 0.5)   
    //     gl_FragColor = vec4(1.,0.,1.,col);

    // d = length(uv +0.5);
    // if (d < 0.5)
    //     gl_FragColor = vec4( 1., 1., 1., 1.);

    vec3 color;
    vec2 uv = (gl_FragCoord.xy *2. - u_resolution.xy) / u_resolution.x;
    if(uv.x > 0. && uv.y<0.)
        color = mix(vec3(1.0, 0.0, 0.0),vec3(0.2235, 0.2118, 0.7451),vec3(1.0, 0.902, 0.0353));
    else 
        color = mix(vec3(0.8, 0.0, 1.0),vec3(0.0, 1.0, 0.502),vec3(0.9882, 0.8902, 0.0));
    gl_FragColor = vec4(color,1.);
 
}
