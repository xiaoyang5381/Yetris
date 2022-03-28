// type Scene = Entity & EntityState<GameObject>
 interface Transform {
    origin: Origin
    translate: Translate
    rotate: Rotate
    scale: Scale
}
 interface Origin extends Vector2 { }
 interface Translate extends Vector2 { }
 interface Scale extends Vector2 { }
 interface Velocity extends Vector2 { }
 interface AngularVelocity { v: number; unit: 'deg' | 'rad' }
 interface Vector2 { x: number, y: number }
 interface BoxSize {
    width: number
    height: number
}


 interface Scene {
    id: string
    // center:Origin
    // background:RGB
    viewBox: BoxSize
    canvasBox: BoxSize
}





// object in main scene



 interface Conveyors<C extends Candy = Candy> extends Array<Conveyor<C>> { }
 interface Conveyor<C extends Candy = Candy> extends Array<C> { }



 type IsSameTypeCandy<C extends Candy = Candy> = (a: C, b: C) => boolean;
 interface Candy {
    state: "moving" | "settled" | "eating"
    height: number

    y: number

    speed: number //v >0

    // props for moving
    // startY:number
    // endY:number
    // restTimeToMove:number
    // moveDuration:number

    // eating
    restTimeToEat: number
    // eatDuration:number
}


