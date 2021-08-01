import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import aStart from "./algorithm";

const start = 'orange'
const end = 'blue'
export const wall = 'black'
export const len = 41

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

    const resetButton = ()=>{
        grid.forEach((row)=>{
            row.forEach((element)=>{
                document.getElementById(element.props.id)!.style.backgroundColor = 'white'
                start_pos.current = ''
                end_pos.current = ''
            })
        })
    }

    useEffect(()=>{
        makeGrid(len)
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
                find Path
            </button>
            <button onClick={()=>{
                resetButton()
            }}>
                reset
            </button>
        </>
    )
}