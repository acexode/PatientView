import React,{useState, useContext, useEffect} from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'
import { useHistory, Redirect } from 'react-router-dom'
import {getOTPState} from '../helpers/helpers'
const Encounter = ({location}) => {
    let history = useHistory()
    console.log(location)
    const {hospitals, verifyPatient} = useContext(AppContext)
    console.log(hospitals)
    const [selectedhospital, setselectedhospitals] = useState()
    const [hospitalNumber, sethospitalNumber] = useState()
    const [errMsg, seterrMsg] = useState()
    const [showError, setshowError] = useState(false)
    const [info, setinfo] = useState('')
    const [loading,setLoading] = useState(false)
    let otpState = getOTPState() 
    console.log(typeof otpState)
    
    if(otpState){      
        history.push("/history")
    }
    useEffect(() => {
      
       if(location.state != undefined){
           setinfo(location.state.info)
           setTimeout(() =>{
            setinfo(null)
           },3000)

       }
    }, [showError, hospitals])
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setLoading(true)
        if(selectedhospital){
            let data = {
                "hospitalId": selectedhospital.id,
                "hospitalNumber": hospitalNumber
              } 
              localStorage.setItem("hData", JSON.stringify(data))        
              verifyPatient(data).then(res =>{
                  console.log(res)
                  setLoading(false)
                  history.push('/verify-code')
              }).catch(err =>{
                  console.log(err.response)
                  setLoading(false)
                  seterrMsg(err.response.data)
                  setshowError(true)
              })
        }else{
            seterrMsg('please select your hospital and fill in your hospital Number')
            setshowError(true)
            setTimeout(() =>{
                seterrMsg('')
                setshowError(false)
                
            },5000)
        }
    }
    return (
        
        <div id="content">
        <TopNav />
       
        <div className="container">
          
           <div className="row justify-content-center">
            <div className="card ">
            {info && <span className="text-danger text-center">{info}</span> }
                <h3 className="text-center">Hospital ID</h3>
                <small className="text-dark">Please enter your details to retrieve your encounter</small>
    {showError && <span className="text-danger text-center">{errMsg}</span> }
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <div className="dropdown show mt-4" style={{whiteSpace: 'break-spaces'}}>
                                    <a className="btn border dropdown-toggle text-left" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      {selectedhospital ? <span style={{marginRight: "15px"}}>{selectedhospital.hospitalName}</span>: <> Select Hospital</>}
                                    </a>
                                  
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        {hospitals && hospitals.map(hospital => (
                                            <a onClick={()=> setselectedhospitals(hospital)} className="dropdown-item" href="#">{hospital.hospitalName}</a>

                                        ))}
                                                                         
                                    </div>
                                  </div>

                            </div>

                        </div>
                          <div className="form-row mt-3">
                              <div className="col-md-12">
                                  <input type="text" name="hospitalNumber" onChange={(e)=> sethospitalNumber(e.target.value)}  className="form-control" placeholder="og00934" />
                              </div>
                          </div>
                          {loading ? 
                          <div className="spinner-border mt-3 text-success" role="status">
                                <span className="sr-only ">Loading...</span>
                            </div>: 
                            <button type="submit" className="mt-3 btn btn-block  text-light verify retrieve">Retrieve </button>
                                                                
                                                                }


                    </form>
                </div>
            </div>
           </div>
            
        </div>
    )
}

export default Encounter
