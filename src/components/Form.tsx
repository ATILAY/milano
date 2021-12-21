import React, { useState, useEffect, useRef, HtmlHTMLAttributes } from 'react'
import {default as categories} from '../json/categories.json'
import {SubmittedObjectType, SearchSubmitResponseOneDataType, SearchSubmitResponseType} from './types'
import {postData} from "../utils/requestMethods"
import { type } from 'os';
import {useWindowSize} from '../hooks/useWindowSize'

type formPropsType = {
    setResponseData:React.Dispatch<React.SetStateAction<SearchSubmitResponseType>>,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
    responseData: SearchSubmitResponseType,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({setResponseData, responseData, setIsLoading, setCurrentPage}: formPropsType) {
    const CHOOSE_A_CATEGORY = "Choose a category";
    const MAX_ADVICE_COUNT = 10000;
    const MIN_ADVICE_COUNT = 1;
    const ADVICE_COUNT_TITLE_TEXT = "Advice Count"

    const [text, setText] = useState("")
    const [selection, setSelection] = useState(CHOOSE_A_CATEGORY)
    const [submittedObject, setSubmittedObject] = useState({} as SubmittedObjectType)
    const [offerNumber, setOfferNumber] = useState(20)

    const isSubmitDisabled = (selection.includes(CHOOSE_A_CATEGORY) || text.length < 1) ? true : false;

    const adviceCountTitleRef = React.useRef() as React.MutableRefObject<HTMLLabelElement>

    const {width} = useWindowSize();

    useEffect(() => {
        if (!isSubmitDisabled) {
            setIsLoading(true)
            const SEARCH_URL = "https://plentific-fe-challenge.herokuapp.com/search"

            postData(SEARCH_URL, submittedObject, offerNumber)
            .then(data => {
                setCurrentPage(1)
                setResponseData(data)
                setIsLoading(false)
            }).catch(err => console.log('err'));
        }
    }, [submittedObject])

    // useEffect(() => {
    //     console.log('responseData',responseData)
    // }, [responseData])

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const tempText = text.replaceAll(/[^A-Za-z0-9]/gi, "").replaceAll(' ', '').toLowerCase();
        const tempSelection = Number(selection)

        setSubmittedObject({
            category_id: tempSelection,
            location: tempText
        })
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value)
    }
    
    const handleOfferNumberChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        const temp = (e.target.value).replaceAll(/[a-zA-Z]/g, "")
        const adviceCount = parseInt(temp || '1');

        if (adviceCount <= MAX_ADVICE_COUNT && adviceCount >= MIN_ADVICE_COUNT) {
            handleAdviceWarning(ADVICE_COUNT_TITLE_TEXT)

            setOfferNumber(adviceCount)
        } else if (adviceCount < MIN_ADVICE_COUNT) {
            handleAdviceWarning("Minimum 1 advice")

            setOfferNumber(MIN_ADVICE_COUNT)
        } else if (adviceCount > MAX_ADVICE_COUNT) {
            handleAdviceWarning("Maximum 10000 advices")

            setOfferNumber(MAX_ADVICE_COUNT)
        }
    }

    const handleAdviceWarning =  (adviceTitle: string) => {
        if (adviceTitle === ADVICE_COUNT_TITLE_TEXT) {
            adviceCountTitleRef.current.style.color = "#5f75a2"
        } else {
            adviceCountTitleRef.current.style.color = "red"
        }

        adviceCountTitleRef.current.innerText= adviceTitle
    }
    
    return (
        <div className='big-comp-margin-x'>
            <form 
            onSubmit={handleSubmit}
            className={`flex-row align-center justify-around form-wrapper flex-wrap ${width && width < 500 ? 'form-margin-x': ''}`}
            >
                <div className='flex-column wrapper-margin-x'>
                    <label htmlFor="category">Category</label>
                    <select 
                    name="category" 
                    id="category" 
                    className="max-width-300 height-general border form-element-margin"
                    onChange={handleSelect}>
                        <option value={selection} defaultValue={selection}>{selection}</option>
                    {categories.map(
                        category => {
                            if (category.hidden === false) {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            }
                        }
                    )}
                    </select>
                </div>

                <div className='flex-column wrapper-margin-x'>
                    <label htmlFor='text-input'>Postcode</label>
                    <input 
                    id='text-input'
                    placeholder='Type a postcode or a location here..'
                    className="max-width-300 height-general border form-element-margin"
                    type="text" 
                    value={text} 
                    onChange={handleTextChange}/>
                </div>

                <div className='flex-column wrapper-margin-x'>
                    <label ref={adviceCountTitleRef} htmlFor='offer-number'>Advice Count</label>
                    <input 
                    id='offer-number'
                    placeholder='Advice Count'
                    className="max-width-300 height-general border form-element-margin"
                    type="number"
                    min={MIN_ADVICE_COUNT}
                    max={MAX_ADVICE_COUNT}
                    step="1"
                    value={offerNumber} 
                    onChange={handleOfferNumberChange}/>
                </div>

                <div  className='flex-column wrapper-margin-x'>
                    <div className='transparant-color'>asd</div>
                    <button type='submit' 
                    disabled={isSubmitDisabled}
                    className='height-general border form-element-margin btn-submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
            {
                    isSubmitDisabled ? (
                    <h3 className='instructions flex justify-center max-width-600'>
                        Please choose a category, type a postcode or location and how many advice you prefer to see. You can see 20 advice per page. You can choose to see advice between 10000 and 1. 
                    </h3>
                    ):<div/>
            }
        </div>
    )
}
