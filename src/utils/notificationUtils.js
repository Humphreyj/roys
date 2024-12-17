import { notify } from 'notiwind'

export const useNotify = (group, title, text, delay) => {
    return notify(
        {
            group: group,
            title: title,
            text: text,
        },
        delay
    )
}
