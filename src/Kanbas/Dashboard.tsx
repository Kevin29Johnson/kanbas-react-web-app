import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { enroll, unenroll } from "./reducer";
import { fetchAllCourses } from "./Courses/client";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } =
    useSelector((state: any) => state.accountReducer) || {};
  const { enrollments } =
    useSelector((state: any) => state.enrollmentReducer) || {};
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleEnrollments = () => setShowAllCourses(!showAllCourses);
  // const toggleEnrollments=()=>{
  //    if(!showAllCourses){
  //     fetchAllCourses();
  //    }
  // }

  // Check if a student is enrolled in a course
  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment: { user: any; course: string }) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );

  // Conditional filtering of courses based on showAllCourses
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));

  const showEditDeleteButtons =
    isEnrolled(course._id) && currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          id="wd-enrollments-button"
          onClick={toggleEnrollments}
        >
          Enrollments
        </button>
      </div>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="New Course"
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="New Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "400px" }}
            >
              <div className="card">
                <Link
                  to={
                    isEnrolled(course._id)
                      ? `/Kanbas/Courses/${course._id}/Home`
                      : ``
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={course.imagePath || "/images/reactjs.jpg"}
                    width="100%"
                    alt={`${course.name || "Course"} cover`}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name || "Unnamed Course"}
                    </h5>
                    <p
                      className="card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description || "No description available"}
                    </p>
                    {isEnrolled(course._id) && (
                      <button className="btn btn-primary">Go</button>
                    )}

                    {/* Enroll/Unenroll Button based on enrollment status */}
                    {isEnrolled(course._id) ? (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(
                            unenroll({
                              user: currentUser?._id,
                              course: course._id,
                            })
                          );
                        }}
                        className="btn btn-danger float-end m-1"
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(
                            enroll({
                              user: currentUser?._id,
                              course: course._id,
                            })
                          );
                        }}
                        className="btn btn-success float-end m-1"
                      >
                        Enroll
                      </button>
                    )}

                    {/* Show Delete and Edit buttons only for FACULTY users */}
                    {/* Show Delete and Edit buttons only for FACULTY users who are enrolled */}
                    {currentUser?.role === "FACULTY" &&
                      isEnrolled(course._id) && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
