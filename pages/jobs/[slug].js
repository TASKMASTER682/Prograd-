import Head from 'next/head';
import Link from 'next/link';
import { useState,useEffect  } from 'react';
import { singleJob ,listRelated } from '../../actions/job';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/jobs/SmallCard';
import DisqusThread from '../../components/DisqusThread';
import { isAuth } from '../../actions/auth';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import SecurityIcon from '@material-ui/icons/Security';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SchoolIcon from '@material-ui/icons/School';
import PinDropIcon from '@material-ui/icons/PinDrop';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
const SingleJob=({job,query})=>{
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ job }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);
    function makeJobSchema(job) {
        return {
            // schema truncated for brevity
            '@context': 'http://schema.org',
            '@type': 'JobPosting',
            'title' : `${job.title}`,
            'description' : `${job.mdesc} Last date:${moment(job.lastDate).format("MMM DD YYYY")},Location:${job.location},Pay Scale:${job.salary} .For more details visit The ProGrad and checkout the full update.`,
            'identifier': {
                '@type': "PropertyValue",
                 'name': "The ProGrad",
                 'value': "1234567svha0089"
               },
               'datePosted' : `${job.createdAt}`,
               'validThrough' : `${job.lastDate}`,
               'employmentType' : `${job.type}`,
               'hiringOrganization' : {
                '@type' : "Organization",
                'name' : `${job.agency}`,
                'sameAs' : `${job.slug}`,
                "logo" : `http://theprograd.com/img/prograd.png` 
              },
              'jobLocation': {
                '@type': "Place",
                  'address': {
                  '@type': "PostalAddress",
                  'streetAddress': `${job.location}`,
                  'addressCountry': "India"
                  }
                },
                'baseSalary': {
                    '@type': "MonetaryAmount",
                    'currency': "INR",
                    'value': {
                      '@type': "QuantitativeValue",
                      'value': `${job.salary}`,
                      'unitText': "Month"
                    }
                  }
        }
    }
    const JobSchema=()=> {
        return (
            <script
                key={`jobJSON-${job.id}`}
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(makeJobSchema(job)) }}
            />
        )
    }

    const head = () => (
        <Head>
            <title>
                {job.title} |Apply Online| {APP_NAME}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <meta name="description" content= {`${job.mdesc} Last date:${moment(job.lastDate).format("MMM DD YYYY")},Location:${job.location},Pay Scale:${job.salary} `} />
            <link rel="canonical" href={`${DOMAIN}/jobs/${query.slug}`} />
            <meta property="og:title" content={`${job.title}| ${APP_NAME}`} />
            <meta property="og:description" content={`${job.mdesc} Last date:${moment(job.lastDate).format("MMM DD YYYY")},Location:${job.location},Pay Scale:${job.salary} `} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/jobs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${API}/job/photo/${job.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/job/photo/${job.slug}`} />
            <meta property="og:image:type" content={`${API}/job/photo/${job.slug}`} />
            <meta name="twitter:card" content="summary_large_image"></meta>
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            {JobSchema()}

        </Head>
    );


 
     const showJobCategories = job =>
        job.jobCategories.map((c, i) => (
            <Link key={i} href={`/jobCategories/${c.slug}`}>
                <a style={{padding:" 0 0.8rem",border:'solid #00e7d2'}}  className="btn nbtn btn-light-gray "><p>{c.name}</p></a>
            </Link>
        ));

    const showJobTags = job =>
        job.jobTags.map((t, i) => (
            <Link key={i} href={`/jobTags/${t.slug}`}>
                <a style={{padding:" 0 0.8rem",border:'solid black '}}  className="btn nbtn btn-light-gray my-1 "><p>{t.name}</p></a>
            </Link>
        ));

        const showRelatedJob = () => {
            return related.map((job, i) => (
                <div className='card-item m-1' key={i}>
                    <article>
                        <SmallCard job={job} />
                    </article>
                </div>
            ));
        };
        const showComments = () => {
            return (
                <div>
                    <DisqusThread id={job._id} title={job.title} path={`/job/${job.slug}`} />
                </div>
            );
        };
     
const today=moment();
        return(
           <>
           {head()}
            <section className="container">
           
            <h3 className="large text-primary my-1">See detailed</h3>
             <p className="extra-small text-light-gray m-1 ">see eligibilty and full notification</p>

          
             <div className="jobs">
             <div className="job bg-light ">
                 <div className="job-top p-1">
                
                 <img loading='lazy' src={`${API}/job/photo/${job.slug}`} alt={job.title} className="round-image my-1 hide-sm" />
                
            <Link href={`/jobs/${job.slug}`}>
                <a>
                <h1 className="small text-dark"  style={{fontFamily:`'Source Serif Pro' ,serif` ,lineHeight:'1.9rem'}}>{job.title}</h1>
                </a>
            </Link>
            <div className="share icons p-1">
                     <a  href={`https://www.facebook.com/sharer.php?u=https://theprograd.com/jobs/${query.slug}`} target="_blank"><strong className='text-primary'><FacebookIcon style={{fontSize:30}}/></strong></a>
                     <a href={`https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>&source=https://theprograd.com/jobs/${job.title}"><img src=${API}/job/photo/${job.slug}`} target="_blank" ><strong className='text-primary'><LinkedInIcon style={{fontSize:30}}/></strong></a>
                     <a href={`https://twitter.com/home?status=Currentlyreading <?php the_permalink(); ?>" title=${job.title}"><img src=${API}/job/photo/${job.slug} alt="Share on Twitter`} target="_blank"><strong className='text-primary'><TwitterIcon style={{fontSize:30}} /></strong></a>
                  </div>

                 </div>
                 <small className="text-light-gray author extra-small ">| Published {moment(job.updatedAt).fromNow()}</small>
                 <div style={{display: 'flex',alignItems:'left',flexWrap:'wrap'}}>
                     <div className='my-1'>
                         {showJobCategories(job)}
                           
                           {showJobTags(job)}
                           </div>
                      </div>
                 <div className="job-bottom">

                 <div className="job-table p-1">
                          <div >
                              <ul>
                              <li className='text-primary'><SecurityIcon style={{fontSize:20}} /></li>
                                  <li className='text-primary' style={{marginTop:'0.7rem'}}><DateRangeIcon style={{fontSize:20 }} /></li>
                                  <li className='text-primary' style={{marginTop:'0.7rem'}}><AccountBalanceWalletIcon style={{fontSize:20}} /></li>
                                  <li className='text-primary' style={{marginTop:'0.7rem'}}><SchoolIcon style={{fontSize:20}} /></li>                                
                                  <li className='text-primary' style={{marginTop:'0.7rem'}}><PinDropIcon  style={{fontSize:20}} /></li>
                                  <li className='text-primary' style={{marginTop:'0.7rem'}}><WatchLaterIcon style={{fontSize:20}} /></li>
                              </ul>
                          </div>
                          <div>
                              <ul>
                                  <li><h4 >Agency</h4></li>
                                  <li><h4 className="my-1">Expire</h4></li>
                                  <li><h4 className="my-1">Salary</h4></li>
                                  <li><h4 className="my-1">Qualification</h4></li>
                                  <li><h4 className="my-1">Location</h4></li>
                                  <li><h4>Job Type</h4></li>
                                  
                             </ul>
                          </div>
                          <div>
                              <ul>
                                  <li ><p>{job.agency}</p></li>
                                  <li><p className="my-1">{moment(job.lastDate).fromNow()}</p></li>
                                  <li><p className="my-1">{job.salary}</p></li>
                                  <li><p className="my-1">{job.qualification}</p></li>
                                  <li><p className="my-1">{job.location}</p></li>
                                  <li><p>{job.type}</p></li>

                                </ul>
                          </div>
                        </div>  
                          <div className="job-buttons p-1">
                          <a href={`${job.applyLink}`}  target="_blank" className={`btn nbtn btn-${ moment(job.lastDate).format()<today.format() ? 'danger':'primary'} nbtn1 my-1 `}>{moment(job.lastDate).format()<today.format()  ? 'Closed':'Apply now'}</a>

                        </div>
                      </div>
                     
                      <div className='job-content' style={{padding:'0.4rem'}}>
                      {renderHTML(job.body)}
                    </div>
                    <div>
                   {( isAuth() && isAuth().role===1 )? <a href={`/admin/jobcrud/${job.slug}`} className="m-1 btn nbtn btn-success">Update</a>:''}
                   </div>
                </div>
                <div className='btn nbtn' style={{border:'solid #00e7d2',fontFamily:'Source Serif Pro ,serif'}}>
                        <h2 className="small text-primary my-1">Frequently Asked Questions </h2>
                        <h3 className="lead text-dark"><strong className='text-primary'>Q-1:</strong>What is the pay scale of {job.title} ?</h3>
                        <p className='m-1'><strong className="text-primary">Ans:</strong>The pay scale of {job.title} is {job.salary}</p>
                        <h3 className="lead text-dark"><strong className='text-primary'>Q-2:</strong>What is the location of job after qualifying this exam?</h3>
                        <p className='m-1'><strong className="text-primary">Ans:</strong>The job location of {job.title} is {job.location}</p>
                        <h3 className="lead text-dark"><strong className='text-primary'>Q-3:</strong>What is the last date to apply for {job.title} ?</h3>
                        <p className='m-1'><strong className="text-primary">Ans:</strong>The Last date of {job.title} is - {moment(job.lastDate).format("MMM DD YYYY")}</p>
                        <h3 className="lead text-dark"><strong className='text-primary'>Q-4:</strong>What is the qualification needed to apply for {job.title} ?</h3>
                        <p className='m-1'><strong className="text-primary">Ans:</strong>The detailed qualification needed to apply for {job.title} is shown above.</p>
                    </div>
                   
              </div>
        </section>
            <section className="container">
                    <h2 className="text-primary small">Suggested Jobs to apply</h2>
                    <div className='line'></div>
                    <div className="card">
                        {showRelatedJob()}
                    </div>

                    <div className="bg-primary m-1">
                      <h3 className="cmnt-body">Leave A Comment</h3>
                    </div>
                    <div className="p-1">{showComments()}</div>
            </section>
             
           </> 
            )
 }

SingleJob.getInitialProps = ({ query }) => {
    return singleJob(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { job: data, query };
        }
    });
};

export default SingleJob;