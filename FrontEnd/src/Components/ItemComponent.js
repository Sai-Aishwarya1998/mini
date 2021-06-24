
import React , {useState} from 'react';

import Axios from 'axios';
import { mySqlServer } from './Constants';
import { useParams } from 'react-router-dom';

function ItemComponent() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Coffee Sachets",
            available: 15,
            extra: 0
        },
        {
            id: 2,
            name: "Milk Packets",
            available: 2,
            extra: 0
        },
        {
            id: 3,
            name: "Candy",
            available : 15,
            extra: 0
        },
        {
            id: 4,
            name: "Coffee Machine",
            available: 1,
            extra: 0
        },
        {
            id: 5,
            name: "Cookie packets",
            available : 15,
            extra: 0
        },
    ]);
    
    const toggleDone = (e, uitem) => {
        var val = prompt("Enter number");
        const indexToUpdate = items.findIndex((todo) => todo.id === uitem.id);
        const updatedTodos = [...items]; // creates a copy of the array
        updatedTodos[indexToUpdate].available += parseInt(val);
        updatedTodos[indexToUpdate].extra = parseInt(val);
        setItems(updatedTodos);
        
      };
      let {id}=useParams();
      const seeExtra = ()=>{
        var message = "These items need to be added in pantry "+ id+"\n";
        items.forEach(item => {
            if(item.extra !== 0){
           message += item.name+":"+item.extra+" "
            }
          });
        console.log(message)
        Axios.post(mySqlServer+'/api/pantrymail',{message: message}).then((res)=>{
            console.log("success")
        }).catch((err)=>{
            console.log(err)
        })
        window.location.replace("/#test")
      }
    return (
        <div>
            <br/>
            <div class="container card-columns text-center">
                {
                    items.map((item, index) => 
                        <div class="card">
                            <div class="card-header">{items[index].name}</div>
                                <div class="card-body">
                                    Available : {items[index].available}
                                </div> 
                            <div class="card-footer">
                                <button  class="btn btn-outline-primary" onClick={(e) => toggleDone(e, item)}>Add Items</button>
                            </div>   
                        </div>
                        
                    )
                } 
            </div>
            {/* <div className="text-center" >
            <div className="tm-color-white tm-btn-white-bordered" style={{background:'blue'}} onClick={seeExtra} ><span>Submit1</span></div>
            </div> */}
            <div className="text-center" >
            <div className="btn btn-outline-primary" style={{marginTop:'10px',width:'200px'}} onClick={seeExtra }><span>Submit</span></div>
            </div>
        </div>
    )
}

export default ItemComponent