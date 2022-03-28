export function Effect({ id }: { id: string }) {

    return <defs>
        {/* <filter id={id} filterUnits="objectBoundingBox" x="-25%" y="-250%" width="150%" height="500%"> */}
        <filter id={id} filterUnits="userSpaceOnUse" x="0%" y="0" width="100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="10" specularConstant=".55" specularExponent="55" lighting-color="#bbbbbb" result="specOut">
                <feDistantLight azimuth="0" elevation="90" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
            <feComposite in="litPaint" in2="blur" operator="arithmetic" k1="1" k2="1" k3="0.8" k4="0" result="cm1" />
            <feGaussianBlur in="litPaint" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="blur1" stdDeviation="9" result="blur2" />
            <feGaussianBlur in="blur2" stdDeviation="2" result="blur3" />
            <feComposite in="litPaint" in2="blur1" operator="arithmetic" k1="1" k2="1" k3="0.8" k4="0" />
            <feComposite in="cmp1" in2="blur2" operator="arithmetic" k1="1" k2="1" k3="0.68" k4="0" result="cmp2" />
            <feComposite in="cmp2" in2="blur3" operator="arithmetic" k1="1" k2="1" k3="0.68" k4="0" result="cmp2" />

        </filter>
        <linearGradient
            x1="1" y1="0" x2="0" y2="0" id="gradient2">
            <stop offset="0%" stopColor="#4352f3"></stop>
            <stop offset="100%" stopColor="#ab5aea"></stop>
        </linearGradient>

    </defs>
}
//perf but ugly
// <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
// <feSpecularLighting in="blur" surfaceScale="4" specularConstant=".75" specularExponent="10"
//     lighting-color="white" result="specOut">
//     <feDistantLight azimuth="0" elevation="90" />
// </feSpecularLighting>
// <feComposite in="specOut" in2="blur" operator="in" result="specOut" />
// <feComposite in="blur" in2="specOut" operator="arithmetic" k1="1" k2="1" k3=".8" k4="0" result="litPaint" />
// <feComposite in="SourceGraphic" in2="blur1" operator="arithmetic" k1="1" k2=".2" k3="1" k4="0" result="litPaint" />
// <feGaussianBlur in="litPaint" stdDeviation="2" result="blur1" />
// <feComposite in="litPaint" in2="blur1" operator="arithmetic" k1="1" k2=".5" k3="1" k4="0" result="litPaint" />









{/* <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feSpecularLighting in="blur" surfaceScale="4" specularConstant=".75" specularExponent="25"
                    lighting-color="white" result="specOut">
                    <feDistantLight azimuth="0" elevation="90" />
                </feSpecularLighting>
                <feComposite in="specOut" in2="blur" operator="in" result="specOut" /> */}

        //    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
        //     <feSpecularLighting in="blur" surfaceScale="8" specularConstant=".75" specularExponent="10" lighting-color="#bbbbbb"  result="specOut">
        //      <feDistantLight azimuth="0" elevation="90" />
        //     </feSpecularLighting>
        //     <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
        //     <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/> 
        //    <feGaussianBlur in="litPaint" stdDeviation="5" result="blur1" />
        //    <feGaussianBlur in="blur1" stdDeviation="5" result="blur2" />
        //    <feGaussianBlur in="blur2" stdDeviation="5" result="blur3" />
        //    <feComposite in="litPaint" in2="blur" operator="arithmetic" k1="1"k2="1" k3="0.8" k4="0" />
        //    <feComposite in="cmp1" in2="blur2" operator="arithmetic" k1="1" k2="1" k3="0.68" k4="0" result="cmp2" />
        //    <feComposite in="cmp1" in2="blur3" operator="arithmetic" k1="1" k2="1" k3="0.6" k4="0" result="cmp2" />