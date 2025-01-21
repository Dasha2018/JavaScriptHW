import { formatDate } from './utils.js'

export const comments = []
export const updateComments = (newComments) => {
    comments.length = 0 // Очищаем массив
    comments.push(...newComments) // Добавляем новые элементы в массив
}

export function addComment(name, commentText) {
    comments.push({
        name,
        comment: commentText,
        liked: { state: false, counter: 0 },
        date: formatDate(new Date()),
    })
}

export function toggleLike(index) {
    const comment = comments[index]
    comment.liked.state = !comment.liked.state
    comment.liked.counter += comment.liked.state ? 1 : -1
}
