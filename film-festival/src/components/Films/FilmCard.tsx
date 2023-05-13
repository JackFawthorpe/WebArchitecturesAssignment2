const FilmCard = (film: Film) => {

    return (
        <>
            <div className={'col-4 py-3'}>
                <div className={'card'}>
                    <div>{film.title}</div>
                </div>
            </div>
        </>
    )
}

export default FilmCard;