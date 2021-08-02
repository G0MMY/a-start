import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import aStart from "./algorithm";
import { Button } from '@material-ui/core'

export const start = 'orange'
const end = 'blue'
export const wall = 'black'
export const len = 35

export default function MainGrid(){
    const [grid, setGrid] = useState([[<tr key='initial'></tr>]])
    const start_pos = useRef('')
    const end_pos = useRef('')
    let wall_construction = false

    const makeRow = (length: number, row_number:number)=>{
        let row = []
        for (let i=0;i<length;i++){
            row.push(<td className='square' key={row_number + ',' + i} id={row_number + ',' + i} onMouseEnter={()=>{
                makeWall(row_number + ',' + i)
            }} onClick={()=>{
                squareClick(row_number + ',' + i)
            }}></td>)
        }

        return row
    }


    const makeTable = (length: number)=>{
        let table:JSX.Element[][] = []
        for (let i=0;i<length;i++){
            table.push([])
            table[i].push(<tr key={'tr ' + i}>{makeRow(length*2, i)}</tr>)
        }
        setGrid(table)
    }

    const makeWall = (id:string)=>{
        if (wall_construction){
            if (document.getElementById(id) !== null){
                document.getElementById(id)!.style.backgroundColor = wall
            }
        }
    }

    const squareClick = (id:string)=>{
        const doc = document.getElementById(id)
        if (doc !== null){
            if (start_pos.current === ''){
                doc.style.backgroundColor = start
                start_pos.current = id
            } else if (end_pos.current === '' && start_pos.current !== id){
                doc.style.backgroundColor = end
                end_pos.current = id
            } else {
                doc.style.backgroundColor = 'white'
            }
        }
    }

    const resetButton = ()=>{
        grid.forEach((row)=>{
            row.forEach((element)=>{
                const children:JSX.Element[] = element.props.children
                children.forEach((child)=>{
                    document.getElementById(child.props.id)!.style.backgroundColor = 'white'
                })
            })
        })
        start_pos.current = ''
        end_pos.current = ''
    }

    useEffect(()=>{
        makeTable(len)
        document.getElementById('main_grid')!.addEventListener('mousedown', ()=>{
            wall_construction = true
        })
        document.getElementById('main_grid')!.addEventListener('mouseup', ()=>{
            wall_construction = false
        })
    },[])

    return (
        <>
            <div id='header'>
                <Button id='visualize_button' variant='contained' onClick={()=>{
                    if (start_pos.current !== '' && end_pos.current !== ''){
                        const button = document.getElementById('visualize_button')!
                        if (button.textContent === 'Visualize'){
                            aStart(start_pos.current, end_pos.current)
                            button.style.backgroundColor = '#DC004E'
                            button.textContent = 'Clear'
                        } else {
                            resetButton()
                            button.style.backgroundColor = '#1976D2'
                            button.textContent = 'Visualize'
                        }
                    }
                }}>
                    Visualize
                </Button>
            </div>
            <table id='main_grid' >
                <tbody>
                    {grid}
                </tbody>
            </table>
        </>
    )
}