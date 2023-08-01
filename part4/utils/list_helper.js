const dummy = (blogs) => { 
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const reducer = (prevMax, item) => {
        console.log(item)
        return item.likes > prevMax.likes 
            ? item 
            : prevMax
    }

    return blogs.length === 0 
        ? null
        : blogs.reduce(reducer, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}