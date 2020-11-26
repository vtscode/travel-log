import React from 'react';
import { createLogEntry } from "./API";
import { useForm } from "react-hook-form";

const LogEntryForm = ({location,onClose}) => {
  const { register, handleSubmit } = useForm();
  const [submitted,setsubmitted] = React.useState({loading : false, error : '' });

  const InputForm = (props) => {
    switch (props.type) {
      case 'textarea':
        return(<>
          <label htmlFor={props.name}>{props.name}</label>
          <textarea rows={3} name={props.name} ref={register}></textarea>
        </>)
    
      default:
        return(<>
          <label htmlFor={props.name}>{props.name.charAt(0).toUpperCase() + props.name.substring(1,props.name.length)}</label>
          <input type={props.type} name={props.name} required ref={register} />
        </>);
    }
  }

  const onSubmit = async (data) => {
    setsubmitted(prev => ({...prev,loading : true}));
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      // throw TypeError('sample error');
      const created = await createLogEntry(data);
      console.log(created);
      setsubmitted(prev => ({...prev,loading : false}));
      onClose();
    } catch (error) {
      setsubmitted(prev => ({...prev,loading : false, error : error.message}));
    }
  };

  return(
  <form onSubmit={handleSubmit(onSubmit)} className="entry-form" encType="multipart/form-data">
    {submitted.error && <h5 className="error-msg">{submitted.error}</h5>}
    <InputForm name="title" type="text" />
    <InputForm name="comments" type="textarea" />
    <InputForm name="description" type="textarea" />
    <InputForm name="image" type="text" />
    <InputForm name="rating" type="number" />
    <InputForm name="visitDate" type="date" />
    <button disabled={submitted.loading}>{submitted.loading ? 'Loading ...' : 'Create Travel Log Entry'}</button>
  </form>
  )
}

export default LogEntryForm;