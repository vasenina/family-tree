export default function MemberPic({ first, last, imageUrl, action, css }) {
    const picUrl = imageUrl || "/default-member.png";

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
