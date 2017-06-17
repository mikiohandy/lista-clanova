$(document).ready(function(){
    
display();
    

    
var poruka = '<p>Uspešno ste uneli podatke</p>';
    
    $('#unesi-dugme').on('click', function(e){
      e.preventDefault();
        
        var ime = $('#ime').val(),
            prezime = $('#prezime').val(),
            adresa = $('#adresa').val(),
            email = $('#email').val(),
            telefon = $('#telefon').val();
        
            $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/my-first-mongo/collections/members?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4",
            data: JSON.stringify({ 
                "ime": ime,
                "prezime": prezime,
                "adresa": adresa,
                "email": email,
                "telefon": telefon
            }),
            type: "POST",
            contentType: "application/json",
            success: function(data){
                window.location.href="index.html"
            },
            error: function(xhr, status, err){
                console.log(err);
            }
        });  
        
    
        display();
    });
 
display();

/*
function display (){
            $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/my-first-mongo/collections/members?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4"}).done(function(data){
                var output = '<div>';
                $.each(data, function(key, data){
                    output += '<div class = "well">';       
                    output += '<h4>'+ data.ime + ' ' + data.prezime + '</h4>'; 
                    output += '<p>'+ data.adresa +'</p>';
                    output += '<p>'+ data.email +'</p>';
                    output += '<p>'+ data.telefon +'</p>';
                    output += '</div>';
                });
                output += '</div>';
                $('#display-row').html(output);
            });  
};  
*/
function display (){
            $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/my-first-mongo/collections/members?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4"}).done(function(data){
                var output = '<table class="table table-hover"><thead><tr><th>#</th><th>Ime</th><th>Prezime</th><th>Adresa</th></tr></thead><tbody>';
                 $.each(data, function(index, data){
                     
                    output += '<tr><th scope="row">'+ (index + 1) +'</th><td>'+data.ime+'</td><td>'+data.prezime+'</td><td>'+data.adresa+'</td></tr>';
                });
                output += '</tbody></table>';
                $('#display-row').html(output);
            });  
};  

    
    
    
    
    
    
    
    
    
    
    
    
    
});