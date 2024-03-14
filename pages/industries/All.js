import React from 'react'
import Head from 'next/head';
import Layout4 from '../../Layout/Layout4';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import Image from 'next/image';
import Img from '../../Components/Element/Images';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Enquire from '../layout/Enquire';
const allIndustrialSolution = (props) => {
 
  return (
    <div>
      <Layout4>
        <Head>
          <title>Industrial Solutions</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='Industrial Automation can help resilient businesses adapt and grow during difficult times.Companies are implementing cobots to maintain worker safety.'/>
          <meta name='keywords' content='automation tools, industrial robotics, mobile robot, flexible cobots, latest robot automation'/>
          <link rel="icon" href="/Box.ico" alt="unboxLogo"/>
          <link rel="canonical" href="https://www.unboxindustry.com/industries/All" />
        </Head>
        <div className='container-fluid industry-background mt-5'>
          <h1>HOW DOES AUTOMATION</h1><h1 style={{ color: '#FF8400' }}>MAKING A DIFFERENCE</h1><h1>IN YOUR INDUSTRY?</h1>
          <p>In every industry,<br />Automation is boosting productivity,<br /> improving quality,<br /> enabling flexible production,<br /> and enhancing worker safety.</p>

        </div>
        
        <div className='container'>
          <p className='mt-5 '>Industrial Automation can help resilient businesses adapt and grow during difficult times. Growing numbers of companies are implementing cobots to maintain worker safety, remain competitive, and remain profitable.<br /><br />
            A flexible cobot is a great choice when a high level of agility is required, their performance can be optimized depending on how precise or how much output you need.<br /><br />
            You can start enjoying the benefits right away because they are easy to install and get up and running quickly.</p>
          <h3 className='headingstyle mt-5 mb-2'>CHOOSE YOUR INDUSTRY</h3>
          <p className='text-center'>SEE HOW INDUSTRIAL AUTOMATION ARE TRANSFORMING YOUR INDUSTRY.
          </p>
        </div>
       
        <Container className='home-page mb-3'>
          <Row className='g-4 g-sm-3 ms-3'>
            {props.topics.data.map((elem) => {
              return (
                <Col xl='3' sm='6' key={elem.id}>
                  <div className='industry-wrap'>
                    <div className='card industry-card'>
                      <div className=' industry-image mt-2 mb-2'>
                        <Link href={`/industries/${elem.id}-${elem.attributes.industry_slug}`}>
                          <Img src={getStrapiMedia(elem.attributes.Images)} className='img-fluid' alt={elem.attributes.Title} />
                        </Link>
                      </div>

                      <div className='industry-content'>
                        <h3 className='mb-2'>{elem.attributes.CardTitle}</h3>
                        <span className='font-light' dangerouslySetInnerHTML={{__html:`${elem.attributes.ShortDescription}`}}></span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <Enquire/>
      <FlowerSubscribe/>
      </Layout4>
    </div>
  )

}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetchAPI(`/industrial-solutions`, {
    populate: '*',

  })

  let topics = await res

  // Pass data to the page via props
  return {
    props: { topics: topics }
  }
}




export default allIndustrialSolution;