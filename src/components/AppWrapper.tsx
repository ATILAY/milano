import React, { useState, useEffect } from 'react'
import Form from './Form';
import Header from './Header';
import Result from './Result';
import Pagination from "./Pagination"

import {SubmittedObjectType, SearchSubmitResponseOneDataType, SearchSubmitResponseType} from './types'
import { totalmem } from 'os';


export default function AppWrapper() {
    const [responseData, setResponseData] = useState([] as SearchSubmitResponseType)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postsPerPage, setPostsPerPage] = useState<number>(20)

    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = responseData.slice(indexOfFirstPost, indexOfLastPost);
    
    const shouldTableBeVisible = currentPosts && responseData.length > 0;

    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

    return (
        <div className="max-width-1200 flex-column app-wrapper">
            <Header/>
            <hr/>
            <Form setResponseData={setResponseData} 
            responseData={responseData} 
            setCurrentPage={setCurrentPage}
            setIsLoading={setIsLoading}/>
            { shouldTableBeVisible ? (
            <div>
                <hr/>
                <Result currentPosts={currentPosts} isLoading={isLoading} />
                <Pagination 
                    postsPerPage={postsPerPage} 
                    totalPosts={responseData.length} 
                    currentPage={currentPage}
                    paginate={paginate}/>
            </div>
            ) : <div/>}
        </div>
    )
}
