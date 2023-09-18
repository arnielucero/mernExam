import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap"
import { useCreateScheduleMutation, useUpdateScheduleMutation } from '../services/scheduleServices';
import moment from 'moment';
import Loader from './Loader';

const ScheduleForm = ({ scheduleInfo, handleClose, refetch }) => {
 
  const formattedDate = moment(scheduleInfo?.selectedDate).format('YYYY-MM-DD'); 
  const buttonTitle = scheduleInfo?.title ? "Update" : "Create";
  const [newSchedule, setNewSchedule] = useState({
    id:  scheduleInfo?._id ? scheduleInfo._id : "", 
    title: scheduleInfo?.title ? scheduleInfo.title : "", 
    description: scheduleInfo?.description ? scheduleInfo.description : "", 
    selectedDate: scheduleInfo?.selectedDate ? formattedDate : "", 
  });

  const [createSchedule, { isLoading }] = useCreateScheduleMutation();
  const [updateSchedule, { isSaving }] = useUpdateScheduleMutation();
  const [error, setError] = useState("")
  const onInputChange = (e) => {
    setNewSchedule({...newSchedule,[e.target.name]: e.target.value})
  }

  const {title, description, selectedDate} = newSchedule;
  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (scheduleInfo?.title) {
      await updateSchedule(newSchedule).unwrap();
      handleClose();
      refetch();
    } else {
      try {
        await createSchedule(newSchedule).unwrap();
        handleClose();
        refetch();
      } catch (err) {
        setError(err?.data?.message);
      }
    } 
  };

  return (
    <>
    { error ? <h5>{error} try new one!!!</h5> : '' }
    <Form onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Control
              type="text"
              placeholder="Title *"
              name="title"
              value={title}
              onChange = { (e) => onInputChange(e)}
              required
          />
      </Form.Group>
      <Form.Group>
          <Form.Control
                as="textarea"
              placeholder="Description *"
              rows={3}
              name="description"
              value={description}
              onChange = { (e) => onInputChange(e)}
              required
          />
      </Form.Group>
      <Form.Group>
          <Form.Control
              type="date"
              name="selectedDate"
              value={selectedDate}
              onChange = { (e) => onInputChange(e)}
              
          />
      </Form.Group>
      <br />
       <Button variant="success" type="submit" block>{buttonTitle}</Button>
       {(isLoading || isSaving) && <Loader />}
    </Form>
 
    </>
  );
}

export default ScheduleForm;
