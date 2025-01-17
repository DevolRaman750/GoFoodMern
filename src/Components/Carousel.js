import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner " id='carousel'  style={{zIndex:"10"}}>
    <div className="carousel-item active">
        <div className='coursel-caption'>
            <form className='d-flex'>
                <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search'/>
                <button className='btn btn-outline-success text-white bg-success' type='submit'></button>
           
            </form>
        
        </div>
    </div>
    <div className='carousel-item'>
      <img src="./Components/burger.jpg" className="d-block h-100 w-30" alt="..."/>
    </div>  
    <div className="carousel-item">
      <img src="./Pizza.jpg" className="d-block h-100 w-30" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block h-100 w-30" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
