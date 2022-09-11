interface IUserCreate {
    name: string
    surname: string
    username: string
    password: string
    birthDate: Date
    role: string
    nationality: string
    address: string
    city: string
    level: number
    bloodType: string
    ethnicity: string
    militarySituation: string
    identificationType: string
    identificationNumber: number
}

interface IUserLogin {
    username: string
    password: string
}

export  { IUserCreate, IUserLogin};
