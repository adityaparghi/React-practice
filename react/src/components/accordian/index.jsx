//single selection
// multiple selection

import { useState } from "react"
import data from "./data";
import './style.css';

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
    const [multiple, setmultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        //  console.log(getCurrentId)
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }
   

    function handleMultipleSelection(getCurrentId){
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId)

        if(findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
        else cpyMultiple.splice(findIndexOfCurrentId,1)

        setmultiple(cpyMultiple);


      //  console.log(findIndexOfCurrentId)
    }

    console.log(selected,multiple);
    return <div className="wrapper">
        <button onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>Enable multiple</button>
        <div className="accordian" >
            {
                data && data.length > 0 ?
                    data.map(dataItem => <div className="item">
                        <div onClick={enableMultipleSelection ?
                             () => handleMultipleSelection(dataItem.id) :
                             () => handleSingleSelection(dataItem.id)} className="title">
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                            {/* {
                                enableMultipleSelection ?
                                multiple.indexOf(dataItem.id) !== -1 && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                                :selected === dataItem.id && (
                                    <div className="content">{dataItem.answer}</div>
                                ) 
                            } */}
                            {
                                selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                                    <div className="content">{dataItem.answer}</div> : null
                            }
                        </div>

                    </div>) : <div>no data found</div>
            }

        </div>
    </div>


}