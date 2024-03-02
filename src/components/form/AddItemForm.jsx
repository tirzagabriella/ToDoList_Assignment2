import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AddItemForm(props) {
  return (
    <div className="center-container">
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={props.newItem}
            onChange={(e) => props.setNewItem(e.target.value)}
          />
        </div>
        <DateTimePicker
          timezone="Asia/Jakarta"
          onChange={(newValue) => {
            props.setdatetimeState(newValue);
            // console.log(dayjs(newValue).toString());
            // console.log(newValue.format("YYYY-MM-DD HH:mm:ss"));
          }}
          disablePast
        />
        <button
          className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.handleSubmit}
        >
          Add
        </button>
      </form>
    </div>
  );
}
