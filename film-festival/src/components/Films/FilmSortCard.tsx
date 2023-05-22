import React, {SetStateAction, useEffect, useState} from "react";
import FilmSearchQuery from "../../types/FilmSearch";
import {Dropdown, DropdownButton} from "react-bootstrap";

type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
}
const FilmSortCard = (props: FilmNavProps) => {

    const [sortOptions] = useState<string[]>(["Alphabetical", "Release Date", "Rating"])

    const [sortString, setSortString] = useState<string>("RELEASED_ASC");
    const [currentDropTitle, setCurrentDropTitle] = useState<string>("Release Date");
    const [isAsc, setIsAsc] = useState<boolean>(true);


    useEffect(() => {
        props.changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            sortBy: sortString
        }))
    }, [sortString])


    const setSortType = (type: string) => {
        switch (type) {
            case "Alphabetical":
                setSortString(prev => "ALPHABETICAL_" + prev.substring(prev.indexOf('_') + 1));
                setCurrentDropTitle("Alphabetical")
                break;
            case "Release Date":
                setSortString(prev => "RELEASED_" + prev.substring(prev.indexOf('_') + 1));
                setCurrentDropTitle("Release Date")
                break;
            case "Rating":
                setSortString(prev => "RATING_" + prev.substring(prev.indexOf('_') + 1));
                setCurrentDropTitle("Rating")
                break;
        }
    }

    useEffect(() => {
        let newSort = sortString.substring(0, sortString.indexOf('_') + 1);
        newSort += isAsc ? "ASC" : "DESC"
        setSortString(newSort);
    }, [isAsc])

    return (
        <div className='card h-100'>
            <div className='row p-2'>
                <h3>Order By</h3>
            </div>
            <div className='container my-2'>
                <div className='row'>
                    <div className='col'>
                        <Dropdown>
                            <DropdownButton id="DropdownButton" title={currentDropTitle}>
                                {sortOptions.map((sortOptions) => (
                                    <Dropdown.Item key={'sort type ' + sortOptions}
                                                   onClick={() => setSortType(sortOptions)}>{sortOptions}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Dropdown>
                    </div>
                    <div className='col px-0'>
                        <button className="btn btn-primary" onClick={() => {
                            setIsAsc(!isAsc)
                        }}>
                            {isAsc ? '▲' : '▼'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmSortCard