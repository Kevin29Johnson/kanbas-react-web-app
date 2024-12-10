import { BsGripVertical, BsPlus } from "react-icons/bs";
import { HiPlus } from "react-icons/hi2";
import { IoEllipsisVertical, IoRocketOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as courseClient from "../../Courses/client";
import * as quizClient from "./client";
import { UserRole } from '../../roles';
import { useSelector } from "react-redux";

export default function Quizzes() {
  const { cid , qid} = useParams();
  const [quizData, setQuiz] = useState<any>([]);
  const navigate = useNavigate();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer) || {};
  const fetchQuiz = async () => {
    if (!cid) return;
    const quizfetched = await courseClient.findQuizzesForCourse(cid);
    setQuiz(quizfetched);
  };

  
  const handleEdit = (qid: string) => {
    console.log("Edit clicked for quiz:", qid);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`); 
    setIsContextMenuOpen(null);
  };

  const handleDelete = async (qid: string) => {
    try {
      await quizClient.deleteQuiz(qid);
      await fetchQuiz();
      console.log("Deleted quiz:", qid);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setIsContextMenuOpen(null);
    }
  };

  

  const handlePublishToggle = async (quiz: any) => {
    try {
      if (quiz.isPublished) {
        // Unpublish the quiz
        await quizClient.unPublishQuiz( quiz._id);
        console.log("Quiz unpublished:", quiz._id);
      } else {
        // Publish the quiz
        await quizClient.publishQuiz( quiz._id);
        console.log("Quiz published:", quiz._id);
      }

      // Update the state to reflect the changes
    setQuiz((prevQuizData: any[]) =>
      prevQuizData.map((q) =>
        q._id === quiz._id ? { ...q, isPublished: !q.isPublished } : q
      )
    );
      // Refresh the list of quizzes
      await fetchQuiz();
    } catch (error) {
      console.error("Error updating quiz publish status:", error);
    } finally {
      setIsContextMenuOpen(null);
    }
  };

  const toggleContextMenu = (qid: string) => {
    setIsContextMenuOpen((prev) => (prev === qid ? null : qid));
  };

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();
    return `${date.toLocaleDateString("en-US", options)} at ${time}`;
  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div id="wd-quizzes">
      <div className="container m-2" style={{ position: "relative" }}>
        <span>
          <RiSearchLine className="icon" />
        </span>
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          style={{ height: "34px" }}
        />
       {currentUser.role==UserRole.FACULTY &&
        <button id="wd-add-assignment" className="btn btn-danger m-1">
          <a
            href={`#/Kanbas/Courses/${cid}/Quizzes/New`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <HiPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </a>
        </button>}
      </div>

      <div className="wd-title p-3 ps-2 bg-secondary">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="me-2 fs-3" />
          Assignment Quizzes
        </h3>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0">
        {quizData.length > 0 ? (
          quizData.filter((quiz:any)=>currentUser.role === UserRole.FACULTY || 
          (currentUser.role === UserRole.STUDENT && quiz.isPublished))
          .map((quiz: any) => (
            <li
              key={quiz._id}
              className="wd-assignment-list-item list-group-item p-3 ps-2 border-bottom d-flex align-items-start"
            >
              <div className="me-3">
                <IoRocketOutline
                  className="me-2 fs-3"
                  style={{ color: "green" }}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <a
                    className="wd-assignment-link"
                    href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                  >
                    {quiz.title}
                  </a>
                  <div className="float-end position-relative">
                  
                    {quiz.isPublished ? (
                      <GreenCheckmark />
                    ) : (
                      <FaBan style={{ color: "red", fontSize: "21px" }} />
                    )}
                    <button
                      onClick={() => toggleContextMenu(quiz._id)}
                      className="btn btn-link p-0 ms-2"
                      style={{ verticalAlign: "middle" }}
                    >
                      <IoEllipsisVertical className="fs-4 text-black" />
                    </button>

                    {isContextMenuOpen  === quiz._id && (
                      <div
                        className="position-absolute bg-white border rounded shadow-sm"
                        style={{
                          top: "100%",
                          right: 0,
                          zIndex: 10,
                          minWidth: "120px",
                        }}
                      >
                        {currentUser.role===UserRole.FACULTY && (
                        <>
                        <button
                          className="btn btn-light w-100 text-start py-2"
                          onClick={() => handleEdit(quiz._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-light w-100 text-start py-2"
                          onClick={() => handleDelete(quiz._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-light w-100 text-start py-2"
                          onClick={() => handlePublishToggle(quiz)}
                        >
                         {quiz.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        </>
                        )
                        }
                      </div>
                    )}
                  </div>
                </div>
                <p>
                  <span className="red">
                  {(() => {
  const currentDate = new Date();
  const availableDate = new Date(quiz.availableDate);
  const availableUntil= new Date(quiz.availableUntil);

  if (currentDate > availableUntil) {
    return "Closed";
  } else if (currentDate >= availableDate && currentDate <= availableUntil) {
    return "Available";
  } else {
    return `Not available until ${formatDate(quiz.availableDate)}`;
  }
})()}
                  </span>{" "}
                  | <strong>Due</strong> {formatDate(quiz.dueDate)} |{" "}
                  {quiz.points} pts | {quiz.questions.length} Questions
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item p-3">
            No quizzes available for this course.
          </li>
        )}
      </ul>
    </div>
  );
}
