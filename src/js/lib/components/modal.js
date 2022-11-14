import $ from "../core";

$.prototype.modal = function(created) {
    function calcScroll () {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;

    }

    const scroll = calcScroll ();
    for (let i = 0; i < this.length; i++){
        
        const target = this[i].getAttribute('data-target');
        $(this[i]).click((e) => {
            e.preventDefault();
            $(target).fadeIn(500);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            
        });
        const closeElements = document.querySelectorAll(`${target} [data-close]`);
        closeElements.forEach(elem => {
            $(elem).click(() => {
                $(target).fadeOut(500);
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                if (created) {
                    setTimeout(() => document.querySelector(target).remove(),500);
                }
            });
        });
    
        $(target).click(e => {
            if (e.target.classList.contains('modal')) {
                $(target).fadeOut(500);
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                if (created) {
                    setTimeout(() => document.querySelector(target).remove(),500);
                }
            }
        });

    }

};

$('[data-toggle="modal"]').modal(); //инициализация триггеров для открытия модальных окон

$.prototype.createModal = function({text,btns} = {} ) {
    for (let i = 0; i < this.length; i++){
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('id',this[i].getAttribute('data-target').slice(1));
        const buttons = [];
        for (let j = 0; j < btns.count; j++){
            const [btnName, btnClasses, btnClose, btnCallBackFun] = [
                ...btns.settings[j]];
            let btn = document.createElement('button');
            btn.classList.add('btn', ...btnClasses);
            btn.textContent = btnName;
            if (btnClose) {
                btn.setAttribute('data-close','true');
            }
            if(btnCallBackFun && typeof btnCallBackFun == 'function' ) {
                btn.addEventListener('click', btnCallBackFun);
            }
            buttons.push(btn);
        }
        modal.innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
            <button class="close" data-close>
                <span>&times;</span>
            </button>
            <div class="modal-header">
                <div class="modal-title">
                    ${text.title}
                </div>
            </div>
            <div class="modal-body">
                ${text.body}
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
        `;

        modal.querySelector('.modal-footer').append(...buttons)
        document.body.append(modal);
        $(this[i]).modal(true);
        $(this[i].getAttribute('data-target')).fadeIn(500);
    }
};