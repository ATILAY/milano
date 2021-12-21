import React from 'react'

type PaginationProps = {
    postsPerPage: number,
    totalPosts: number,
    paginate: (page: number) => void,
    currentPage: number
}

export default function Pagination({postsPerPage, totalPosts, paginate, currentPage}:PaginationProps) {
    const visitedPageItemStyle = {
        backgroundColor:'#5f75a2',
        color: 'white'
    }

    const pageNumbers = []

    for (let i = 1; i <=  Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i) 
    }

    const handlePrev = () => { 
        if (currentPage !== 1){
            paginate(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pageNumbers.length){
            paginate(currentPage + 1)
        }
    }

    return (
        <nav className='big-comp-margin-x pagination flex justify-center max-width-900'>
            <ul className='flex flex-row flex-wrap'>
                <li className='prev-btn' onClick={handlePrev}>prev</li>
                {pageNumbers.map( page => (
                    <li key={page} 
                    className='page-item '
                    style={currentPage === page ? visitedPageItemStyle :{}}
                    onClick={() => paginate(page)}>
                        <a href="!#" className='page-link'>
                            {page}
                        </a>
                    </li>
                ))}
                <li className='next-btn' onClick={handleNext}>next</li>
            </ul>
        </nav>
    )
}
