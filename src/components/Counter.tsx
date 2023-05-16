import { useState } from "react";

export const Counter = () => {
    const [counter, setCounter] = useState(0);
   
    const incrementar = (num: number): void=> {
        setCounter(counter + num);
    }
    return (
        <div className = "mt-5">
            <h3>Counter: useState</h3>
            <span> Valor: {counter}</span>
        
        <br />
        <button onClick={() => incrementar(1)} className="btn btn-outline-primary mt-2">
            +1
        </button>
        <button onClick={() => incrementar(2)} className="btn btn-outline-primary mt-2">
            +2
        </button>
        <button onClick={() => setCounter(0)} className="btn btn-outline-danger mt-2">
            reset
        </button>
        </div>
    )
}