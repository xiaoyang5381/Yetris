import { clone } from "lodash"

export namespace Rotate{
    export const zeroDeg:RecordType.DeepReadonly <Rotate> = {"unit":'deg',v:0}
    export const zeroRad:RecordType.DeepReadonly <Rotate> = {"unit":'rad',v:0}

const {PI} = Math
    export function add(a:Rotate,b:Rotate):void{
        if(a.unit===b.unit){
            a.v = a.v+b.v
        }
        else if(a.unit='deg'){
            a.v = a.v + 180*b.v/PI
        }
        else{
            a.v = a.v + PI* b.v/180
        }
    }
    export function deg2rad(a:Rotate):Rotate{
        if(a.unit='deg'){
            return {unit:'deg', v:PI*a.v/180
             }
        }
        return clone(a);
    }
    export function rad2deg(a:Rotate):Rotate{
        if(a.unit='deg'){
            return {unit:'deg', v: 180*a.v/PI}
        }
        return clone(a);
    }

export const enum Direction {
    clockWise = 1,
    antiClockWise = 0
}
}

export interface Rotate { v: number; unit: 'deg' | 'rad' }