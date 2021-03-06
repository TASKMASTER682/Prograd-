import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listHome } from '../../actions/job';
import moment from 'moment';
import { API } from '../../config';


const JobHome = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = () => {
        listHome().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setJobs(data);
            }
        });
    };

 

    const showAllJobs = () => {
        return jobs.map((job, i) => {
            return (
                <div className="home-card m-1 nbtn">
                <img loading='lazy' src={`${API}/job/photo/${job.slug}`} alt={job.title} />
                <div className="card-heading">
                    <Link href={`/jobs/${job.slug}`}>
                    <a>
                     <h1  className="text-dark   " style={{fontFamily:`'Source Serif Pro' ,serif`,fontSize:'1.2rem' }}>
                        {job.title}
                        </h1>
                    </a>
                    </Link>
                    </div>
                
               
                  <h3 class="extra-small p-1">Published on | {moment(job.updatedAt).format("MMM DD YYYY")}</h3>
             </div>
            );
        });
    };
    // {showUpdateButton(blog)}
    return (
        <React.Fragment>
         {showAllJobs()}
        </React.Fragment>
    );
};

export default JobHome;



