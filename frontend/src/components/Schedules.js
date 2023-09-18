import {useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ScheduleForm from './ScheduleForm';
import moment from 'moment';
import { useDeleteScheduleMutation } from '../services/scheduleServices';


const Schedules = ({schedule, refetch}) => {

    const { title , description, selectedDate } = schedule
    const formattedDate = moment(selectedDate).format('MMM DD, YYYY'); 
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
 
    const [deleteSchedule, { isLoading }] = useDeleteScheduleMutation();

    useEffect(() => {
        handleClose()
    }, [schedule])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
        try {
          await deleteSchedule(id).unwrap();
          refetch(); 
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }
    }
    };
    
    return (
        <>
            <td>{title}</td>
            <td>{description}</td>
            <td>{formattedDate}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal">Edit</button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button  onClick={() => handleDelete(schedule._id)} className="btn text-danger btn-act" data-toggle="modal">
                        Remove
                    </button>
                </OverlayTrigger>
            </td>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ScheduleForm scheduleInfo={schedule} handleClose={handleClose} refetch={refetch}/>
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

export default Schedules;