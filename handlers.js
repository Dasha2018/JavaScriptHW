import { sanitizeInput } from './utils.js'
import { updateComments } from './data.js'
import { comments } from './data.js'
import { postComment } from './api.js'

export function setupAddCommentHandler(renderComments) {
    const nameInput = document.getElementById('name')
    const commentInput = document.getElementById('comment-box-text')
    const addCommentButton = document.getElementById('comment-box-button')

    async function postCommentWithRetry(
        comment,
        name,
        retries = 3,
        delayMs = 2000,
    ) {
        try {
            const response = await postComment(comment, name)
            return response // Если запрос успешен, возвращаем результат
        } catch (error) {
            if (
                retries > 0 &&
                error.message === 'Сервер сломался, попробуй позже'
            ) {
                console.warn(
                    `Ошибка сервера. Повторная попытка через ${delayMs} мс... Осталось попыток: ${retries}`,
                )
                await delay(delayMs) // Задержка перед повторной попыткой
                return postCommentWithRetry(comment, name, retries - 1, delayMs)
            }
            throw error // Если исчерпаны попытки или ошибка другая, пробрасываем её дальше
        }
    }

    // Функция задержки
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    addCommentButton.addEventListener('click', async (event) => {
        event.preventDefault()

        const name = sanitizeInput(nameInput.value.trim())
        const comment = sanitizeInput(commentInput.value.trim())

        if (!name || !comment) {
            alert('Пожалуйста, заполните оба поля!')
            return
        }

        document.querySelector('.comment-loading').style.display = 'block'
        document.querySelector('.comment-box-content').style.display = 'none'

        try {
            const data = await postCommentWithRetry(comment, name)
            // Если запрос успешен
            document.querySelector('.comment-loading').style.display = 'none'
            document.querySelector('.comment-box-content').style.display =
                'flex'
            updateComments(data)
            renderComments()
            nameInput.value = ''
            commentInput.value = ''
        } catch (error) {
            document.querySelector('.comment-loading').style.display = 'none'
            document.querySelector('.comment-box-content').style.display =
                'flex'

            // Обработка ошибок
            if (error.message === 'Failed to fetch at postComment') {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            }
            if (error.message === 'Сервер сломался, попробуй позже') {
                alert('Сервер недоступен. Пожалуйста, попробуйте позже.')
            }
            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий должны быть не короче 3 символов')
                nameInput.classList.add('-error')
                commentInput.classList.add('-error')

                setTimeout(() => {
                    nameInput.classList.remove('-error')
                    commentInput.classList.remove('-error')
                }, 2000)
            }
        }
    })
}

export function enableCommentReplyFeature() {
    const commentInput = document.getElementById('comment-box-text')
    const commentElements = document.querySelectorAll('.comments')
    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const { name, comment } = comments[index]
            commentInput.value = `@${name} ${comment}>` // Подставляем текст комментария с упоминанием автора
            commentInput.focus() // Фокусируемся на поле ввода
        })
    })
}