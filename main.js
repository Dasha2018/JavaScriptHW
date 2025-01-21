import { fetchComments } from './api.js'
import { updateComments } from './data.js'
import { renderComments } from './render.js'
import { setupAddCommentHandler } from './handlers.js'

document.querySelector('.container').innerHTML =
    'Пожалуйста, подождите - загружаем данные...'

fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})
// Инициализация приложения

setupAddCommentHandler(renderComments)
