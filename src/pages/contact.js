import React from "react"
import { graphql, StaticQuery } from "gatsby"

//import CourseLayout from '../components/courseLayout';
import Layout from "../components/layout"
import { Link } from "gatsby"
import pic1 from "../assets/images/pic01.jpg"
import pic2 from "../assets/images/pic02.jpg"
//import Scroll from '../components/Scroll';
//import Gallery from '../components/Gallery';

const Contact = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <article className="container box style3">
        <header>
          <h2>Contact Us</h2>
          <p>For any enquiries or bookings - speak to Delight</p>
        </header>
        <form method="post" action="#">
          <div className="row gtr-50">
            <div className="col-6 col-12-mobile">
              <input
                type="text"
                className="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="col-6 col-12-mobile">
              <input
                type="text"
                className="text"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="col-12">
              <textarea name="message" placeholder="Message" />
            </div>
            <div className="col-12">
              <ul className="actions">
                <li>
                  <input type="submit" value="Send Message" />
                </li>
              </ul>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <Contact location={props.location} props data={data} {...props} />
    )}
  />
)
