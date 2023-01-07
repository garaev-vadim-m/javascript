window.onload = () => {
    const input = document.getElementById('input')
    const next = document.getElementById('next')
    const out = document.getElementById('out')

    const delay = 300
    let tid = null
    let sText = ''
    let sItems = []
    let sRemove = []
    let nextPos = -1
// родительский контейнер для поиска
    const content = document.querySelector('.content')
// сюда можно добавить элементы для исключения
// если content = body, можно добавить всякие меню и input
    const exclude = [document.querySelector("#exclude")]

// перемещение scroll и подсветка текущего элемента
    next.addEventListener('click', nextItem)

    function nextItem() {
        sItems[nextPos === -1 ? sItems.length - 1 : nextPos].removeHighlight()
        sItems[++nextPos].next(nextPos)
        next.textContent = (nextPos + 1 === sItems.length) ? ((nextPos = -1)`1`) : `${nextPos + 2}`
    }

    input.addEventListener('input', () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
            let t = input.value.trim().toLowerCase()
            if (sText === t) {
                return
            }
            sText = t
            searchText()
        }, delay)
    })

    function createSpan(text) {
        let span = document.createElement('span')
        span.className = 'highlight'
        span.append(document.createTextNode(text))
        return span
    }

// Дальнейший поиск, подсветка и определение позиций
    function replace(parent, e, text, i) {
        let origin = e.data
        let alle = []
        let oldi = 0
        let posTop = content.getBoundingClientRect().top
        do {
            let l = i + sText.length
            let span = createSpan(origin.slice(i, l))
            let adds = [document.createTextNode(origin.slice(oldi, i)), span]
            adds.forEach((i) => parent.insertBefore(i, e))
            alle.push(...adds)
            oldi = l

            // Позиция для scroll
            let top = content.scrollTop + span.getBoundingClientRect().top
            sItems.push({
                next() {
                    span.classList.add('current')
                    content.scrollTop = top - posTop
                }, removeHighlight() {
                    span.classList.remove('current')
                }
            })
        } while ((i = text.indexOf(sText, oldi)) !== -1)

        let end = document.createTextNode(origin.slice(oldi))
        alle.push(end)
        parent.insertBefore(end, e)
        parent.removeChild(e)
        sRemove.push(() => {
            parent.insertBefore(e, end)
            alle.forEach((i) => i.remove())
        })
    }

// Обход элементов
    function recursiveSearch(target) {
        let ch = Array.prototype.slice.call(target.childNodes)
        for (let e of ch) {
            if (e.nodeType === 3) {
                let st = e.data.toLowerCase()
                let i = st.indexOf(sText)
                if (i !== -1) {
                    replace(target, e, st, i)
                }
            } else if (e.nodeType === 1 && !exclude.includes(e)) {
                recursiveSearch(e)
            }
        }
    }

// Поиск
    function searchText() {
        sItems.splice(0)
        while (sRemove.length) {
            sRemove.pop()()
        }
        nextPos = -1
        next.disabled = true
        next.textContent = 'Disabled'

        if (!sText) {
            out.textContent = 'Заполните поле поиска'
            return
        }

        recursiveSearch(content)

        if (!sItems.length) {
            out.textContent = 'Ничего не найдено'
            return
        }

        next.disabled = false
        next.textContent = 'Перейти к 1'
        out.textContent = `${sItems.length}`

        nextItem()
    }
}