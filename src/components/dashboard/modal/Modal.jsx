import React from "react";

export default function Modal(props) {
  return (
    <div className="static"> 
      <div
        className="fixed h-screen w-screen bg-black z-10 top-0 opacity-60">
        </div>
      <div className="grid place-items-center">
        <div className="mx-4 my-4 px-4 py-4 bg-black z-10 rounded-md">
          <form className="new-item-form">
            <div className="form-row">
              <label htmlFor="edited_item">Edit Item</label>
              <div className="py-2">
                <input type="text" id="edited_item" value={props.editedValue} onChange={e => props.setEditedValue(e.target.value)}/>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="btn" onClick={() => props.confirmEdit(props.editedValue)}>Submit</button>
              <button className="btn btn-danger" onClick={() => {props.setEditedValue(""); props.toggle();}}>Cancel</button>
            </div>
          </form>
        </div>  
      </div>
    </div>
  );
}
