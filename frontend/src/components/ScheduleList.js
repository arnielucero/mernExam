import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { useGetSchedulesQuery } from '../services/scheduleServices';

import ScheduleForm from './ScheduleForm';
import Loader from './Loader';
import Schedules  from './Schedules';

const ScheduleList = () => {
  const {data: schedules,  isLoading, refetch: getAllSchedule } = useGetSchedulesQuery();
  const [show, setShow] = useState(false);
    console.log(schedules)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
   
    return (
      <>
        <div className="table-title">
            <div className="row">
                <div className="col-sm-6">
                    <h2>Manage <b>Schedule</b></h2>
                </div>
                <div className="col-sm-6">
                    <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New Schedule</span></Button>					
                </div>
            </div>
        </div>
        {isLoading && <Loader />}
        { schedules?.length === 0 ? ( 
        <h1>'Schedule is not available'</h1>
        ) : ( <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { 
                schedules?.map(schedule => (
                    <tr key={schedule.title}>
                    <Schedules schedule={schedule} refetch={getAllSchedule}/>
                </tr>
                ))  
            } 
        </tbody>
    </table> )} 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Schedule
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ScheduleForm handleClose={handleClose} refetch={getAllSchedule}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )        
}

export default ScheduleList;