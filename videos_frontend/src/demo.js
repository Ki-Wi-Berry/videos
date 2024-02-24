let flag

function deepclone(obj){
    if(typeof(obj)!='object') return obj;
    let temp= Array.isArray(obj)?[]:{};

    for(let key in obj){
        if(typeof(obj[key])=='object'){
            temp[key]=deepclone(obj[key]);
        }else{
            temp[key]=obj[key];
        }
    }
    return temp;
}



