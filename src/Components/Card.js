import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQty] =   useState(1)
  const [size,setSize] = useState("")                //Default Values
  
  let foodItems = props.foodItems
  const handleAddToCart =async()=>{
    let food=[]
    for(const item of data){
      if(item.id === props.foodItems._id){
        food=item;

        break;
      }
    }
    //Update Fuctionality if as Full and Half plates are different order
    if(food != []){
      if(food.size === size){
        await dispatch({type:"UPDATE",id:props.foodItems._id,price:finalPrice,qty:qty})
        return
      }
      else if (food.size !== size){
        
        await dispatch({
          type:"ADD",id:props.foodItems._id,name:props.foodItems.name,price:finalPrice,qty:qty , size:size
        })
        return
      }
      return
    }
    console.log(data)
    await dispatch({
      type:"ADD",id:props.foodItems._id,name:props.foodItems.name,price:finalPrice,qty:qty , size:size
    })

  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItems.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            
            <div className="container w-100" onChange={(e)=>setQty(e.target.value)}>
              <select className="m-2 h-100 bg-success">
                {" "}
                //Dropdown for card
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100  bg-success rounded" id=""  ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                  {priceOptions.map((data)=>{
                    return <option key={data} value ={data}>{data}</option>
                  })}
              </select>

              <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
              <hr></hr>
              <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
