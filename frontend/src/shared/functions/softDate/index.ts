const softDate = (dateString: string) => {
    if(typeof dateString !== 'string') {
        throw new Error(`Expected type is string, but get: ${typeof dateString}`)
    }

    return new Date(dateString).toLocaleDateString('ru-RU');
}

export {softDate}