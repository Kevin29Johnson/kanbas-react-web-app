import { RiSearchLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi2";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilLight } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="container m-2" style={{ position: "relative" }}>
        <span>
          <RiSearchLine className="icon" />
        </span>
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          style={{ height: "34px" }}
        />
        <button
          id="wd-add-assignment-group"
          className="btn btn-light btn-secondary ms-4"
        >
          <HiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </button>
        <button id="wd-add-assignment" className="btn btn-danger m-1">
          <HiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
      </div>

      <div className="wd-title p-3 ps-2 bg-secondary">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="me-2 fs-3" />
          ASSIGNMENTS
          <div className="float-end">
            <span className="btn btn-outline-secondary rounded-pill mb-2">
              40% of Total
            </span>
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </h3>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment-list-item list-group-item p-3 ps-2 border-bottom d-flex align-items-start">
          <div className="me-3">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencilLight className="me-2 fs-3" style={{ color: "green" }} />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                A1
              </a>
              <LessonControlButtons />
            </div>
            <p>
              <span className="red">Multiple Modules</span> |{" "}
              <strong>Not available until</strong> May 6 at 12.00 am
            </p>
            <p>
              <strong>Due</strong> May 13 at 11:59 pm | 100 pts
            </p>
          </div>
        </li>

        <li className="wd-assignment-list-item list-group-item p-3 ps-2 border-bottom d-flex align-items-start">
          <div className="me-3">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencilLight className="me-2 fs-3" style={{ color: "green" }} />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                A2
              </a>
              <LessonControlButtons />
            </div>
            <p>
              <span className="red">Multiple Modules</span> |{" "}
              <strong>Not available until</strong> May 13 at 12.00 am
            </p>
            <p>
              <strong>Due</strong> May 20 at 11:59 pm | 100 pts
            </p>
          </div>
        </li>

        <li className="wd-assignment-list-item list-group-item p-3 ps-2 border-bottom d-flex align-items-start">
          <div className="me-3">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencilLight className="me-2 fs-3" style={{ color: "green" }} />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                A3
              </a>
              <LessonControlButtons />
            </div>
            <p>
              <span className="red">Multiple Modules</span> |{" "}
              <strong>Not available until</strong> May 20 at 12.00 am
            </p>
            <p>
              <strong>Due</strong> May 27 at 11:59 pm | 100 pts
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}