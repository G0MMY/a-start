import { len, wall } from './MainGrid'

export interface Position{
    x:number,
    y:number
}
interface Visualizer{
    element: Position
    color: string
}

export const checked = 'red'
export const open = 'orange'
const path = 'purple'

export const findPath = (current:Position, came_from:Position[][], visualizer: Visualizer[]):boolean=>{
    if (came_from[current.x][current.y].x === -1 && came_from[current.x][current.y].y === -1){
        return true
    }
    visualizer.push({
        element: current,
        color: path
    })
    return findPath(came_from[current.x][current.y], came_from, visualizer)
}

export const play = (visualizer: Visualizer[])=>{
    let i = 0
    document.getElementById('app')!.style.pointerEvents = 'none'
    visualizer.forEach((elem)=>{
        i += 1
        setTimeout(()=>{
            document.getElementById(elem.element.x + ',' + elem.element.y)!.style.backgroundColor = elem.color
        }, i * 4)
    })
    setTimeout(()=>{
        document.getElementById('app')!.style.pointerEvents = 'auto'
    }, i * 4)
}

export const neighbors = (current:Position)=>{
    let neighbors_array = []
    
    if (current.x > 0){
        if (document.getElementById((current.x - 1) + ',' + current.y)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x - 1, 
                y: current.y
            })
        }
    } if (current.x < len - 1){
        if (document.getElementById((current.x + 1) + ',' + current.y)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x + 1, 
                y: current.y
            })
        }
    } if (current.y > 0){
        if (document.getElementById(current.x + ',' + (current.y - 1))!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x, 
                y: current.y - 1
            })
        }
    } if (current.y < len * 2 - 1){
        if (document.getElementById(current.x + ',' + (current.y + 1))!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x, 
                y: current.y + 1
            })
        }
    }

    return neighbors_array
}

export const distance = (current:Position, end:Position)=>{
    return Math.abs(current.x - end.x) + Math.abs(current.y - end.y)
}


export const positionFormat = (position:string)=>{
    return {
        x: parseInt(position.split(',')[0]), 
        y: parseInt(position.split(',')[1])
    }
}