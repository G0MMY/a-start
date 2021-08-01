const checked = 'red'
const open = 'green'

interface Position{
    x:number,
    y:number
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
    let current = {
        x: start_pos.x, 
        y: start_pos.y
    }
    let min_distance = Infinity

    while (current.x !== end_pos.x && current.y !== end_pos.y){
        const neighbors_array = neighbors(current)
        neighbors_array.forEach((neighbor)=>{
            if (document.getElementById(neighbor.x + ',' + neighbor.y)!.style.backgroundColor !== 'black'){
                if (distance(neighbor, end_pos) < min_distance){
                    current = neighbor
                    min_distance = distance(neighbor, end_pos)
                }
                if (neighbor.x !== start_pos.x && neighbor.y !== start_pos.y){
                    document.getElementById(neighbor.x + ',' + neighbor.y)!.style.backgroundColor = checked
                }
            }
        })
    }
}

const neighbors = (current:Position)=>{
    let neighbors_array = []
    if (current.x > 0){
        neighbors_array.push({
            x: current.x - 1, 
            y: current.y
        })
    } if (current.x < 40){
        neighbors_array.push({
            x: current.x + 1, 
            y: current.y
        })
    } if (current.y > 0){
        neighbors_array.push({
            x: current.x, 
            y: current.y - 1
        })
    } if (current.y < 40){
        neighbors_array.push({
            x: current.x, 
            y: current.y + 1
        })
    }

    return neighbors_array
}

const distance = (current:Position, end:Position)=>{
    return Math.sqrt(Math.pow(current.x - end.x, 2) + Math.pow(current.y - end.y, 2))
}