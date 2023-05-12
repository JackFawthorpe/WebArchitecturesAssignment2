const FilmCard = (film: Film) => {

    return (
        <>
            <div className={'col'}>
                <div className={'card'}>
                    <div>{film.title}</div>
                </div>
            </div>
        </>
    )
}

export default FilmCard;