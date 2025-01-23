const host = 'https://wedev-api.sky.pro/api/v1/Dasha2018'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка сервера! Status: ${response.status}`)
            }
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((coment) => {
                const date = new Date(coment.date) // Преобразуем строку в объект Date
                const formattedDate = `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString(
                    'ru-RU',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                    },
                )}`
                return {
                    name: coment.author.name,
                    comment: coment.text,
                    liked: { state: false, counter: 0 },
                    isliked: false,
                    date: formattedDate,
                }
            })
            return appComments
        })
        .catch((error) => {
            console.error('Error fetching comments:', error)
            return []
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            }
            if (response.status === 400) {
                throw new Error('Неверный запрос')
            }
            if (response.status === 201) {
                return response.json()
            }
        })
        .then(() => {
            return fetchComments()
        })
}
