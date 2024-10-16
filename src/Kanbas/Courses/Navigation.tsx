import { log } from "console";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams(); // Retrieve the course ID from URL parameters
  const { pathname } = useLocation(); // Get the current path
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link); // Check if the current link is active
        return (
          <Link
            key={link}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
            to={linkPath}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
