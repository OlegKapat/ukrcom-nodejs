$('document').ready(function(){
    $('.addnews').on('click',function(e){
        e.preventDefault();
       var user={
           name:$('.name').val(),
           password:$('.password').val()
       }
       if(user.name==="Oleg" & user.password==="asdasd"){
           location.href="news"; 
       }
       else{
           $('.addnews').after('<p style="color:red">Помилка реєєстрації!</p> ');
           
       }
    })
});