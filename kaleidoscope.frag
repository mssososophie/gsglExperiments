#define PI 3.1415926535897932384626433832795



// Number of mirror segments

#define N 16.0


// Speed of rotation

#define S (PI/16.0)


// ZOOM

#define Z 1.5




void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float fft=texture(iChannel2,vec2(440.0/11025.0,0.25)).r;
    float fft1=texture(iChannel2,vec2(20.0/11025.0,0.25)).r;
   
    		
    
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    vec2 cc = uv - vec2(0.5,0.5);
    vec2 po = vec2( atan(cc.x,cc.y) , length(cc) );
    
    float s=S;
    float n=0.1+floor(fft*2.0);
    float z=fft1;
    
	float f=(2.0*PI/n);

    float m=mod((2.0*PI)+po.x,f);
    
    if(m>f/2.0){ m=f-m; }
       
    po.x = m+(iTime*s);
    po.y /=z;
    
    cc= vec2(cos(po.x),sin(po.x))*po.y;


    // Output to screen
    fragColor = texture( iChannel1, cc+vec2(0.5,0.9) ).rgba;
    
    fragColor=fragColor*4.0-2.0; // contrast
    
    fragColor.b*=1.0;
    
    fragColor += texture(iChannel3, cc+vec2(0.0,0.0) ).rgba;
    
}
