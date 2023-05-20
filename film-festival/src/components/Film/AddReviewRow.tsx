import {useEffect, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import {authStore} from "../../store";

const AddReviewRow = (props: { filmId: number, setReviews: any, updateFilm: (isSubscribed: boolean) => {} }) => {

    const [rating, setRating] = useState<number>(10);
    const [reviewText, setReviewText] = useState<string>("");
    const [sentReview, setSentReview] = useState<boolean>(false);

    const currentUser = authStore(state => state.currentUser);

    const handleRatingInput = (e: any) => {
        setRating(parseInt(e.target.value))
    }

    const handleReviewInput = (e: any) => {
        setReviewText(e.target.value);
    }

    const handleSubmit = () => {
        const postReview = async () => {
            let response;
            if (reviewText !== "") {
                response = await axios.post(getBaseUrl() + `/films/${props.filmId}/reviews`, {
                    rating: rating,
                    review: reviewText
                });
            } else {
                response = await axios.post(getBaseUrl() + `/films/${props.filmId}/reviews`, {
                    rating: rating
                });
            }

            if (response.status === 201) {
                setSentReview(true);
            } else {
                console.log("Bad review")
            }
        }
        postReview();
    }

    useEffect(() => {
        let isSubscribed = true;
        if (sentReview) {
            props.updateFilm(isSubscribed);
        }
        return () => {
            isSubscribed = false
        }
    }, [sentReview])

    return (
        <div className='card mt-3 p-2'>
            <h3>Write a review:</h3>
            <div className="form-group pb-1">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input type="range" className="form-range" min={1} max={10} step={1} id="rating"
                       onInput={handleRatingInput}/>
                <h3 className='text-center'>{rating}/10 ⭐</h3>
                <label htmlFor="reviewTextArea">Review (Optional)</label>
                <textarea className="form-control" id="reviewTextArea" onInput={handleReviewInput}></textarea>
                <button className='btn btn-primary mt-3 float-end' onClick={handleSubmit}>Submit Review</button>
            </div>
        </div>
    )
}

export default AddReviewRow