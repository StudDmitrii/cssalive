var ready_to_start = false;

$('.upload_block').on('click', function(){
    editor.focus();
});

editor.on("change", function(){
    if (editor.getValue() == ''){
        $('.leftcol .upload_block, .leftcol .mini_description').fadeIn(10, 'linear');
        if (out.getValue() == '')
		    $('.rightcol .upload_block, .rightcol .mini_description').fadeIn(10, 'linear');
            
		$('.rightcol .upload_block').html(`
        <p>Здесь будет исправленный CSS код,</p>
        <p>когда выполните указания слева и нажмёте CТАРТ</p>
		`);
		$('.rightcol textarea').val('');
		ready_to_start = false;
    }
    else{
        $('.leftcol .upload_block, .leftcol .mini_description').fadeOut(100, 'linear');
		ready_to_start = true;
		$('.rightcol .upload_block').html(`
			<p>Здесь будет исправленный CSS код,</p>
            <p>когда нажмёте CТАРТ</p>
		`);
    }
});




$('#id_file').on('change', function(){
    if (!$(this).val()){
        alert();
        var selectedfile = $(this).files[0];
        alert(selectedfile);
    }
});