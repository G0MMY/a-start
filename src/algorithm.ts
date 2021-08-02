import { len, wall, start } from "./MainGrid"
import PriorityQueue from "./priorityQueue"

const checked = '#e64809'
const open = '#e81e6f'
const path = 'purple'

interface Position{
    x:number,
    y:number
}

interface Visualizer{
    element: Position
    color: string
}

export default function aStart(start:string, end:string){
    const start_pos = {
        x: parseInt(start.split(',')[0]), 
        y: parseInt(start.split(',')[1])
    }
    const end_pos = {
        x: parseInt(end.split(',')[0]), 
        y: parseInt(end.split(',')[1])
    }
    let visualizer = [{
        element:{x:start_pos.x, y:start_pos.y},
        color:start
    }]
    let count = 0
    let open_set = new PriorityQueue()
    open_set.add(start_pos, {
        f_score: distance(start_pos, end_pos),
        count: count
    })
    let came_from:Position[][] = []
    for (let i=0;i<len;i++){
        came_from.push([])
        for (let j=0;j<len*2;j++){
            came_from[i].push({x:-1, y:-1})
        }
    }
    let g_score:number[][] = []
    for (let i=0;i<len;i++){
        g_score.push([])
        for (let j=0;j<len*2;j++){
            g_score[i].push(Infinity)
        }
    }
    g_score[start_pos.x][start_pos.y] = 0
    let f_score:number[][] = []
    for (let i=0;i<len;i++){
        f_score.push([])
        for (let j=0;j<len*2;j++){
            f_score[i].push(Infinity)
        }
    }
    f_score[start_pos.x][start_pos.y] = distance(start_pos, end_pos)
    let open_set_hash = [start_pos]

    while (!open_set.isEmpty()){
        let changed = false
        let current = open_set.front().element
        const index = open_set_hash.indexOf(current)
        open_set_hash.splice(index, 1)

        if (current.x === end_pos.x && current.y === end_pos.y){
            findPath(current, came_from, visualizer)
            play(visualizer)
            return true
        }

        const neighbors_array = neighbors(current)
        neighbors_array.forEach((neighbor)=>{
            const temp_g_score = g_score[current.x][current.y] + 1

            if (temp_g_score < g_score[neighbor.x][neighbor.y]){
                changed = true
                came_from[neighbor.x][neighbor.y] = current
                g_score[neighbor.x][neighbor.y] = temp_g_score
                f_score[neighbor.x][neighbor.y] = distance(neighbor, end_pos) + temp_g_score
                if (open_set_hash.indexOf(neighbor) === -1){
                    count += 1
                    open_set.add(neighbor, {
                        f_score: f_score[neighbor.x][neighbor.y],
                        count: count
                    })
                    open_set_hash.push(neighbor)
                    visualizer.push({
                        element: neighbor,
                        color: open
                    })
                }
            }
        })
        visualizer.push({
            element: current,
            color: checked
        })
        if (!changed){
            open_set.remove()
        }
    }

    return false
}

const findPath = (current:Position, came_from:Position[][], visualizer: Visualizer[]):boolean=>{
    if (came_from[current.x][current.y].x === -1 && came_from[current.x][current.y].y === -1){
        return true
    }
    visualizer.push({
        element: current,
        color: path
    })
    return findPath(came_from[current.x][current.y], came_from, visualizer)
}

const play = (visualizer: Visualizer[])=>{
    let i = 0
    visualizer.forEach((elem)=>{
        i += 1
        setTimeout(()=>{
            document.getElementById(elem.element.x + ',' + elem.element.y)!.style.backgroundColor = elem.color
        }, i * 4)
    })
}

const neighbors = (current:Position)=>{
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

const distance = (current:Position, end:Position)=>{
    return Math.abs(current.x - end.x) + Math.abs(current.y - end.y)
}