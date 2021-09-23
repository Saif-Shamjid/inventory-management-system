updateScreen()

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
        },
        loss: {
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
    showCommmon(db,'capital');
    showCommmon(db,'invest')
    showCommmon(db,'selling');
    showCommmon(db,'cost');
    showCommmon(db,'profit');
    showCommmon(db,'loss');
}


function showCommmon(db,name){
    let showFild= document.getElementById(name+'-show-fild');
    let value = db[name].value;
    showFild.innerText = value;
}


function updateCommon(name){
    let db = initDb();
    let inputFild = document.getElementById(name+'-input-fild');
    let inputFildValue = parseInt(inputFild.value);
    inputFild.value = '';

    if(inputFildValue){
        db[name].value += inputFildValue;
        updateDb(db);
        updateScreen();
    }

    if(name=='cost' || name=='selling'){
        profitLossControlar()
        updateScreen();
    }
    
}

function updateInvest(){
    let db = initDb();
    let capitalValue = db.capital.value;
    let inputFild = document.getElementById('invest-input-fild');
    let inputFildValue = parseInt(inputFild.value);
    inputFild.value = '';
    
    if(inputFildValue){
        if(capitalValue >= inputFildValue){
            db.capital.value -= inputFildValue;
            db.invest.value += inputFildValue;
            updateDb(db);
            updateScreen();
        }
        else{
            console.log('not enough money in capital');
        }
    }
}
    
function profitLossControlar(){
    let db = initDb();
    let sellingAmount = db.selling.value;
    let costAmount = db.cost.value;
    
    clearValue(db,'profit');
    clearValue(db,'loss');

    if(sellingAmount>costAmount){
        updateProfitLoss(db,sellingAmount,costAmount,'profit');
    }
    else if(costAmount>sellingAmount){
        updateProfitLoss(db,costAmount,sellingAmount,'loss');
    }
}

function updateProfitLoss(db,amount1,amount2,whereToAdd){
    let value1 = amount1-amount2;
    db[whereToAdd].value = value1;
    
    updateDb(db);
}

function clearValue(db,which){
    db[which].value = 0;
    updateDb(db);
}