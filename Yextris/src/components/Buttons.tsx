import { StyleHTMLAttributes } from "react"

export function StartButton(props: { onClick: () => void } & StyleHTMLAttributes<React.ReactElement>) {
    return <svg
        className={`button`}
        onClick={props.onClick}

        style={{
            margin: `0 auto`,
            padding: `0`,
            width: '4%',
            height: '3%',
            ...props.style,
        }}
        aria-hidden="true" /*  width="5%" height="2%"  */ preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50">
        <path fill="#ff00aa" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z" />
        <path fill="#ff00aa" d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3l-9-5.2z" />
    </svg>
}
// function ResumeButton(props: { onClick: () => void } & StyleHTMLAttributes<React.ReactElement>) {
//     // load state
//     return <button></button>
// }
export function PauseButton(props: { onClick: () => void } & StyleHTMLAttributes<React.ReactElement>) {
    return <svg

        onClick={props.onClick}
        style={{
            margin: `0 auto`,
            padding: `0`,
            transform: `scale(3,3)`, position: 'absolute',
            top: `90%`,
            left: `45%`,
            width: '4%',
            height: '3%',
            ...props.style,
        }}
        className="button pauseButton" fill="none" viewBox="0 0 24 24"
        stroke="#ff00aa" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
}

export function ExitButton(props: { onClick: () => void } & StyleHTMLAttributes<React.ReactElement>) {
    return <svg
        onClick={props.onClick}
        style={{
            margin: `0 auto`,
            padding: `0`,
            transform: `scale(3,3)`, position: 'absolute',
            width: '4%',
            height: '3%',
            ...props.style,
        }}
        className="button" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
}