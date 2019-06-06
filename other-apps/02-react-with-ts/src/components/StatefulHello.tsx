import * as React from 'react'

import './Hello.css'

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            currentEnthusiasm: props.enthusiasmLevel || 1
        }
    }

    onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1)
    onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1)

    render () {
        const {name} = this.props
        if (this.state.currentEnthusiasm <= 0) {
            throw new Error('You could be a little more enthusiastic. :D')
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
                </div>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
            </div>
        )
    }

    updateEnthusiasm(n:number) {
        this.setState({currentEnthusiasm: n})
    }
}

function getExclamationMarks(n: number) {
    return Array(n + 1).join('!')
}

export default Hello
