import * as React from 'react'

export interface Props {
    name: string;
    enthusiasmLevel ?: number;
    onIncrement?:() => void;
    onDecrement?:() => void;
}

function Hello({name, enthusiasmLevel = 1, onIncrement, onDecrement} : Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D')
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    )
}

function getExclamationMarks(numberChars: number) {
    return Array(numberChars + 1).join('!')
}

export default Hello
