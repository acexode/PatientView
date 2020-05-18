import React, { useContext,useState,useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  // ({selectedFile, id})
const UploadResult = ({setImages, images}) => {
     
    
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    const [files, setFiles] = useState([]);
    const [myfiles, setmyFiles] = useState([]);
  
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
          console.log(acceptedFiles)
          setImages(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
          console.log(images)
        }
      });
    
    const thumbs = images && files.map(file => (
      <div style={thumb} key={file.name}>          
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ));
    useEffect(() => () => {       
        // images.forEach(file => URL.revokeObjectURL(file.preview));        
        files.forEach(file => URL.revokeObjectURL(file.preview));        
      }, [files,images]);
    
  
    const handleSelectChange =(event) => {
        setImages(event.target.file[0])
        setmyFiles(event.target.files[0])
    }
    const onsubmit= (e) =>{
        e.preventDefault();
        const formData = new FormData();        
        formData.append('file',myfiles)  
     
    // uploadFile(formData)
    axios.post('',formData)
    .then(res =>{
        console.log(res.data)      
        
    }).catch(err =>{
        console.log(err.response)        
    })
      
    }
    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className="file-upload">
                <i className="las la-cloud-upload-alt"></i>
                <p>Drag and drop file <br /> or <br /> Browse file</p>
                </div>
            </div>
            <p className="pt-2 pl-2">Accepted file typed: .pdf jpg png .docx</p>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
    </section>
    )
}

export default UploadResult
