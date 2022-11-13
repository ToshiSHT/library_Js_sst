import $ from "../core";

$.prototype.html = function(content) { // добавдение или полуение html
    for (let i = 0 ; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }
    return this;
};

$.prototype.eq = function(i) { // обращение к элементу по номеру
    const swap = this[i];
    const objLength = Object.keys(this).length;
    for (let j = 0 ; j < objLength; j++) {
      delete this[i];
    }
    this[0] = swap;
    this.length = 1
    return this;
};

$.prototype.index = function() {  // возвращает индек элемента среди его соседей
   const parent = this[0].parentNode;
   const childs = [...parent.children];
   const findMyIndex = (item) => {
    return item == this[0];
   }
   return childs.findIndex(findMyIndex);
};

$.prototype.find = function(selector) {
    let numberOfItems = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) {
            continue;
        }

        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }

        numberOfItems += arr.length;
    }

    this.length = numberOfItems;

    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};


$.prototype.closest = function(selector) {
    let counter = 0;
    for (let i = 0; i < this.length; i++){
        this[i] = this[i].closest(selector) ? this[i].closest(selector) : this[i].parentNode ;
        counter++
    }

    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++) {
        delete this[counter];
    }

    return this;
}



$.prototype.siblings = function () {  // находим соседей не включая самого обьекта
 
    const newObj = [...this[0].parentElement.children].filter(item => item !== this[0])
 
    for (let i = 0; i < this.length; i++) {
        delete this[i]
    }
 
    Object.assign(this, newObj)
    this.length = newObj.length
    return this
}