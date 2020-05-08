import React from 'react'
import TopNav from '../../Sidebar/TopNav'

const Prescription = () => {
    return (
        <div id="content">
            <TopNav />
            <div class="container">

                <div class="row">
                    <div class="col-md-6">
                        <a class="h-id btn border" href="">
                            <span>Hospital ID</span> <strong>0094567</strong>
                        </a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn text-light float-right verify">Retrieve</button>
                    </div>
                </div>


                <div class="row">
                    <table class="table table-condensed" style={{borderCollapse:'collapse'}}>
                        <thead>
                            <tr>
                                <th scope="col">Encounter ID</th>
                                <th scope="col">Encounter Date</th>
                                <th scope="col">Prescription No</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">EN 001</th>
                                <td>05/06/2020</td>
                                <td>PN001</td>
                                <td>Dr. Okafor</td>
                                <td><a data-toggle="collapse" data-target="#demo1"
                                        class="view accordion-toggle">More</a></td>

                            </tr>
                            <tr>
                                <td colspan="6" class="hiddenRow">
                                    <div class="accordian-body collapse" id="demo1">
                                        <div class="row">
                                            <div class="card row-card">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <span class="text-center text-success"> EN01</span>
                                                        <button data-toggle="collapse" data-target="#demo1"
                                                            class="view float-right"> Less &UpArrow;</button>
                                                    </div>
                                                </div>

                                                <div class="row mt-5">
                                                    <div class="col-md-6">
                                                        <p class="text-dark pt-2"><strong>Drug Description</strong></p>
                                                    </div>
                                                    <div class="col-md-6 align-items-end">
                                                        <a class="border rounded p-2 float-right ml-3" href="">
                                                            <i class="las la-calendar-day"></i> 10:00am
                                                        </a>
                                                        <a class="border rounded p-2 float-right ml-3" href="">
                                                            <i class="lar la-clock"></i> 01/02/2021
                                                        </a>
                                                    </div>

                                                    <div class="row-card ">
                                                        <table class="nested-table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Dosage</th>
                                                                    <th scope="col">Day</th>
                                                                    <th scope="col">Frequency</th>
                                                                    <th scope="col">Aministration Route</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Paracetamol 20mg</td>
                                                                    <td>2</td>
                                                                    <td>5</td>
                                                                    <td>TD</td>
                                                                    <td>Oral</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Lornat DS-250mg</td>
                                                                    <td>1</td>
                                                                    <td>5</td>
                                                                    <td>OD</td>
                                                                    <td>Oral</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                                <div class="row mt-5">
                                                    <div class="col-md-12">
                                                        <p class="text-dark">Did you use the prescription?</p>

                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            
                                                            <label className="pres-label" for="">
                                                                <input type="radio" name="pres-radio"  />Fully
                                                                <span className="checkmark"></span> </label>
                                                        </div>
                                                        <div class="form-group">
                                                               
                                                            <label className="pres-label" for="">
                                                                <input type="radio" name="pres-radio"  />Partially
                                                                <span className="checkmark"></span> </label>
                                                        </div>
                                                        <div class="form-group">
                                                            
                                                            <label className="pres-label" for="">
                                                                <input type="radio" name="pres-radio"  />No
                                                                <span className="checkmark"></span> </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <textarea placeholder="comment"
                                                            class="row-card card bg-gray comment" name=""
                                                            id=""></textarea>
                                                    </div>


                                                </div>
                                                <div class="row mt-5">
                                                    <div class="col-md-12">
                                                        <p class="text-dark">Did you complete the dosage?</p>

                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                        <label className="pres-label" for="">
                                                            <input type="radio" name="radio"  />Yes
                                                            <span className="checkmark"></span> 
                                                        </label>
                                                        </div>
                                                        <div class="form-group">                                                            
                                                        <label className="pres-label" for="">
                                                                <input type="radio" name="radio"  />No
                                                                <span className="checkmark"></span> 
                                                        </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <textarea placeholder="comment"
                                                            class="row-card card bg-gray comment" name=""
                                                            id=""></textarea>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>
                                        </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">EN 002</th>
                                <td>05/06/2020</td>
                                <td>PN001</td>
                                <td>Dr. Okafor</td>
                                <td><a data-toggle="collapse" data-target="#demo2"
                                        class="view accordion-toggle">More</a></td>

                            </tr>
                            <tr>
                                <td colspan="6" class="hiddenRow">
                                    <div id="demo2" class="accordian-body collapse">Demo2</div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">EN 003</th>
                                <td>05/06/2020</td>
                                <td>PN001</td>
                                <td>Dr. Okafor</td>
                                <td><a data-toggle="collapse" data-target="#demo3"
                                        class="view accordion-toggle">More</a></td>

                            </tr>
                            <tr>
                                <td colspan="6" class="hiddenRow">
                                    <div id="demo3" class="accordian-body collapse">Demo3</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        
    )
}

export default Prescription
