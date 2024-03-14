import React from 'react'
import { relatedPosts } from '../../Data/relatedPosts'

const RelatedPosts = () => {
  return (
    <div className='container mb-2'>
                <h3 className='text-center mb-4' style={{fontSize:'25px'}}>Related Posts</h3>
                <div className='row'>
                    {relatedPosts.map(post=>{
                        return(
                            <div className='col-md-4'>
                            <div className='card post-card' key={post.id}>
                                <img src='/G.png'/>
                                <span className='mt-2'>{post.title}</span>
                                <h4 className='mt-2 fw-bold'>{post.subtitle}</h4>
                                <span className='mt-2'>{post.date} by {post.name}</span>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
  )
}

export default RelatedPosts
