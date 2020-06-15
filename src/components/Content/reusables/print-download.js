import React from 'react'
import upload from '../../../assets/Icon feather-download.svg'
import drug from '../../../assets/drugs.svg'
import printer from '../../../assets/Icon feather-printer.svg'
import { useLocation, Link } from 'react-router-dom'
const PrintDownload = ({index, path}) => {
    let location = useLocation()
    const print = () => {
        window.print()
    }
    console.log(location)
    return (
        <div className="row">
            <div className="col-md-12">
                <span className="text-center text-success"> EN01</span>
                <button data-toggle="collapse" data-target={`#demo${index}`} className="view ml-3 float-right" style={{background:'#0043B8', color:'#fff', border:'none'}} > Less</button>
                {/* {location.pathname.includes("results") &&  <Link to={`/${path}`}  className="view download float-right" > 
                <i class="las la-cloud-upload-alt text-dark mr-0"></i>
                </Link>} */}
                <button  className="view printer float-right"  onClick={print} > 
                    <img src={printer} />
                </button>
                <Link to="/prescription"  className="view download float-right" > 
                <i className="las la-pills text-dark mr-0"></i>
                </Link>
            
            </div>
     </div>
    )
}

export default PrintDownload
