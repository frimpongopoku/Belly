$(document).ready(()=>{
   // alert($('.back-img').attr('src'))
   console.log('Addeya form ');

    var imageReplace = ()=> {
        setTimeout(() => {
            var bigImage = document.createElement('img'); 
            bigImage.src = 'http://localhost:8000/imgs/blue-orange.jpg';
            bigImage.onload = function(){
                $('.first').css({'background':'url('+bigImage.src+')', backgroundSize:'cover',backgroundPosition:'center center'});
                $('.first').removeClass('blur').addClass('noblur');
            }
            
        }, 300);
    }
    imageReplace();

  
        
})