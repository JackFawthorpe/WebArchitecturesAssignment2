import {useEffect, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import Review from "./Review";
import {authStore} from "../../store";
import AddReviewCard from "./AddReviewRow";

type ReviewsProps = {
    film: FullFilm,
}

const ReviewsCard = ({film}: ReviewsProps) => {

    const reviewsAvailable = new Date(film.releaseDate) <= new Date();
    const currentUser = authStore(state => state.currentUser);


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
    }, [film]);

    const canReview = () => {
        return currentUser != null
            && film.directorId != currentUser.id
            && !reviews.some(review => review.reviewerId == currentUser.id)
    }


    const getReviewCards = () => {
        return (
            <>
                {canReview() && <AddReviewCard filmId={film.filmId} setReviews={setReviews}/>}
                {currentUser == null &&
                    <div className='card mt-3'>
                        <div className='container-fluid'>
                            <div className='row border-bottom text-center'>
                                <h3 className='p-2'>To place a review, please log in or register</h3>
                            </div>
                        </div>
                    </div>
                }
                {reviews.length !== 0 &&
                    <div className='card mt-3'>
                        <div className='container-fluid'>
                            <div className='row border-bottom'>
                                <h3 className='p-2'>Reviews ({reviews.length} Total)</h3>
                            </div>
                            <div className='row d-flex flex-column'>
                                {reviews.map((review: Review) => <Review
                                    key={"Review " + review.reviewerId} {...review}/>)}
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    const getNonReleasedMessage = () => {
        return (
            <div className='card mt-3'>
                <div className='container-fluid text-center m-4'>
                    <h3>No reviews available as the movie has not been released</h3>
                </div>
            </div>
        )
    }

    return reviewsAvailable ? getReviewCards() : getNonReleasedMessage()
}

export default ReviewsCard;