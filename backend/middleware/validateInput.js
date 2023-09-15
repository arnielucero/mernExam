import  { isValid, parseISO } from 'date-fns';
const validateInput = (req, res, next) => {
  // Define your validation rules here
  const { title, selectedDate } = req.body;

  const parsedDate = parseISO(selectedDate);

  // Check if the parsed date is valid and not equal to an invalid date
  console.log(isValid(parsedDate));
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'input cannot be empty.' });
  }
  if (!isValid(parsedDate)) {
     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format.' });
  }
 //const validDate = new Date(selectedDate);
 // Check if the parsed date is a valid date
 //return !isNaN(validDate) && validDate instanceof Date;
  //const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD

  //if (!selectedDate || !dateRegex.test(selectedDate)) {
  //  return 'Invalid date format. Please use YYYY-MM-DD format.';
 // }

  // You can add more validation rules for other fields as needed

  // If the input is valid, proceed to the next middleware
  next();
}

export default validateInput;