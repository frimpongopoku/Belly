<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Test For Assan</title>
</head>
<body>
  <center>
    <input type="hidden" id="value-holder" value="0">
    <h1><span id="click-number">0</span> Click(s)
    <div id ="my-div" style="background:black; padding:50px;cursor:pointer;"> 
    </div> 
  </center>
  
</body>
<script> 
  var theClickFunction = function(){
    //get the value of the input and check if its equal to 3 
    //if it is not, then change the color to its associate number, 
    //after, update the value of the input box, 
    //inaa that!!
    let countValue = Number(document.getElementById('value-holder').value);//changedto integer
    let numberShower = document.getElementById('click-number'); 
    let numberShowerValue = Number(numberShower.innerHTML); 
    if(countValue !==2){
      //if countValue is not 3, then just keep changing the colors
      var colorDiv = document.getElementById('my-div');
      var countValueHolder = document.getElementById('value-holder');
      switch(countValue){
        case 0: 
          //when value is 1
          //change div color
          colorDiv.style.background = "red"; 
          //update the count value in the h1
          numberShower.innerHTML = numberShowerValue + 1; 
          //increase count value in the value-holder inputbox
          countValueHolder.value = countValue + 1; 
          break;
        case 1: 
          //when value is 2
          //change div color
          colorDiv.style.background = "green"; 
          //update the count value in the h1
          numberShower.innerHTML = numberShowerValue + 1; 
          //increase count value in the value-holder inputbox
          countValueHolder.value = countValue + 1; 
          break; 
        default: 
          break; 
      }
    }
    else{
      //when it is three, reset the count value, and reset the color to
      //the first one
      document.getElementById('value-holder').value = "1"; 
      document.getElementById('my-div').style.background ="red";
    }
  }
  var myDiv = document.getElementById('my-div'); 
  myDiv.addEventListener('click',function(){
    theClickFunction();
  })
</script>
</html>