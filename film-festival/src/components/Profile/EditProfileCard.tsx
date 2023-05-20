const EditProfileCard = (props: { setInEditMode: any }) => {
    return (
        <>
            <button className='btn btn-primary' onClick={() => {
                props.setInEditMode(false)
            }}>View
            </button>
        </>
    )
}

export default EditProfileCard;