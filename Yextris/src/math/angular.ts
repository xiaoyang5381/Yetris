import { isInteger, memoize } from "lodash";
import { assert } from "../utils/utils";

const assertRightSides = (sides:number)=>
    assert(isInteger(sides) && sides >= 3,`given sides(${sides}) < 3`);
export const deltaRadOfSides = memoize((sides: number) => {
    assertRightSides(sides)
    return (360 / sides) * (Math.PI / 180)
})
export const initAngle = memoize((sides: number) =>{
    assertRightSides(sides)
    return (180 - 360/ sides)/2
});
export const deltaAngle = memoize((sides: number)=> {
    assertRightSides(sides)
    return 360 / sides
});