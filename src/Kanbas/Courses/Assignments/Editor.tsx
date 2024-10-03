import React from 'react';


export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-5" style={{ maxWidth: '700px' }}>
      
      {/* Assignment Name */}
      <div className="form-group mb-3">
        <label htmlFor="wd-name" className="font-weight-bold">Assignment Name</label>
        <input id="wd-name" className="form-control" value="A1" />
      </div>
      
      {/* Assignment Description */}
      <div className="form-group mb-3">
        <textarea id="wd-description" className="form-control" rows={6} defaultValue={`The assignment is available online.
Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}></textarea>
      </div>

      {/* Points, Assignment Group, Display Grade as, and Submission Type */}
      <div className="row mb-2">
      <div className="col-md-3 d-flex align-items-center">
      <label htmlFor="wd-points" className="font-weight-bold">Points</label>
        </div>
        <div className="col-md-6">
          <input id="wd-points" className="form-control" type="number" value={100} />
        </div>
      </div> 

      <div className="row mb-2"> 
      <div className="col-md-3 d-flex align-items-center">
      <label htmlFor="wd-assignment-group" className="font-weight-bold">Assignment Group</label>
      </div>   
      <div className="col-md-6">
          <select id="wd-assignment-group" className="form-select">
            <option value="assignments">Assignments</option>
          </select>
        </div>
      </div>

      <div className="row mb-2">
      <div className="col-md-3 d-flex align-items-center">
      <label htmlFor="wd-display-grade-as" className="font-weight-bold">Display Grade as</label>
      </div> 
        <div className="col-md-6">
          <select id="wd-display-grade-as" className="form-select">
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mb-2">
      <div className="col-md-3 d-flex align-items-center">
      <label htmlFor="wd-submission-type" className="font-weight-bold">Submission Type</label>
      </div> 
      <div className="col-md-6 border p-2 ">
          <select id="wd-submission-type" className="form-select">
            <option value="online">Online</option>
          </select>
          <div className="row mb-2">
      <div className="form-group">
        <label className="font-weight-bold">Online Entry Options</label>
        <div className="form-check">
          <input type="checkbox" id="wd-text-entry" className="form-check-input" />
          <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
          <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
          <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
          <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-file-uploads" className="form-check-input" />
          <label htmlFor="wd-file-uploads" className="form-check-label">File Uploads</label>
        </div>
      </div>
      </div>
        </div>
      </div>

      {/* Online Entry Options */}
      {/* <div className="row mb-2 ">
      <div className="form-group">
        <label className="font-weight-bold">Online Entry Options</label>
        <div className="form-check">
          <input type="checkbox" id="wd-text-entry" className="form-check-input" />
          <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
          <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
          <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
          <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
        </div>
        <div className="form-check">
          <input type="checkbox" id="wd-file-uploads" className="form-check-input" />
          <label htmlFor="wd-file-uploads" className="form-check-label">File Uploads</label>
        </div>
      </div>
      </div> */}
      {/* Assign To, Due Date, Available From */}
      <div className="col-md-3 d-flex align-items-center">
      <label htmlFor="wd-submission-type" className="font-weight-bold">Assign</label>
     </div> 
      <div className="container border p-2 w-50">
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assign-to" className="font-weight-bold">Assign To</label>
          <select id="wd-assign-to" className="form-select">
            <option value="everyone">Everyone</option>
          </select>
        </div>

        <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="font-weight-bold">Due</label>
          <input id="wd-due-date" className="form-control w-100" type="date" value="2024-05-13" />
        </div>
      </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="font-weight-bold">Available from</label>
          <input id="wd-available-from" className="form-control w-100" type="date" value="2024-05-06" />
        </div>

        <div className="col-md-6">
          <label htmlFor="wd-available-until" className="font-weight-bold">Until</label>
          <input id="wd-available-until" className="form-control" type="date" value="2024-05-20" />
        </div>
      </div>
      </div>
      <hr />
      {/* Cancel and Save buttons */}
      <div className="d-flex justify-content-end mt-4">
        <input type="button" className="btn btn-secondary me-2" value="Cancel" />
        <input type="submit" className="btn btn-danger" value="Save" />
      </div>
    </div>
  );
}
