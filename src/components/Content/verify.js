import React,{useState,useContext,useEffect} from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'
import { useHistory } from 'react-router-dom'
const $ = window.$
const Verify = () => {
    let history = useHistory()  
    const initialState = {
        vcode1: "",
        vcode2: "",
        vcode3: "",
        vcode4: "",
        vcode5: "",
        vcode6: "",
      
      } 
    const {verifyOTP, resendOTP, patientInfo} = useContext(AppContext)
    const [errMsg, seterrMsg] = useState()
    const [showError, setshowError] = useState(false)
    const [showSuccessOTP, setshowSuccessOTP] = useState(false)
    const [state, setState] = useState(initialState)
    const [loading,setLoading] = useState(false)
      // console.log(patientInfo)
      useEffect(() => {
        $('#sidebar, #content').toggleClass('active');
        console.log(showError)
     }, [showError])

    const handleChange = (evt) =>{
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }
    const handleResendOTP = () =>{
      setLoading(true)
        resendOTP().then(res =>{
          console.log(res.data)
            setLoading(false)
            setshowSuccessOTP(true)
            
        }).catch(err => {
            console.log(err.response)
            setLoading(false)
            seterrMsg('Unable to send otp')
               setshowError(true)
               setTimeout(() =>{
                seterrMsg('')
                setState(initialState)
                setshowError(false) 
            },2500)
        })
    }
    const handleSubmit = (evt) =>{
       evt.preventDefault(); 
       setLoading(true)     
       let  otp = Object.values(state).join('')
       let hdata = JSON.parse(localStorage.getItem('hData'))
       
       console.log(hdata)
       if(otp.length == 6){          
           let obj ={
                "code": otp,
                "hospitalId": patientInfo.hospitalId || hdata.hospitalId,
                "hospitalNumber": patientInfo.hospitalNumber || hdata.hospitalNumber
              }    
            console.log(obj)
           verifyOTP(obj).then(data =>{
             console.log(data)
             setLoading(false)
                localStorage.setItem('noOTP', true)
               $('.bd-example-modal-sm').modal('toggle')
                setTimeout(() =>{
                    $('.bd-example-modal-sm').modal('toggle')
                    history.push('/history')
    
                },1500)
            }).catch(err =>{    
              setLoading(false)
                console.log(err.response)                
               seterrMsg(err.response.data)
               setshowError(true)
               setTimeout(() =>{
                seterrMsg('')
                setState(initialState)
                setshowError(false)
    
            },3500)
               
           })       
       }else{
           seterrMsg('Insert all 6 OTP codes')
           setshowError(true)
           setLoading(false)
           setTimeout(() =>{
            seterrMsg('')
            setState(initialState)
            setshowError(false)
            },3500)
       }
    }
    return (
        <div id="content">
        <TopNav />
        <div className="container">
              
              <div className="row justify-content-center">
               <div className="card ">
                   <h3 className="text-center"><i className="las la-mobile-alt phone"></i></h3>
                   <h3 className="text-center">Verification Code</h3>
                   <small className="text-dark pt-2 text-center">The verfication code has been sent <br/> to the patient's phone  number</small>
                   {showError ? <span className="text-danger text-center my-3">{errMsg}</span> : <strong className="text-dark pt-3 text-small text-center">Please enter the code below</strong> }
                   
                       <div className="container">                           
                             <div className="row">
                               <form onSubmit={handleSubmit} className="form-row justify-content-center mr-5 ml-5 mt-3 v-code">                                   
                                        <input name="vcode1" value={state.vcode1}  onChange={handleChange}  maxlength="1" type="text" className={showError && "error"}  placeholder="0" />
                                        <input name="vcode2" value={state.vcode2}  onChange={handleChange} maxlength="1" type="text" className={showError && "error"}  placeholder="0" />
                                        <input name="vcode3" value={state.vcode3}  onChange={handleChange} maxlength="1" type="text" className={showError && "error"}  placeholder="0" />
                                       <input name="vcode4" value={state.vcode4}  onChange={handleChange} maxlength="1" type="text" className={showError && "error"}  placeholder="0" />
                                       <input name="vcode5" value={state.vcode5}  onChange={handleChange} maxlength="1" type="text" className={showError && "error"}  placeholder="0" />
                                       <input name="vcode6" value={state.vcode6}  onChange={handleChange} maxlength="1" type="text" className={showError && "error"}  placeholder="0" />                                    
                                   
                               
                                {loading ? <div className="spinner-border text-success" role="status">
                                                                    <span className="sr-only mt-3">Loading...</span>
                                                                </div>: 
                                                                <button className="mt-3 btn btn-block btn-primary verify">Retrieve </button>
                                                                }
                               </form>
                             </div>
                             <div className="row mt-3 justify-content-end">
                               {showSuccessOTP ? <strong className="mr-5 text-success">OTP resent</strong> : <a onClick={handleResendOTP} className="mr-5 text-info">Resend OTP</a>}      

                             </div>

                       </div>
                   </div>
                   <div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                        
                        <div className="modal-body mb-5">
                           <div className="row justify-content-center align-item-center">
                               <p className="mt-4 "><i className="las la-check-circle big text-center"></i></p>                               
                           </div>
                           <div className="row justify-content-center align-item-center">
                               <h2 className="mt-1 text-center">Success</h2> <br/>                                                   
                           </div>
                           <div className="row justify-content-center align-item-center">

                               <small className="text-dark">Your phone has been verified!</small>                             
                           </div>
                           <div className="row justify-content-center align-item-center mt-5 mb-3">
                               <button type="button" className="btn verify text-center text-light" data-dismiss="modal">Continue</button>
                                               
                           </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
               </div>
              </div>
       
        </div>
    )
}

export default Verify
