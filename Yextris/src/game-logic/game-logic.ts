import { createSlice } from "@reduxjs/toolkit";
import { TypeGuard } from "@reduxjs/toolkit/dist/tsHelpers";
import { assert } from "console";
import { cloneDeep, flatten, isEmpty, memoize } from "lodash";
import { assertExist } from "../utils/utils";

// remove mechanism
export { }

// candy mover
// use circle to do conflict detect
// once it touch bottom or other 
// just order y in region check if cur candy touch it rest candy, if not give it gravity

// candy_to_mark = slice(game_bar) = {id, eliminate_prop:color..., (x,y)  }
// select from scene
// function (bar){}
// 

// game-object (region,y) in scene is not the pos(row,col) in mark_map
//  row,col of mark map
// mark_map= bar[][];
// adjacent candy = left(mark_map, candy)=>candy|undefined, right, up ,buttom()
// if it loop map just make left.row = (row+1)%rows
// eliminate logic
// step by step find candy to be eliminated
// basic idea is to filter(no to be eliminated)
// possible_to_be_eliminated = mark_map. map(eliminate_prop_validate_partial = same(eliminate_prop))
// e.g  for Color of "RGB" mark_map.map(sameColor(Color));

// e.g remove3
// non-eliminate filter, 
// eliminating_candy =  (!single-candy, !two-link-only-candy)

// update-logic
// update game-object state
// create mark_map;
// find to be eliminate candy and mark
// update it to game-object
// remover see game-object and do remove
//  remover may create remove chain and ...


// emitter, emit(after: n s)
//  turn-left, turn-right
// state rotating, holding
// rotated, once rotated === n state ==holding
// 

// when emitter touch candy it dead
// basic elimination detector
// function isSameColor(): boolean { }
// function colors():Color<>{}





// remove effect,
// scorer(eater.digestCandies=group(Candy[]))
// combo(eater.digestCandies=group(Candy[]))
// level(scene)
// candy factory(scene)

// mark=>restTime=>mark