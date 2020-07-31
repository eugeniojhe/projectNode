function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  function showOk() {
    alert( "You agreed." );
  }
  
  function showCancel() {
    alert( "You canceled the execution." );
  }
  
  // usage: functions showOk, showCancel are passed as arguments to ask
  ask("Do you agree?", showOk, showCancel);

  let sum =  ( a,b ) => a + b; 
  
  
  sum(5,10); 


  let mult = n => n * 2;
  
  mult(100); 


  let tomorrow = () => alert('Tomorow will be a great day'); 

  tomorrow(); 


  let age = prompt('What is your age','');

  let verifyAge = (age > 18)?
        ()=>alert('You have to join to Brazilian Army '+age):
        ()=>alert('You are not in time to join at Brazilian Army '+age);
    
verifyAge(); 


let sum = (a, b) =>  a + b;
   
 alert( sum(1, 2) ); 