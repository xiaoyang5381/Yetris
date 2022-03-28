import { Draft } from "immer";
export interface Vector2 { x: number, y: number }
export namespace Vector2 {
    export function add(a: Draft<Vector2>, b: Readonly<Vector2>): void { a.x += b.x; a.y += b.y; }
    export function sub(a: Draft<Vector2>, by: Readonly<Vector2>): void { a.x -= by.x; a.y -= by.y; }
    export const zero: RecordType.DeepReadonly<Vector2> = { x: 0, y: 0 }
    export const unitX: RecordType.DeepReadonly<Vector2> = { x: 1, y: 0 }
    export const unitY: RecordType.DeepReadonly<Vector2> = { x: 0, y: 1 }
    export const unit: RecordType.DeepReadonly<Vector2> = { x: 1, y: 1 }
    const { cos, sin } = Math;

    /**
     * 
     * @param vec2 
     * @param theta positive for clockwise
     */
    export function rotate(vec2: Vector2, theta: number) {
        const { x, y } = vec2
        // see rotate matrix
        const st = sin(theta)
        const ct = cos(theta);
        vec2.x = -(ct * x) + (st * y);
        vec2.y = -(st * x) - (ct * y);
    }

    export function scale(vec2: Vector2, s: Vector2): void {
        vec2.x = vec2.x * s.x
        vec2.y = vec2.y * s.y
    }
}