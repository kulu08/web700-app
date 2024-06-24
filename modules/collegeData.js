const fs = require('fs'); // Import the file system module for reading files
const path = require('path'); // Import the path module for handling file paths

// Define a class to structure the data with students and courses
class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

// Initialize a variable to hold the data collection
let dataCollection = null;

// Function to initialize the data collection by reading JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read the students.json file
    fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, data) => {
      if (err) {
        // If there is an error reading the file, reject the promise
        reject('Unable to read students.json');
        return;
      }
      // Parse the students data
      let students = JSON.parse(data);

      // Read the courses.json file
      fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, data) => {
        if (err) {
          // If there is an error reading the file, reject the promise
          reject('Unable to read courses.json');
          return;
        }
        // Parse the courses data
        let courses = JSON.parse(data);

        // Create a new Data instance with the parsed students and courses
        dataCollection = new Data(students, courses);

        // Resolve the promise indicating successful initialization
        resolve();
      });
    });
  });
}

// Function to get all students
function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      // If data collection is not initialized, reject the promise
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.students.length === 0) {
      // If there are no students, reject the promise
      reject('No results returned');
      return;
    }
    // Resolve the promise with the students data
    resolve(dataCollection.students);
  });
}

// Function to get all TAs (Teaching Assistants)
function getTAs() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      // If data collection is not initialized, reject the promise
      reject('Data collection not initialized');
      return;
    }
    // Filter the students to get only TAs
    let tas = dataCollection.students.filter(student => student.TA);
    if (tas.length === 0) {
      // If there are no TAs, reject the promise
      reject('No results returned');
      return;
    }
    // Resolve the promise with the TAs data
    resolve(tas);
  });
}

// Function to get all courses
function getCourses() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      // If data collection is not initialized, reject the promise
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.courses.length === 0) {
      // If there are no courses, reject the promise
      reject('No results returned');
      return;
    }
    // Resolve the promise with the courses data
    resolve(dataCollection.courses);
  });
}

// Export the functions for use in other modules
module.exports = { initialize, getAllStudents, getTAs, getCourses };

