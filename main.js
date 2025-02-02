import { fetchComments } from './api.js'
import { updateComments } from './data.js'
import { renderComments } from './render.js'

/* document.querySelector('.container').innerHTML =
    'Пожалуйста, подождите - загружаем данные...' */

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            'Пожалуйста, подождите - загружаем данные...'
    }
    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments()
        })
        .catch((error) => {
            // Вывод ошибки через alert
            alert(`Ошибка при загрузке комментариев: ${error.message}`)
            document.querySelector('.container').innerHTML =
                'Не удалось загрузить данные. Попробуйте обновить страницу.'
        })
}
fetchAndRenderComments(true)
