export default function MemberPic({ first, last, imageUrl, action, size }) {
    const picUrl = imageUrl || "/default-member.png";
    const imgClass =
        size == "small"
            ? "img_profile_small cursor"
            : "img_profile_big shadow cursor";
    return (
        <>
            <img
                src={picUrl}
                alt={`${first} ${last}`}
                className={imgClass}
                onClick={action}
            />
        </>
    );
}
