import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePhotoById } from "../redux/familyTree/slice.js";

export default function PhotoUploader(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    //     this.getPhoto = this.getPhoto.bind(this);
    //     this.uploadPhoto = this.uploadPhoto.bind(this);
    //     this.closeModal = this.closeModal.bind(this);
    // }
    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const [error, setError] = useState();
    const getPhoto = (e) => {
        // console.log("user changed a photo");

        // console.log("fileselecthandler", e.target.files[0]);
        // this.setState({ file: e.target.files[0] }, () => {
        //     console.log("State after file selecting", this.state);
        // });
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
    // const closeModal = (e) => {
    //     if (e.target.classList.contains("overlay")) {
    //         props.close();
    //     }
    // };

    return (
        <>
            <input
                className="input-file"
                type="file"
                accept="image/*"
                onChange={getPhoto}
            />
            <button className="btn" onClick={uploadPhoto}>
                Upload
            </button>
        </>
        // <div className="overlay" onClick={closeModal}>
        //     <div className="modal shadow ">
        //         <div className="modal-header">
        //             <h2>Upload your profile photo</h2>
        //             {/* <div className="close-btn" onClick={this.props.close}>
        //                     X
        //                 </div> */}
        //         </div>
        //         <div className="modal-body">
        //             {this.state.error && (
        //                 <p className="error"> {this.state.error}</p>
        //             )}
        //             <input
        //                 className="input-file"
        //                 type="file"
        //                 accept="image/*"
        //                 onChange={this.getPhoto}
        //             />
        //         </div>
        //         <div className="modal-footer">
        //             <button onClick={this.props.close} className="secondary">
        //                 Cancel
        //             </button>
        //             <button onClick={this.uploadPhoto}>Upload</button>
        //         </div>
        //     </div>
        // </div>
    );
}
