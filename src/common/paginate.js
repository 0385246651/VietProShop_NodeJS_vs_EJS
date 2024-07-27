

module.exports = (total_pages, page, delta =2)=> {
    const pages = []
    let left = page - delta
    let right = page + delta

    for(let i=1; i <= total_pages; i++){
        if(i === page || 
            i === 1 ||
            i === total_pages || 
           ( i >=  left && i <= right)
        ){
            pages.push(i) 
        }
        else if(i === left - 1 ||i ===  right + 1){
            pages.push('...')
        }
    }

    return pages
}