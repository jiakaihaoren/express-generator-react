export interface LoginReqEntity{
    us:String,
    ps:String
}

export interface UsersResEntity{
    err:number,
    msg:String | DaysResEntity[]
}

export interface DaysResEntity{
    err:number,
    msg:DaysEntity[]
}

export interface DaysEntity{
    keywords: String[],
    images: String[],
    videos: String[],
    _id: any,
    name: String,
    date: number,
    details: String
}
