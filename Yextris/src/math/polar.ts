import { Vector2 } from "./vector2"

export interface Polar{
    radius:number,
    /**
     * positive for clockwise 
     */
    theta:number
}

export namespace Polar{
    const {cos,sin} = Math
    export function toVector2(polar:Polar):Vector2{
        const {radius: y,theta} = polar
        return {x:y * cos(theta),y:y*sin(theta)}
    }
    const {sqrt,atan2} = Math
    export function fromVector2(vec2:Vector2):Polar{
        const {x,y}  =vec2
        return {radius:sqrt(x*x+y*y),theta:-atan2(y,x)}
    }
    export function rotate(polar:Polar,dTheta:number):void{
        polar.theta +=dTheta
    }
    export function equal(a:Polar,b:Polar):boolean{
        return equalTheta(a,b) && equalRadius(a,b);
    }
    export function equalTheta(a:Polar,b:Polar):boolean{
        return a.theta === b.theta
    }
    export function equalRadius(a:Polar,b:Polar):boolean{
        return a.radius === b.radius
    }
}