window.onload = () => {
    let searchPanel = document.querySelector('#inputSearchPanel');

    /**
     * @description поиск элементов на странице
     */
    searchPanel.oninput = function () {

        const value = this.value.trim();
        const cards = document.querySelectorAll('.cards'); // выбираем все элементы

        if (value) {
            cards.forEach(element => {

                if (element.innerText.search(value) !== -1) {
                    //класс к элементам которые нашли от 3 символов
                    if (value.length > 2) {
                        element.classList.add('search-result');
                        document.getElementById('foundSearching').classList.remove('display-none');
                    } else {
                        element.classList.remove('search-result');
                        document.getElementById('foundSearching').classList.add('display-none');
                    }
                    //считаем количество элементов которые нашли
                    let allElementsResult = Array.prototype.slice.call(document.querySelectorAll('.search-result'));
                    document.getElementById('allSearchResult').innerHTML = allElementsResult.length.toString();

                    let index = 0;
                    const nextElement = () => {
                        const list = document.querySelectorAll('.search-result');
                        if (index !== 0) {
                            list[index - 1].classList.remove('active');
                        }
                        if (index >= list.length) index = 0;
                        list[index].classList.add('active');
                        index += 1;

                        document.getElementById('switchResult').innerHTML = index;
                    };

                    document.getElementById('select-next').addEventListener('click', () => {
                        nextElement()
                    });
                    //Первая вариация
                    // let buttonsGroup = {
                    //     prev: document.getElementById('select-prev'),
                    //     next: document.getElementById('select-next'),
                    // };
                    // //кнопки переходов к элементам
                    // let items = document.querySelectorAll("#items > div.cards.search-result");
                    // let index = 0;
                    //
                    // document.getElementById('switchResult').innerHTML = index + 1;
                    //
                    // buttonsGroup.next.addEventListener('click', function () {
                    //     index = (index + items.length + 1) % items.length;
                    //     document.getElementById('switchResult').innerHTML = index + 1;
                    //     updateSelection();
                    // });
                    //
                    // buttonsGroup.prev.addEventListener('click', function () {
                    //     index = (index + items.length - 1) % items.length;
                    //     document.getElementById('switchResult').innerHTML = index + 1;
                    //     updateSelection();
                    // });
                    //
                    // function updateSelection() {
                    //
                    //     let active = document.querySelector('#items > div.cards.search-result.active');
                    //
                    //     if (active) active.classList.remove('active');
                    //
                    //     items[index].classList.add('active');
                    // }


                } else {
                    /**
                     * @todo убрать если не понадобится */
                    // класс к элементам которые не относятся к найденным
                    element.classList.add('search-result-remove');
                }
            });
        } else {
            //классы которые нужно убирать
            cards.forEach(element => {
                element.classList.remove('search-result-remove');
                element.classList.remove('search-result');
                element.classList.remove('border');
                element.classList.remove('active');
                document.getElementById('allSearchResult').innerHTML = '0';
                document.getElementById('switchResult').innerHTML = '0';
                document.getElementById('foundSearching').classList.add('display-none');
            });
        }


    }

}