type Film = {
    filmId: number,
    title: string,
    genreId: number,
    releaseDate: string,
    directorId: number,
    directorFirstName: string,
    directorLastName: string,
    rating: number,
    ageRating: string
}

type FullFilm = {
    description: string,
    numReviews: number,
    runtime: number
} & film