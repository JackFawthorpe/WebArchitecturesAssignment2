import {useEffect, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import Review from "./Review";

type ReviewsProps = {
    film: FullFilm
}

const ReviewsCard = ({film}: ReviewsProps) => {

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {

        let isSubscribed = true;

        const fetchReviews = async () => {
            try {
                const response = await axios.get(getBaseUrl() + `/films/${film.filmId}/reviews`);
                setReviews(response.data);
            } catch (e) {
                console.log("Error retrieving reviews");
            }
        }

        fetchReviews();

        return () => {
            isSubscribed = false;
        }
    }, []);

    return (
        <>
            {reviews.length !== 0 &&
                <div className='card mt-3'>
                    <div className='container-fluid'>
                        <div className='row border-bottom'>
                            <h3 className='p-2'>Reviews ({reviews.length} Total)</h3>
                        </div>
                        <div className='row d-flex flex-column'>
                            {reviews.map((review: Review) => <Review key={"Review " + review.reviewerId} {...review}/>
                            )}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default ReviewsCard;