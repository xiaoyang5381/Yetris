import { StyleHTMLAttributes } from "react";

export function HighScore({ score, style }: { score: number | string } & StyleHTMLAttributes<React.ReactElement>) {
    return <h1
        className="centeredHeader"
        style={{ color: `white`, ...style }}
    >High:{score}</h1>
}