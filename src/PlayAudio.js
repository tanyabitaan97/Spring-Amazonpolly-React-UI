import React, { useState } from 'react';
import './PlayAudio.css';

function PlayAudio() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

   const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

    const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://54.183.249.38:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Parse JSON response
const explanation = data.explanation;

console.log("Explanation:", explanation);

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
        //call java backend to convert explanation into audio

      await fetch('http://54.183.249.38:8088/generate/audio', {
      method: 'POST',
      body: JSON.stringify({ "explanation":explanation }),
      headers: { 'Content-Type': 'application/json' }
    });

      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error occurred during upload.');
    }
  };

return (
   <div className="audio-container">
  <h2>🎧 Polly Audio Preview</h2>

  <div className="upload-section">
    <h3>📤 Upload File to Flask</h3>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload</button>
    <p className="status">{uploadStatus}</p>
  </div>

  <audio controls className="audio-player">
    <source src="https://s3-assignment1-intellipaat.s3.amazonaws.com/polly-output-en.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</div>

  );
}

export default PlayAudio;
