
import $ from './lib/lib';

$('#first').click(() => {
    $('div').eq(1).fadeToggle(800);
})

$('[data-count="second"]').click(() => {
    $('div').eq(2).fadeOut(800);
})
$('button').eq(2).click(() => {
    $('.w-500').fadeOut(800);
})

$('#trigger').click(() => {
    $('#trigger').createModal({
        text : {
            title: 'Бла бла бла',
            body: 'епта оно работает ыдоваржфыра фждлывоа фыдлваофывадл офы'
        },
        btns : {
            count : 3,
            settings : [
                ['1 кнопка', ['btn-primary'], false, () => alert('super')], // text class close? callback
                ['close', ['btn-warning', 'ml-10'], true, ''],
                ['super close', ['btn-dark','ml-10'], true, '']
            ]
        }
    
    });
})

$().get('https://jsonplaceholder.typicode.com/todos')
    .then(res => console.log(res));