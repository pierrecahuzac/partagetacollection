import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 
const Carrousel = ({ images }: { images: any }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        focusOnSelect: true,
    };
    return (
        <div className="slider-container" style={{ "width": "250px", "height": "250px", }}>
            <Slider {...settings}>
                {images.map((image: any, index: number) => (
                    <div key={index} className="slider-list" >
                        <img className="slider-image" src={`${image.url}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carrousel