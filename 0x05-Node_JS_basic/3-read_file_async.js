const fs = require('fs').promises;

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {String} filePath The path to the CSV data file.
 * @returns {Promise<void>} A promise that resolves when the counting is done.
 */
const countStudents = (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) {
        throw new Error('Cannot load the database');
      }

      const fileContent = await fs.readFile(filePath, 'utf-8');
      const fileLines = fileContent.trim().split('\n').filter(line => line.trim()!== '');

      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      for (let i = 1; i < fileLines.length; i++) {
        const studentRecord = fileLines[i].split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }

        const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object.values(studentGroups).reduce((acc, cur) => acc + cur.length, 0);
      console.log(`Number of students: ${totalStudents}`);

      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = countStudents;

