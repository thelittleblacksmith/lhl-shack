import React from "react";
import { Field } from "formik";

const Title = () => {
  return (
    <div>
      <h1>Roommate Agreement</h1>
      This Roommate Agreement was originally derived from Tenant Resource Advocacy Centre, also known as TRAC. The intention with this Agreement is to help you and your new roommates establish some ground and expectations when you live together. Even the best of friends can run into challenges and difficulties with living together, and this Agreement is to help you talk out everything beforehand to avoid arguments.
      <div>
      This form should only be signed after each and every party to the Agreement has had time to think and consider to the terms they are agreeing to. That being said, the information contained in this Agreement is for informational purposes only. Shack and TRAC cannot act as your lawyer, and its staff members are not necessarily lawyers. This is not a legally binding Agreement, but it does help to establish conditions and expectations around living with others, and to make your roomie life less stressful.
      </div> 
      Please visit <a href={"http//www.tenants.bc.ca"}>www.tenants.bc.ca</a> to inform yourself about tenants' rights and obligations in Britsh Columbia before discussing and agreeing to terms with any roommates.
    </div>
  )

};

export default Title;