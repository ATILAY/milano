export type atilay = {
    asd: string
}


export type SubmittedObjectType = {
    category_id : number,
    location: string
}

export type SearchSubmitResponseOneDataType = {
    id: number,
    is_verified: boolean,
    logo_url: string,
    main_address: {
        address_line_1: string,
        address_line_2: string,
        postcode: string | number,
        town: string
    },
    name: string,
    profile_url: string,
    review_rating: number,
    reviewes_count: number,
    short_description: string,
    slug: string,
    subscription_level: number
}

export type SearchSubmitResponseType = SearchSubmitResponseOneDataType[]