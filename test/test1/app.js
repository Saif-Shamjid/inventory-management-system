function initDb(){
    let db = localStorage.getItem('everything');
    if(db){
        return JSON.parse(db);
    }
    else{
        createDb();
        db = localStorage.getItem('everything');
        return JSON.parse(db);
    }
}

function createDb(){
    let db = {
        capital: {
            value: 0
        },
        invest: {
            value: 0
        },
        selling: {
            value: 0
        },
        cost: {
            value: 0
        },
        profit: {
            value: 0
        }
    };
    updateDb(db);
    
}

function updateDb(db){
    let dbStr = JSON.stringify(db);
    localStorage.setItem('everything', dbStr);
}


function updateScreen(){
    let db = initDb();
    showCapital();
}


function updateCapital(){
    let db = initDb();
    let inputFild = document.getElementById('capital-input-fild');
    let inputFildValue = parseInt(inputFild.value);
    inputFild.value = '';

    if(inputFildValue){
        db.capital.value += inputFildValue;
        updateDb(db);
    }
    
}

function showCapital(db){
    let showFild= document.getElementById('capital-show-fild');
    let value = db.capital.value;
    showFild.innerText = value;

}