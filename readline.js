const readline= require('readline');

var rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('How do you feel? ',(answer)=>{
    if (answer=='good'){
        console.log('Im happy to hear that');
    }
    else if(answer=='bad'){
        console.log('I hope you get good soon');
    }
    rl.close();
})