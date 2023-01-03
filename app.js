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
                    //класс к элементам которые нашли
                    element.classList.add('search-result');
                    //считаем количество элементов которые нашли
                    let foundCounter = 0;
                    let allElementsResult = Array.prototype.slice.call(document.querySelectorAll('.search-result'));
                    document.getElementById('allSearchResult').innerHTML = allElementsResult.length.toString();
                    allElementsResult[foundCounter].classList.add('border');

                } else {
                    /**
                     * @todo убрать если не понадобится */
                    // класс к элементам которые не относятся к найденным
                    element.classList.add('search-result-remove');
                }
            });
        } else {
            cards.forEach(element => {
                element.classList.remove('search-result-remove');
                element.classList.remove('search-result');
                element.classList.remove('border');
                document.getElementById('allSearchResult').innerHTML = '0';
                document.getElementById('switchResult').innerHTML = '0';
            });
        }


    }

}