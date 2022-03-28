import { StyleHTMLAttributes } from "react";
export function CurrentScore({ score, style }: { score: number | string } & StyleHTMLAttributes<React.ReactElement>) {
    return <h1
        className="centeredHeader"
        style={{ color: `white`, ...style }}
    >current:{score}</h1>
}