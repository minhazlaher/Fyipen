const formatDate = (date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19)
}

export { formatDate }
