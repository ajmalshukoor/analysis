import React from  "react";

export default function Fieldset(props){
    
    //Just a big form
    return(
        <fieldset>
        <legend>Notes</legend>
        <div>
        <div className="question">
        <label htmlFor="sectorvalue">{props.formData.sector}</label>
        <textarea id="sectorComments" name="sectorComments"  onChange={props.handleChange} value={props.formData.sectorComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="companyvalue">{props.formData.company}</label>
        <textarea id="companyComments" name="companyComments"  onChange={props.handleChange} value={props.formData.companyComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.model}</label>
        <textarea id="modelComments" name="modelComments"  onChange={props.handleChange} value={props.formData.modelComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="popularityvalue">{props.formData.popularity}</label>
        <textarea id="popularityComments" name="popularityComments"  onChange={props.handleChange} value={props.formData.popularityComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.competitors}</label>
        <textarea id="competitorsComments" name="competitorsComments"  onChange={props.handleChange} value={props.formData.competitorsComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.review}</label>
        <textarea id="reviewComments" name="reviewComments"  onChange={props.handleChange} value={props.formData.reviewComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.how}</label>
        <textarea id="howComments" name="howComments"  onChange={props.handleChange} value={props.formData.howComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.location}</label>
        <textarea id="locationsComments" name="locationsComments"  onChange={props.handleChange} value={props.formData.locationsComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.shareholders}</label>
        <textarea id="shareholdersComments" name="shareholdersComments"  onChange={props.handleChange} value={props.formData.shareholdersComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.subsidiaries}</label>
        <textarea id="subsidiariesComments" name="subsidiariesComments"  onChange={props.handleChange} value={props.formData.subsidiariesComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.risks}</label>
        <textarea id="risksComments" name="risksComments"  onChange={props.handleChange} value={props.formData.risksComments}/>
        <br/>
        </div>
    </div>
    <button className="clear" onClick={props.handleClick}>Clear Sheet</button>
    </fieldset>
    )
}