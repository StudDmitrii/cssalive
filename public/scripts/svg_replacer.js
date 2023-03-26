

$('[data-svg]').each(function (index) {
    $(this).load('../imgs/'+$(this).data('svg'));
});