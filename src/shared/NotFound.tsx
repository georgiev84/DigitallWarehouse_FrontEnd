import React from 'react'
import videoBg from '../assets/video.mp4';
import Layout from '../layouts/Layout';
type Props = {}

function NotFound({ }: Props) {
    return (
        <Layout>
            <div className="main">
                <div className="overlay"></div>
                <video src={videoBg} autoPlay loop muted />
                <div className="content">
                    <h1>404</h1>
                    <p>OOPS! Page not found!</p>
                </div>
            </div>
        </Layout>
    )
}

export default NotFound