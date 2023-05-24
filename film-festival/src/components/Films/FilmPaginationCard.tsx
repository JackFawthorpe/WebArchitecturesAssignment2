import React, {SetStateAction, useEffect, useState} from "react";
import FilmSearchQuery from "../../types/FilmSearch";


type PaginationProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
    filmCount: number
}
const FilmPaginationCard = ({changeFilmQuery, filmCount}: PaginationProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showNext, setShowNext] = useState<boolean>(true);
    const [showPrev, setShowPrev] = useState<boolean>(true);
    const [showLast, setShowLast] = useState<boolean>(true);
    const [showFirst, setShowFirst] = useState<boolean>(true);

    useEffect(() => {

        if (currentIndex > filmCount) {
            setCurrentIndex(0);
            changeFilmQuery((prev: FilmSearchQuery) => ({
                ...prev,
                startIndex: 0
            }))
        }

        setShowNext(currentIndex + 8 < filmCount);
        setShowPrev(currentIndex !== 0);
        setShowLast(currentIndex + 8 < filmCount);
        setShowFirst(currentIndex !== 0);
    }, [currentIndex, filmCount])

    const handleNext = () => {
        changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            startIndex: prev.startIndex + prev.count
        }))
        setCurrentIndex(currentIndex + 8);
    };

    const handlePrev = () => {
        changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            startIndex: prev.startIndex - prev.count
        }))
        setCurrentIndex(currentIndex - 8);
    };

    const handleLast = () => {
        changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            startIndex: filmCount - (filmCount % 8 === 0 ? 8 : filmCount % 8)
        }))
        setCurrentIndex(filmCount - (filmCount % 8 === 0 ? 8 : filmCount % 8));
    }

    const handleFirst = () => {
        changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            startIndex: 0
        }))
        setCurrentIndex(0);
    }

    return (
        <div className='card'>
            <div className='row p-2'>
                <h3>Page</h3>
            </div>
            <div className='container my-2'>
                <div className='row'>
                    <div className='col'>
                        <ul className="pagination">
                            {showFirst &&
                                <li className="page-item"><span className="page-link"
                                                                onClick={handleFirst}>First</span>
                                </li>
                            }
                            {showPrev &&
                                <li className="page-item"><span className="page-link"
                                                                onClick={handlePrev}>{currentIndex / 8}</span>
                                </li>
                            }
                            <li className="page-item"><span
                                className="page-link text-decoration-underline">{currentIndex / 8 + 1}</span>
                            </li>
                            {showNext &&
                                <li className="page-item"><span className="page-link"
                                                                onClick={handleNext}>{currentIndex / 8 + 2}</span>
                                </li>
                            }
                            {showLast &&
                                <li className="page-item"><span className="page-link"
                                                                onClick={handleLast}>Last</span>
                                </li>
                            }
                            {!showLast &&
                                <li className="page-item"><span className="page-link disabled">No more pages</span>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmPaginationCard