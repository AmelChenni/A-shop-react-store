import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import categories from '../categoriesData/categoriesData';
import { Link } from 'react-router';


export default function Categories() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable:false, 
    responsive: [
      { breakpoint: 400, settings: { slidesToShow: 1} }, // من 576 وأقل = 2
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },

    ],
  };

  return (
    <div className="container my-4">
      <h2 className="category-title ">Shop by Category</h2>
      <Slider {...settings} className="slider">
        {categories.map((cat) => (
          <div key={cat.name} className="category-card">
            <Link to={`/categories/${cat.name}`} className="category-content">
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: 80, height: 80 }}
              />
              <h5>{cat.name}</h5>
            </Link>
          </div>
        ))}
      </Slider>

      <Link
        to="/categories"
        className=" seeMore btn btn-primary  d-block m-auto mt-3 py-2 px-3 "
        onClick={() => console.log("hello")}
      >
        See More
      </Link>
    </div>
  );
}
