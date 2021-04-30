import {useState} from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const onFileSelection = (event) => {
    const newFile = event.target.files[0];
    console.log(`File selected: '${newFile.name}'`);
    setFile(newFile);
  }

  const onFileUpload = () => {
    console.log(`TODO: process this file: ${file.name}`);
  }

  return (
    <section className={'file-upload'}>
      <input type={'file'} onChange={onFileSelection} />
      <button onClick={onFileUpload}>
        Upload file
      </button>
    </section>
  );
}

export default FileUpload;