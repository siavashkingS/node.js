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
    console.log('now enter the names you want me to add:')
})
var person=[];
rl.on('line',(input)=>{
    if(input.length<3){
        console.log('please enter a valid name');
        return;
    }
    if(input=='exit'){
        console.log('see you later')
        rl.close();
    }
else{
    person.push(input);
    console.log(`add ${input} to the list`)
    console.log('we currently have '+person.length+' person')
    }   
})