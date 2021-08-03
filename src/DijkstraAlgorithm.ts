import { len } from "./MainGrid"
import PriorityQueue from "./priorityQueue"
import { findPath, play, neighbors, Position, checked, open, positionFormat } from "./algorithmUtils"

export default function dijkstra(start:string, end:string){
    const start_pos = positionFormat(start)
    const end_pos = positionFormat(end)
    let visualizer = [{
        element:{x:start_pos.x, y:start_pos.y},
        color:start
    }]
    let count = 0
    let came_from:Position[][] = []
    for (let i=0;i<len;i++){
        came_from.push([])
        for (let j=0;j<len*2;j++){
            came_from[i].push({x:-1, y:-1})
        }
    }
    let f_score:number[][] = []
    for (let i=0;i<len;i++){
        f_score.push([])
        for (let j=0;j<len*2;j++){
            f_score[i].push(Infinity)
        }
    }
    f_score[start_pos.x][start_pos.y] = 0
    let open_set = new PriorityQueue()
    open_set.add(start_pos, {
        f_score: count,
        count: count
    })
    let open_set_hash = [start_pos]

    let i=0
    while (!open_set.isEmpty()){
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
            const temp_f_score = f_score[current.x][current.y] + 1

            if (temp_f_score < f_score[neighbor.x][neighbor.y]){
                came_from[neighbor.x][neighbor.y] = current
                f_score[neighbor.x][neighbor.y] = f_score[current.x][current.y] + 1
                if (open_set_hash.indexOf(neighbor) === -1){
                    count += 1
                    open_set.add(neighbor, {
                        f_score: count,
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
        open_set.remove()
    }

    return false
}