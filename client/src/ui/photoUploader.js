import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePhotoById } from "../redux/familyTree/slice.js";

export default function PhotoUploader(props) {
    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const [error, setError] = useState();
    const getPhoto = (e) => {
        // console.log("user changed a photo");

        setFile(e.target.files[0]);
    };
    const uploadPhoto = () => {
        console.log("user wants to upload photo");
        if (!file) {
            console.log("no file");
            // this.setState({ error: "No file" });
            return;
        }
        const fd = new FormData();
        fd.append("file", file);
        //fd.append("id", this.props.member);

        fetch("/api/upload-photo/" + props.memberId, {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result: ", result);
                if (result.success === false) {
                    setError("File did not upploaded. Please try again");
                } else {
                    //if success = True
                    console.log("success, file uploaded", result.url);
                    dispatch(
                        changePhotoById({ id: props.memberId, url: result.url })
                    );
                    location.reload();
                    props.close();

                    //dispatch - change url
                    //this.props.changePicUrl(result.url);
                }
            })
            .catch((err) => {
                console.log("error uploading new image: ", err);
                setError("File did not upploaded. Please try again");
            });
    };

    return (
        <div className="photo-uploader">
            <span className="close-btn" onClick={props.close}>
                X
            </span>
            <input
                className="input-file"
                type="file"
                accept="image/*"
                onChange={getPhoto}
            />
            <button className="btn-primary" onClick={uploadPhoto}>
                Upload
            </button>
        </div>
    );
}
