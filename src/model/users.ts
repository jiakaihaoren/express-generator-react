export interface LoginReqEntity{
    us:String,
    ps:String
}
// 此处若用联合类型| 使用时需要使用断言，太麻烦了
export interface ResEntity{
    err:number,
    msg:string
}

export interface DaysEntity{
    name: string,
    keywords?: string[],
    images?: string[],
    videos?: string[],
    _id?: any,
    date?: number[],
    details?: string
}

export interface DaysResEntity extends ResEntity{
    data:DaysEntity[]
}

export interface UploadResEntity extends ResEntity{
    data:{
        urls:string[]
    }
}
