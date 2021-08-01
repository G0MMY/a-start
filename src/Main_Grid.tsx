import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import aStart from "./algorithm";

const start = 'pink'
const end = 'blue'
const wall = 'black'

export default function MainGrid(){
    const [grid, setGrid] = useState([[<></>]])
    const start_pos = useRef('')
    const end_pos = useRef('')
    let wall_construction = false

    const makeGrid = (lenght: number)=>{
        let result: JSX.Element[][] =[]
        for (let i=0;i<lenght;i++){
            result.push([])
            for (let j=0;j<lenght;j++){
                result[i].push(<div className='square' id={i+','+j} key={i+','+j} onMouseEnter={()=>{
                    makeWall(i+','+j)
                }} onClick={()=>{
                    startEndClick(i+','+j)
                }}></div>)
            }
        }
        setGrid(result)
    }

    const makeWall = (id:string)=>{
        if (wall_construction){
            if (document.getElementById(id) !== null){
                document.getElementById(id)!.style.backgroundColor = wall
            }
        }
    }

    const startEndClick = (id:string)=>{
        const doc = document.getElementById(id)
        if (doc !== null){
            if (start_pos.current === ''){
                doc.style.backgroundColor = start
                start_pos.current = id
            } else if (end_pos.current === '' && start_pos.current !== id){
                doc.style.backgroundColor = end
                end_pos.current = id
            }
        }
    }

    useEffect(()=>{
        makeGrid(41)
        const start_draw = document.getElementById('main_grid')!.addEventListener('mousedown', ()=>{
            wall_construction = true
        })
        const end_draw = document.getElementById('main_grid')!.addEventListener('mouseup', ()=>{
            wall_construction = false
        })
    },[])

    return (
        <>
            <div id='main_grid' >
                {grid}
            </div>
            <button onClick={()=>{
                aStart(start_pos.current, end_pos.current)
            }}>
                click
            </button>
        </>
    )
}