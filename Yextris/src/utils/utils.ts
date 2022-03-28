//@ts-nocheck
import { isNil } from "lodash";

// export function exsi
export function assertExist<T>(msg?: string): ExistGuard<T> {
    return ((v: T | undefined) => { if (isNil(v)) { throw msg }; return true; }) as any;
}
const {round} = Math;
/**
 * 
 * @param random ()=>[0..rand_num.1]
 * @returns 
 */
export function randomItemOfArray(random:()=>number){
    return <T>(arr:T[])=>{
        return arr[round((arr.length-1) * random())]
    }
}

export function assert(bool:boolean,msg?:string){
    if(bool){}
    else{ throw msg;}
}

function mixinSlice<I, O>(builder: ActionReducerMapBuilder<I>, selector: Selector<I, O>, slice: Slice<O>) {
    forEach(slice.actions, (act) => {
        builder.addCase(act, (state, action) => { slice.reducer(selector(state as any), action) })
    })
}