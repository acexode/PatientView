import React,{useState, useContext, useEffect} from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'
import { useHistory } from 'react-router-dom'

const Encounter = () => {
    let history = useHistory()
    const {hospitals, verifyPatient} = useContext(AppContext)
    console.log(hospitals)
    const [selectedhospital, setselectedhospitals] = useState()
    const [hospitalNumber, sethospitalNumber] = useState()
    const [errMsg, seterrMsg] = useState()
    const [showError, setshowError] = useState(false)

    useEffect(() => {
       console.log(showError)
    }, [showError])
    const handleSubmit = () => {
        let data = {
            "hospitalId": selectedhospital.id,
            "hospitalNumber": hospitalNumber
          }
          localStorage.setItem('hData', JSON.stringify(data))
          verifyPatient(data).then(res =>{
              console.log(res)
              history.push('/verify-code')
          }).catch(err =>{
              console.log(err.response)
              seterrMsg(err.response.data)
              setshowError(true)
          })
    }
    return (
        <div id="content">
        <TopNav />
       
        <div class="container">
          
           <div class="row justify-content-center">
            <div class="card ">
                <h3 class="text-center">Hospital ID</h3>
                <small class="text-dark">Please enter your details to retrieve your encounter</small>
    {showError && <span className="text-danger text-center">{errMsg}</span> }
                    <form onSubmit={handleSubmit}>
                        <div class="form-row">
                            <div class="col-md-12">
                                <div class="dropdown show mt-4">
                                    <a class="btn border dropdown-toggle text-left" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      {selectedhospital ? <span style={{marginRight: "15px"}}>{selectedhospital.hospitalName}</span>: <> Select Hospital</>}
                                    </a>
                                  
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        {hospitals && hospitals.map(hospital => (
                                            <a onClick={()=> setselectedhospitals(hospital)} class="dropdown-item" href="#">{hospital.hospitalName}</a>

                                        ))}
                                                                         
                                    </div>
                                  </div>

                            </div>

                        </div>
                          <div class="form-row mt-3">
                              <div class="col-md-12">
                                  <input type="text" name="hospitalNumber" onChange={(e)=> sethospitalNumber(e.target.value)}  class="form-control" placeholder="og00934" />
                              </div>
                          </div>
                          <button type="submit" class="mt-3 btn btn-block  text-light verify retrieve">Retrieve </button>


                    </form>
                </div>
            </div>
           </div>
            
        </div>
    )
}

export default Encounter
