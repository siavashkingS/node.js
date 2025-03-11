const readline= require('readline');

var rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('How do you feel? ',(anwser)=>{
    if (anwser=='good'){
        console.log('Im happy to hear that');
    }
    else if(anwser=='bad'){
        console.log('I hope you get good soon');
    }
    rl.close();
})