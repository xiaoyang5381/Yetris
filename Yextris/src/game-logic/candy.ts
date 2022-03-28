export {};


// how to move it 
// css transition ani
// dur = (endY-startY)/velocity, startY, endY
// how to detect whether it should be settled
// 1. rest time counter? v 
// 2. curY counter? x
// both above solution are logic equivalent f(dur) = curY, g(curY) = fur

// if more than one candy fall down hwo to predicate endY?
// falling candies in same conveyor with 
// 1. same speed? v
// 2. different speed? x
//    if there is rigid-body conflict, the previous falling candy 
//    may be pushed by latter one.

// speed up requirement 
// 1. calc cu
// update transition behavior on fly
// to trigger new transition ani, you must update some property
// so update transition behavior on fly ===
// 1. update transition dur
// 2. update property to pre-dest + deviation
// you'd better fix the deviation when its animation state is freeze