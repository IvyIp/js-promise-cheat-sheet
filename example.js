var helperPromises = {
    'resolvePromise': function(second){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`promise resolved after ${second} second`);
                resolve(second);
            }, second * 1000)
        })
    },
    'rejectPromise': function(second){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`promise rejected after ${second} second`);
                reject(second);
            }, second * 1000)
        })
    }
}

// ** Please call the following functions separately to see the result ** //

function simpleResolvePromise(){
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('timeout');
            resolve();
        }, 1000)
    }).then(() => {
        console.log('resolved');
    }).catch(() => {
        console.log('this line will never be reached');
    })
}

function simpleRejectPromise(){
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('timeout');
            reject();
        }, 1000)
    }).then(() => {
        console.log('this line will never be reached');
    }).catch(() => {
        console.log('rejected');
    })
}

function simpleResolveOrRejectPromise(){
    new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.random();
            if (num > 0.5){
                resolve(num);
            }else{
                reject(num);
            }
        }, 1000)
    }).then((num) => {
        console.log(`resolved with num ${num}`);
    }).catch((num) => {
        console.log(`rejected with num ${num}`);
    }).then(() => {
        console.log(`will reach this line no matter resolved/rejected`);
    })
}


function chainPromiseSuccess(){
    helperPromises.resolvePromise(1).then(()=>{
        return helperPromises.resolvePromise(2)
    }).then(() => {
        return helperPromises.resolvePromise(3)
    }).then(() => {
        console.log('all success')
    })
}

function chainPromiseFail(){
    helperPromises.resolvePromise(1).then(()=>{
        return helperPromises.resolvePromise(2)
    }).then(() => {
        return helperPromises.rejectPromise(3)
    }).then(() => {
        console.log('all success')
    }).catch(() => {
        console.log('something goes wrong')
    }).then(() => {
        console.log(`will reach this line no matter resolved/rejected`);
    })
}

function simplePromiseAll(){
    Promise.all([
        helperPromises.resolvePromise(1),
        helperPromises.resolvePromise(2),
        helperPromises.resolvePromise(1)
    ]).then((results)=>{
        console.log(`all promises finished with values ${results}`);
        console.log(`all of them start at the same time`);
    })
}

async function awaitPromiseAll(){
    Promise.all([
        await helperPromises.resolvePromise(1),
        await helperPromises.resolvePromise(2),
        await helperPromises.resolvePromise(1)
    ]).then((results)=>{
        console.log(`all promises finished with values ${results}`);
        console.log(`all of them executed one by one`);
    })
}