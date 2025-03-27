// List sorting mechanism I made in ~5 minutes for fun


var a = [1,2,5,1,7,3,3,10,13,6,7,8,4,2,19999,38389,352737]
let out = [];


function slowsort(list){  
    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {
          out.push(list[i]);
        }, list[i]/10000);
    }
    console.log(out)

}

slowsort(a)
