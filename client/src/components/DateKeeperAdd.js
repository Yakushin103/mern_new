import React from "react"
import DatePicker from "react-datepicker"
 
import "react-datepicker/dist/react-datepicker.css"
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
export const DateKeeperAdd = ({startDate, setStartDate}) => {

const handleDate = (date) => {
    setStartDate({
        ...startDate,
        Date: date
    })
}

  return (
    <DatePicker selected={startDate.Date} onChange={date => handleDate(date)} />
  )
}