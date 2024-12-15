import React, { useState } from 'react';

interface Student {
  rollNo: number;
  name: string;
  attendance: boolean;
}

const DailyAttendance = () => {
  const [students, setStudents] = useState<Student[]>([
    { rollNo: 1, name: 'John Doe', attendance: false },
    { rollNo: 2, name: 'Jane Doe', attendance: false },
    { rollNo: 3, name: 'Bob Smith', attendance: false },
    { rollNo: 4, name: 'Alice Johnson', attendance: false },
  ]);

  const [subject, setSubject] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRollNo, setNewStudentRollNo] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAttendanceChange = (rollNo: number) => {
    setStudents(
      students.map((student) =>
        student.rollNo === rollNo ? { ...student, attendance: !student.attendance } : student
      )
    );
  };

  const totalPresent = students.filter((student) => student.attendance).length;
  const totalAbsent = students.length - totalPresent;

  const subjects = [
    'AI',
    'OOPS',
    'DSA',
    'IPS',
    'TC',
    'CRT',
    'AI LAB',
    'DSA LAB',
    'PYTHON LAB',
    'OOPS LAB',
  ];

  const exportToCSV = () => {
    const csvData = [
      ['Attendance for', subject, 'on', date, 'from', startTime, 'to', endTime],
      ['Roll No', 'Name', 'Attendance'],
      ...students.map((student) => [
        student.rollNo,
        student.name,
        student.attendance ? 'Present' : 'Absent',
      ]),
    ];

    const csvContent = csvData
      .map((row) => row.join(','))
      .join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = `Attendance_${subject}_${date}_${startTime}_${endTime}.csv`;
    csvLink.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Daily Subject Attendance</h2>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={exportToCSV}
        >
          Export to CSV
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
          Subject
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
          Start Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startTime"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
          End Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="endTime"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <h2 className="text-lg font-bold mb-4">
        Attendance for {subject} on {date} from {startTime} to {endTime}
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Roll No</th>
            <th className="px-4 py-2">Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.rollNo}</td>
              <td className="px-4 py-2">
                <button
                  className={`${
                    student.attendance
                      ? 'bg-green-500 hover:bg-green-700'
                      : 'bg-red-500 hover:bg-red-700'
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={() => handleAttendanceChange(student.rollNo)}
                >
                  {student.attendance ? 'Present' : 'Absent'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Attendance Summary</h3>
          <p>Total Present: {totalPresent}</p>
          <p>Total Absent: {totalAbsent}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() =>
              setStudents(students.map((student) => ({ ...student, attendance: false })))
            }
          >
            Reset
          </button>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Student Name"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={newStudentRollNo}
            onChange={(e) => setNewStudentRollNo(e.target.value)}
            placeholder="Roll No"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              const newStudent: Student = {
                rollNo: parseInt(newStudentRollNo),
                name: newStudentName,
                attendance: false,
              };
              setStudents([...students, newStudent]);
              setNewStudentName('');
              setNewStudentRollNo('');
            }}
          >
            Add Student
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm text-center mt-4">
        Developed by <a href="https://github.com/UmeshCode1" target="_blank">UmeshCode1</a>
      </p>
    </div>
  );
};

export default DailyAttendance;