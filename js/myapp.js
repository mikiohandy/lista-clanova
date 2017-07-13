$(document).ready(function(){
    
    display();
    
    
    var poruka = '<p>Uspešno ste uneli podatke</p>';
    
    $('#unesi-dugme').on('click', function(e){
        e.preventDefault();
        
            var member = {
                    ime: $('#ime').val(),
                    prezime: $('#prezime').val(),
                    adresa: $('#adresa').val(),
                    email: $('#email').val(),
                    telefon: $('#telefon').val(),
                    clanarina: false
            };
        
            $.ajax({ 
                    url: "https://api.mlab.com/api/1/databases/my-first-mongo/collections/members?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4",
                    data: JSON.stringify({ 
                        "ime": member.ime,
                        "prezime": member.prezime,
                        "adresa": member.adresa,
                        "email": member.email,
                        "telefon": member.telefon,
                        "clanarina": member.clanarina,
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
                
                var output = '<table class="table table-hover"><thead><tr><th>#</th><th>Ime</th><th>Prezime</th><th>Adresa</th>         <th>Telefon</th><th>Članarina</th><th>Datum</th></tr></thead><tbody>';
                    
                
                 $.each(data, function(index,data){
                     var checkStatus = data.clanarina ? 'checked = "checked"' : '',
                         switchButton = '<div class="switch"><label>Off<input id="proba" data-id="'+data._id.$oid+'" data-switchstatus="'+data.clanarina+'"type="checkbox"'+ checkStatus +'><span class="lever"></span>On</label></div>',
                         deleteButton = '<button id="deleteButton" type="button" class="btn btn-danger btn-sm" data-id="'+data._id.$oid+'" >Obriši</button>',
                         dateButton = '<button id="dateButton" type="button" class="btn btn-danger btn-sm" data-id="'+data._id.$oid+'">Datum</button>';
                     
                    output += '<tr><th scope="row">'+ (index + 1) +'</th><td>'+data.ime+'</td><td>'+data.prezime+'</td><td>'+data.adresa+'</td><td>'+data.telefon+'</td><td>'+switchButton+'</td><td>'+dateButton+'</td><td>'+deleteButton+'</td></tr>';
                    });
                    output += '</tbody></table>';
                
                $('#display-row').html(output);
            });  
};  
    
    
// SWITCH BUTTON
   
$('#display-row').on('click', 'input', function(){
        var id = $(this).data('id'),
            switchCheck = $(this).data('switchstatus'),
               // console.log(switchCheck),
            idUrl = 'https://api.mlab.com/api/1/databases/my-first-mongo/collections/members/'+id+'?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4';
            
    switchCheck = !switchCheck;
    
    $.ajax({ 
          url: idUrl,
		  data: JSON.stringify(
                { "$set" : { "clanarina" : switchCheck } }),
		  type: "PUT",
		  contentType: "application/json"
    }).fail(function(data){
        alert ('Failed!');
    })
            console.log(switchCheck);    
});
    
// DELETE DATA
    
$('#display-row').on('click','#deleteButton', function(){
    
    var id = $(this).data('id'),
        url = 'https://api.mlab.com/api/1/databases/my-first-mongo/collections/members/'+id+'?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4';
    
    $.ajax({ 
          url: url,
		  type: "DELETE",
		  success: function(data){
                window.location.href="index.html"
          },
            error: function(xhr, status, err){
            console.log(err);
            }
    })   
}); 
    
// DATE

$('#display-row').on('click','#dateButton', function(){
    
    var id = $(this).data('id'),
        url = 'https://api.mlab.com/api/1/databases/my-first-mongo/collections/members/'+id+'?apiKey=nzIFzNz9TATGyU-0a7h37qlZTP-RpBU4',
        months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
        dateGenerator = new Date();
    
    $.ajax({ 
          url: url,
		  data: JSON.stringify(
                { "$set" : { "date" : months[dateGenerator.getMonth()]} }),
		  type: "PUT",
		  contentType: "application/json"
    }).fail(function(data){
        alert ('Failed!');
    })
            console.log(switchCheck);     
}); 
    
$(".button-collapse").sideNav();

    
    
    
    
    
    
});