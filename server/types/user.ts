export type Patient={
    name: string,
    email:string,
    password: string,
    walletAddress :string
}

export type Doctor={ 
    name : string,
    email :string,
    password:string
    h_id :string ,
    hospital : string,
    specialization :string
    walletAddress :string
}
export type Admin={
    name : string,
    email :string,
    password:string,
    hospital : string,
    h_id :string
}
export type DiagnosticCenter = {
    name : string,
    email : string,
    password : string,
    specialization : string,
    phoneNumber : string,
    location :string,
    walletAddress :string

}