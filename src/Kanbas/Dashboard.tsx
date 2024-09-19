import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img alt="reactjs"src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1235/Home">
            <img alt="python" src="/images/python.jpg" width={200} />
            <div>
              <h5>
                 CS1235 Python Programming
              </h5>
              <p className="wd-dashboard-course-title">
                Python A-Z
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
    <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1236/Home">
      <img alt="JS"src="/images/javascript.jpg" width={200} />
      <div>
        <h5>CS1236 JavaScript Development</h5>
        <p className="wd-dashboard-course-title">JavaScript Mastery</p>
        <button>Go</button>
      </div>
    </Link>
  </div>
 
  <div className="wd-dashboard-course"> 
    <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1237/Home">
      <img alt="algos" src="/images/algo.jpg" width={200} />
      <div>
        <h5>CS1237 Algorithms</h5>
        <p className="wd-dashboard-course-title">Machine Learning A-Z</p>
        <button>Go</button>
      </div>
    </Link>
  </div>
  <div className="wd-dashboard-course"> 
    <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1238/Home">
      <img alt="ML"src="/images/machinelearning.jpg" width={200} />
      <div>
        <h5>CS1238 Machine Learning</h5>
        <p className="wd-dashboard-course-title">Machine Learning A-Z</p>
        <button>Go</button>
      </div>
    </Link>
  </div>

  <div className="wd-dashboard-course"> 
    <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1239/Home">
      <img alt="sql" src="/images/sql.jpg" width={200} />
      <div>
        <h5>CS1239 SQL</h5>
        <p className="wd-dashboard-course-title">Intorduction to SQL</p>
        <button>Go</button>
      </div>
    </Link>
  </div>
  <div className="wd-dashboard-course"> 
    <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1240/Home">
      <img alt="java" src="/images/java.jpg" width={200} />
      <div>
        <h5>CS1240 Java</h5>
        <p className="wd-dashboard-course-title">Java Programming</p>
        <button>Go</button>
      </div>
    </Link>
  </div>
      </div>      
    </div>
  );
}
export default Dashboard;