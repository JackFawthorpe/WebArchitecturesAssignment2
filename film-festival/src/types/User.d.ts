type User = {
    id: number
    email: string
    firstName: string
    lastname: string
}

type LoggedInUser = {
    token: string
} & User