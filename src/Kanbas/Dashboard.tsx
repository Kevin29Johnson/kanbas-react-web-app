import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
      <div className="row row-cols-1 row-cols-md-5 g-4">
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img alt="reactjs"src="/images/reactjs.jpg" width="100%" height={160} />
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title card-text">
                Full Stack software developer
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
          </div>
        </div>

  
        <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1235/Home">
            <img alt="python" src="/images/python.jpg" width="100%" height={160}  />
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                 CS1235 Python
              </h5>
              <p className="wd-dashboard-course-title card-text">
                Python A-Z
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>

    <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
    <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1236/Home">
      <img alt="JS"src="/images/javascript.jpg" width="100%" height={160} />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS1236 JavaScript</h5>
        <p className="wd-dashboard-course-title card-text">JavaScript Mastery</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
  </div>

  <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1237/Home">
      <img alt="algos" src="/images/algo.jpg" width="100%" height={160}/>
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS1237 Algorithms</h5>
        <p className="wd-dashboard-course-title card-text">Algorithms</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
 </div>

  <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1238/Home">
      <img alt="ML"src="/images/machinelearning.jpg" width="100%" height={160}/>
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS1238 Machine Learning</h5>
        <p className="wd-dashboard-course-title card-text">Machine Learning A-Z</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
  </div>

  <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1239/Home">
      <img alt="sql" src="/images/sql.jpg" width="100%" height={160}/>
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS1239 SQL</h5>
        <p className="wd-dashboard-course-title card-text">Intorduction to SQL</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
  </div>

  <div className="wd-dashboard-course col" style={{ width: "300px" }}> 
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1240/Home">
      <img alt="java" src="/images/java.jpg" width="100%" height={160} />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS1240 Java</h5>
        <p className="wd-dashboard-course-title card-text">Java Programming</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
  </div>
      </div>      
    </div>

    </div>
  );
}
export default Dashboard;