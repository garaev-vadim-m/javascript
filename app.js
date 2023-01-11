window.onload = () => {
    let searchPanel = document.querySelector('#inputSearchPanel');

    /**
     * @description поиск элементов на странице. Аналог ctrl+f
     */

    searchPanel.oninput = function () {

        const value = this.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.cards');

        if (value) {
            cards.forEach(element => {

                if (element.innerText.toLowerCase().search(value) !== -1) {
                    if (value.length > 2) {
                        element.classList.add('search-result');
                        document.getElementById('foundSearching').classList.remove('display-none');
                    } else {
                        element.classList.remove('search-result');
                        document.getElementById('foundSearching').classList.add('display-none');
                    }

                    let switchResultFounds = document.querySelector('.search-result');
                    if (value.length > 2) switchResultFounds.classList.add('active');

                    let allElementsResult = document.querySelectorAll('.search-result');
                    document.getElementById('allSearchResult').innerHTML = allElementsResult.length.toString();

                    let index = 0;

                    const nextElement = () => {
                        const list = document.querySelectorAll('.search-result');

                        if (index >= 0) {
                            list[index].classList.remove('active');
                        }

                        index = (index + list.length + 1) % list.length;
                        list[index].classList.add('active');

                        let activeViewScroll = document.querySelector('.search-result.active');

                        activeViewScroll.scrollIntoView(true);

                        document.getElementById('switchResult').innerHTML = index + 1;
                    };

                    const prevElement = () => {
                        const list = document.querySelectorAll('.search-result');

                        if (index >= 0) {
                            list[index].classList.remove('active');
                        }

                        index = (index + list.length - 1) % list.length;
                        list[index].classList.add('active');

                        let activeViewScroll = document.querySelector('.search-result.active');

                        activeViewScroll.scrollIntoView(true);

                        document.getElementById('switchResult').innerHTML = index + 1;
                    };


                    document.getElementById('select-next').addEventListener('click', () => {
                        nextElement()
                    });

                    document.getElementById('select-prev').addEventListener('click', () => {
                        prevElement()
                    });

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
                element.classList.remove('active');
                document.getElementById('allSearchResult').innerHTML = '0';
                document.getElementById('switchResult').innerHTML = '1';
                document.getElementById('foundSearching').classList.add('display-none');
            });
        }


    }

}