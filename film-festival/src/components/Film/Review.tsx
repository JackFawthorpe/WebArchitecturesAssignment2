import {getBaseUrl} from "../../config/BaseUrl";

// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";

const Review = (review: Review) => {

    const replaceImage = (error: any) => {
        error.target.src = defaultImage;
    }

    return (
        <>
            <div className='col border-bottom pt-2 container-fluid'>
                <div className='row py-2'>
                    <div className='col-1'>
                        <img src={getBaseUrl() + "/users/" + review.reviewerId + "/image?" + Date.now()}
                             className="rounded float-end img-thumbnail director-image text-center"
                             alt="Director's Picture"
                             onError={replaceImage}/>
                    </div>
                    <div className='col-2 pt-2 border-end'>
                        <h5>{review.reviewerFirstName} {review.reviewerLastName}</h5>
                        <h6>{review.rating}/10 ⭐</h6>
                    </div>
                    <div className='col-8'>{review.review}</div>
                </div>
            </div>
        </>
    )
}

export default Review