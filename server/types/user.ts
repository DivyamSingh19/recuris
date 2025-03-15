export type User={
    name: string,
    email:string,
    password: string
}

export type Doctor={ 
    h_id :string
    hospital : string,
    specialization :string
}
export type Admin={
    hospital : string,
    h_id :string
}