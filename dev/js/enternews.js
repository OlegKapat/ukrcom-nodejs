$(function(){
    $('.addnews').on('click',function(e){
        e.preventDefault();
       var user={
           name:$('.name').val('Oleg'),
           password:$('.password').val('asdasd')
       }
       if(!name || !password){
           $('.name').after('<p>Помилка реестрації</p> ');
       }
       else{
           $('.name').after('<p>Вдало</p> ');
       }
    })
});