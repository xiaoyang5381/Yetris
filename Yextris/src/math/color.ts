///<reference types="../types/type-utils"/>

import { assert } from "../utils";
import { isInteger, random as _random, range } from "lodash";

export interface RGB { r: number, g: number, b: number }
export type RGBPalette = RGB[]
export namespace RGB {
    const clamper = new Uint8ClampedArray(3);
    export function rgb(r: number, g: number, b: number): RGB {
        clamper[0] = r;
        clamper[1] = g;
        clamper[2] = b;
        r = clamper[0];
        g = clamper[1];
        b = clamper[2];

        return { r, g, b  };
    }
    export function toHex(rgb: RGB) {
        const { r, g, b } = rgb
        return `#${HexOf(r)}${HexOf(g)}${HexOf(b)}`.toUpperCase()
    }
    export function toCSS(rgb: RGB) {
        const { r, g, b } = rgb
        return `rgb(${r},${g},${b})`
    }
    function HexOf(n: number) {
        // assert 255>n>0
        return n < 15 ? `0${n.toString(16)}` : n.toString(16);
    }
    export function equal(left:RGB,right:RGB){
        return left.r === right.r && left.g===right.g && left.b === right.b;
    }
    const rand255 = ()=>_random(0,255);
    export function random():RGB{
        return RGB.rgb(rand255(),rand255(),rand255());
    }

    export const black: RecordType.DeepReadonly<RGB> = rgb(0, 0, 0)  //#000000 	
    export const white: RecordType.DeepReadonly<RGB> = rgb(255, 255, 255)  //#FFFFFF 	
    export const red: RecordType.DeepReadonly<RGB> = rgb(255, 0, 0)  //#FF0000 	
    export const lime: RecordType.DeepReadonly<RGB> = rgb(0, 255, 0)  //#00FF00 	
    export const blue: RecordType.DeepReadonly<RGB> = rgb(0, 0, 255)  //#0000FF 	
    export const yellow: RecordType.DeepReadonly<RGB> = rgb(255, 255, 0)  //	#FFFF00 	
    export const cyan: RecordType.DeepReadonly<RGB> = rgb(0, 255, 255)  // #00FFFF 	
    export const magenta: RecordType.DeepReadonly<RGB> = rgb(255, 0, 255)  // #FF00FF 	
    export const silver: RecordType.DeepReadonly<RGB> = rgb(192, 192, 192)  //#C0C0C0 	
    export const gray: RecordType.DeepReadonly<RGB> = rgb(128, 128, 128)  //#808080 	
    export const maroon: RecordType.DeepReadonly<RGB> = rgb(128, 0, 0)  //	#800000 	
    export const olive: RecordType.DeepReadonly<RGB> = rgb(128, 128, 0)  //#808000 	
    export const green: RecordType.DeepReadonly<RGB> = rgb(0, 128, 0)  //#008000 	
    export const purple: RecordType.DeepReadonly<RGB> = rgb(128, 0, 128)  //	#800080 	
    export const teal: RecordType.DeepReadonly<RGB> = rgb(0, 128, 128)  //#008080 	
    export const navy: RecordType.DeepReadonly<RGB> = rgb(0, 0, 128)  //#000080 	


// see https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
export function fromHSL(h:number, s:number, l:number){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p:number, q:number, t:number){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return rgb(r*255,g*255,b*255);
}

export function uniformDistributeHue(start:number,n:number):RGB[]{
    assert(isInteger(n)&& n>0)
    const dA = 360/n;
    return  range(0,n).map(i=>fromHSL((start+i*dA)/360,.5,.5))

}
console.log(uniformDistributeHue(0,3))
}













