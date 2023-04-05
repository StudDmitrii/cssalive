//global
var settings_data = $('input[name="global_set"]:checked').val();

//btns

var settings_open = false;

$('.settings').on('click', function(){
    if (!settings_open){

        $('.app_container').css('transition', 'grid-template-columns 1s');
        $('.middlecol').css('justify-content','stretch');
        $('.app_container').css('grid-template-columns', '1fr 40vw 1fr');
        $('.start, .report, .settings').css('display', 'none');

        $('.leftcol, .rightcol').css('opacity', '0.5');
        $('.settings_block').css('opacity','1');

        setTimeout(function(){
            $('.app_container').css('transition', '');
            $('.accept_block').css('opacity', '0.8');
            settings_open = true;
        }, 1000);
    }
});

const closeSettings = () => {
    if (settings_open){
        $('.accept_block').css('opacity', '0');

        $('.app_container').css('transition','grid-template-columns 1s');
        
        $('.app_container').css('grid-template-columns','1fr 2vw 1fr');
        

        $('.leftcol, .rightcol').css('opacity', '1');
        $('.settings_block').css('opacity','0');

        setTimeout(function () {
            
            $('.app_container').css('transition', '');
            $('.middlecol').css('justify-content', 'center');
            $('.start, .report, .settings').css('display', 'block');
            settings_open = false;
        }, 1000);
    }
};

$('.settings_block .accept, .settings_block .cancel').on('click', () => {
    closeSettings();
});





$('.middlecol .start').on('click', function(){
    if (editor.getValue() != "") {
        $('.rightcol .upload_block').fadeOut(100, 'linear');

        $.post("http://localhost:3001/app/result", { text: editor.getValue(), settings: settings_data }, function(data) {
            out.setValue(data);
        });
    }
});





$('.settings_block .accept').on('click', () => {
    settings_data = $('input[name="global_set"]:checked').val();
});

alert("ss");