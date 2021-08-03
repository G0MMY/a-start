import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import aStart from "./aStarAlgorithm";
import { Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import dijkstra from "./DijkstraAlgorithm";

export const start = 'orange'
const end = 'blue'
export const wall = 'black'
export const len = 35

export default function MainGrid(){
    const [grid, setGrid] = useState([[<tr key='initial'></tr>]])
    const start_pos = useRef('')
    const end_pos = useRef('')
    const wall_construction = useRef(false)
    const [algorithm, setAlgorithm] = useState('a_star')

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
        if (wall_construction.current){
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
                if (id === start_pos.current){
                    start_pos.current = ''
                } else if (id === end_pos.current){
                    end_pos.current = ''
                }
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

    const clearButton = ()=>{
        grid.forEach((row)=>{
            row.forEach((element)=>{
                const children:JSX.Element[] = element.props.children
                children.forEach((child)=>{
                    const doc = document.getElementById(child.props.id)!
                    if (child.props.id === start_pos.current){
                        doc.style.backgroundColor = start
                    } else if (child.props.id === end_pos.current){
                        doc.style.backgroundColor = end
                    } else if (doc.style.backgroundColor !== wall){
                        doc.style.backgroundColor = 'white'
                    }
                })
            })
        })
    }

    const handleAlgorithmChange = (e:
        React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>)=>{
        if (typeof(e.target.value)==='string'){
            setAlgorithm(e.target.value)
        }
    }

    useEffect(()=>{
        makeTable(len)
        document.getElementById('main_grid')!.addEventListener('mousedown', ()=>{
            wall_construction.current = true
        })
        document.getElementById('main_grid')!.addEventListener('mouseup', ()=>{
            wall_construction.current = false
        })
    },[])

    return (
        <>
            <div id='header'>
                <FormControl id="algorithm_form">
                    <InputLabel id="algorithm_selecter">Algorithm</InputLabel>
                    <Select labelId="algorithm_selecter" id="label" value={algorithm} onChange={(e)=>{handleAlgorithmChange(e)}}>
                        <MenuItem value="a_star">A star</MenuItem>
                        <MenuItem value="dijkstra">Dijkstra</MenuItem>
                    </Select>
                </FormControl>
                <Button id='visualize_button' variant='contained' onClick={()=>{
                    if (start_pos.current !== '' && end_pos.current !== ''){
                        const button = document.getElementById('visualize_button')!
                        if (button.textContent === 'Visualize'){
                            if (algorithm === 'a_star'){
                                aStart(start_pos.current, end_pos.current)
                            } else {
                                dijkstra(start_pos.current, end_pos.current)
                            }
                            button.style.backgroundColor = '#DC004E'
                            button.textContent = 'Clear Visualization'
                        } else {
                            clearButton()
                            button.style.backgroundColor = '#1976D2'
                            button.textContent = 'Visualize'
                        }
                    }
                }}>
                    Visualize
                </Button>
                <Button id='reset_button' variant='contained' color='secondary' onClick={()=>{resetButton()}}>
                    Reset
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