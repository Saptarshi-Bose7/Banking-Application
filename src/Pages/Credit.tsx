import React, { ChangeEvent, useState } from "react";
import payeedata from "../Sender-Names.json";
import { IArticle } from "../Reducers/Reducer";
import { useDispatch } from "react-redux";
import { POST, RECEIVE, SEND } from "../Actions/Actions";
import { CREDIT } from "../Actions/constant";
import { useAccordionButton } from "react-bootstrap";

type Submit = {
 
 
  Name: string;
  CreditOrDebit: string;
};

type Props = {
  children: React.ReactNode;
  eventKey: string;
};


const Credit = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };
  
  const submit =  (name: Submit) => {
    
    try{
      
      dispatch(POST({...name,id:Math.random().toString(),Date:new Date().toISOString(),Amount:amount}))
      alert("Transaction Succesfull")
  }
    catch(error){
      alert("Error")
    }
    
    dispatch(RECEIVE(amount))
    
  };
  return (
    <div className="accordion" id="accordionExample">
      <p>Credit page text</p>
      {payeedata.senders.map((names, indxex) => {
        const id = `collapse${indxex}`;
        return (
          <div className="accordion-item" key={indxex}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + indxex}
                aria-expanded="false"
                aria-controls={"collapse" + indxex}
              >
                {names.Name}
              </button>
            </h2>
            <div
              id={"collapse" + indxex}
              className="accordion-collapse collapse"
              data-bs-parent={"#accordionExample" + indxex}
            >
              <div className="accordion-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const confirm = window.confirm('Are you sure you want to submit?');
                    if (confirm) {
                      submit(names);
                    }
                  }}
                >
                  <input
                    id={`input${indxex}`}
                    className="input"
                    value={amount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Amount Here"
                    data-testid={`amountInput${indxex}`}
                  />
                  
                  <input
                    id={`submit${indxex}`}
                    className="button"
                    type="submit"
                    data-testid={`submit${indxex}`}
                  />
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Credit;
