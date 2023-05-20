type User = {
    id: number
    email: string
    firstName: string
    lastName: string
}

type LoggedInUser = {
    token: string
} & User