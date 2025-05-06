import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const baseURL = import.meta.env.VITE_BASE_URL
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL
const Carrousel = ({ images }: { images: any }) => {
    console.log(images)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container" style={{ "backgroundColor": "red", "width": "250px", "height": "250px", }}>
            <Slider {...settings}>
                {images.map((image: any, index: number) => (
                    <div key={index}>
                        <img src={`${baseImageUrl}${image.url}`} alt="" style={{ width: "100%", height: "100%" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carrousel