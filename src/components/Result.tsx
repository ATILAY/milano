import { type } from 'os';
import React from 'react'
import ReactStars from 'react-stars'
import {default as loading} from '../asset/loading.gif'
import {SubmittedObjectType, SearchSubmitResponseOneDataType, SearchSubmitResponseType} from './types'


type ResultPropsType = {
    currentPosts: SearchSubmitResponseType,
    isLoading: boolean,
}

export default function Result(props: ResultPropsType) {
    const { currentPosts, isLoading } = props;

    return (
        <div className='flex flex-column'>
            <div className='table-wrapper flex justify-center'>
                {
                    isLoading ? 
                    (<div className='width-100per flex align-center justify-center'>
                        <img
                        className="max-height-300 max-width-300" 
                        alt="loading" 
                        src={loading}/>
                    </div>):
                    (<table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Postcode</th>
                            <th>ReviewRating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentPosts.map(
                                singleData => {
                                    return (
                                    <tr className='single-data-table-row' key={singleData.id}>
                                        <td>{singleData.id}</td>
                                        <td>{singleData.name}</td>
                                        <td>{singleData?.main_address?.postcode}</td>
                                        <td>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={singleData?.review_rating}
                                                edit={false}
                                                // half={true}
                                                color2={'#ffd700'} />
                                        </td>
                                    </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                        </table>)                    
                }
            </div>
        </div>
    )
}
//// additional