import React from 'react'
import Layout from '../layouts/Layout'
import videoBg from '../assets/video.mp4';
type Props = {}

function About({ }: Props) {
  return (
    <Layout>
        <div className="main">
          <div className="overlay"></div>
          <video src={videoBg} autoPlay loop muted />
          <div className="about">
            <p>We Are Digitall</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non similique nulla quo expedita eligendi voluptatibus, consequuntur autem sit incidunt recusandae animi necessitatibus iusto odio ipsa voluptatem neque impedit ducimus harum?</p>
          </div>
        </div>
  </Layout>
  )
}

export default About