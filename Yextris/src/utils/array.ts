import { isNil, nth, slice } from "lodash";
import { assert } from "./utils";

export function rotateL(arr:any[]):void{
        const last = arr.shift()
       isNil(last)?void 0: arr.push(last);
}
export function rotateR(arr:any[]):void{
        const first = arr.pop()
        isNil(first)?void 0  :arr.unshift(first)
}

export function * pickByWindow<T>(array:T[],size:number=1,step:number=1){
    assert(array.length%step=== size%step,`it should be congruence array.length(${array.length})%step(${step})=== size(${size})%step(${step})`)
    let i = 0;
    while(i+size<=array.length){
        yield slice(array,i,i+size);
        i+=step
    }
}