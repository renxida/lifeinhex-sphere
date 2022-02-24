const colors = {
    0: 0x111111,
    1: 0xA60505,
    // true: 0x330110,
    // false: 0x6ea284,
}



var randomize_sphere = function(hexasphere){
    console.log(hexasphere);
    hexasphere.tiles.forEach(function(tile){
        x = Math.random() < 0.7 ? 1 : 0;
        console.log("x:");
        console.log(x);
        tile.is_alive=x;
        tile.mesh.material.color.set(colors[x]);
    })
    console.log("done randomizing");
}

var survival_rule = function(aliveSelf, aliveNeighbors){
    if(aliveSelf == 1){
        if(aliveNeighbors == 2 || aliveNeighbors == 3){
            return 1;
        } else {
            return 0;
        }
    } else {
        if(aliveNeighbors == 3){
            return 1;
        } else {
            return 0;
        }
    }
}

var step_sphere = function(hexasphere){
    console.log("stepping sphere");

    var step_tile = function(tile){
        let sum = 0;
        tile.neighbors.forEach(function(n){sum+=n.is_alive});
        return survival_rule(tile.is_alive, sum);
    }
    
    next_state = hexasphere.tiles.map(step_tile);

    for(var i = 0; i< hexasphere.tiles.length; i++){
        if(hexasphere.tiles[i].is_alive != next_state[i]){
            hexasphere.tiles[i].is_alive = next_state[i];
            hexasphere.tiles[i].mesh.material.color.set(colors[next_state[i]]);
        }
    }
}