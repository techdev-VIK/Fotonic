import { useState } from "react";

import axios from "axios";


function App() {

  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");

  const [uploadImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = (e) => {

    setImage(e.target.files[0]);

  }

  const handleUpload = async () => {
    if(!image){
      setMessage("Please select an image!!!");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);


    try {
      const response = await axios.post("http://localhost:4000/upload", formData,{
        headers: {
          'Content-Type' : "multipart/form-data"
        }
      }
    );

    setUploadedImageUrl(response.data.imageUrl);
    setMessage('Image uploaded')
    } catch (error) {
      console.error(error)
      setMessage('Image Upload Failed!!')
    }


  }
  return (
    <div>

      <div>
        <h2>Image Uploader</h2>
        <input type="file"  onChange={handleImageUpload}/>

        <button onClick={handleUpload}>Upload</button>

        <p>{message}</p>
      </div>

      {uploadImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadImageUrl} alt="Uploaded Image" />
        </div>
      )}

    </div>
  )
}

export default App
