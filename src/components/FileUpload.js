import {useState} from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadErr, setUploadErr] = useState(null);
  const [fileData, setFileData] = useState([]);

  const onFileSelection = (event) => {
    const newFile = event.target.files[0];
    console.log(`File selected: '${newFile.name}'`);
    setFile(newFile);
  }

  const onFileUpload = () => {
    setUploadErr(null);
    if (!file) return;
    processCsv(file);

    const fileExtension = getFileExtension(file.name);
    if (fileExtension !== 'csv') {
      setUploadErr('File must be .csv');
    }
  }

  const getFileExtension = (fileName) => {
    const fileParts = fileName.split('.');
    return fileParts[fileParts.length - 1];
  }

  const processCsv = (file) => {
    const reader = new FileReader();
    reader.onload = event => {
      const {result: contents} = event.target;
      const lines = contents?.split('\n') || [];
      const cleanedLines = lines.filter(line => !!line);
      const data = cleanedLines.map(line => line.split(',').map(value => value * 1));
      data.sort((row1, row2) => row1[0] - row2[0]);
      setFileData(data);
    };

    reader.readAsText(file);
  }

  return (
    <section className={'file-upload'}>
      <input type={'file'} onChange={onFileSelection} />
      <button onClick={onFileUpload}>
        Upload file
      </button>
      {uploadErr && <p className={'error-message'}>{uploadErr}</p>}
      <table>
        <thead>
          <th>n</th>
          <th>Time (ms)</th>
        </thead>
        <tbody>
        {
          fileData.map(row => (
            <tr>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </section>
  );
}

export default FileUpload;