export default function MemberPic({
    first,
    last,
    imageUrl,
    action,
    size,
    css,
}) {
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
                className={css}
                onClick={action}
            />
        </>
    );
}
