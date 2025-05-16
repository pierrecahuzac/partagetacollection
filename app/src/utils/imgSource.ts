import CDImg from "../../public/img/D00003.jpg"
import blurayImg from '../../public/img/boitier-bluray-01.jpg';
import DVDImg from '../../public/img/istockphoto-1097301900-612x612.jpg'
import vinyleImg from '../../public/img/50-cd-couleur-jet-d-encre-boitier-digifile-2-volets.jpg'

type ItemWithFormatType = {
    formatType: {
        name: string
    }
}
export const imgSource = (
    item: ItemWithFormatType
) => {
    if (item?.formatType?.name.toLowerCase() === "cd") {
        return CDImg;
    } else if (item?.formatType?.name.toLowerCase() === "bluray") {
        return blurayImg;
    }
    else if (item?.formatType?.name.toLowerCase() === "dvd") {
        return DVDImg;
    }
    else if (item?.formatType?.name.toLowerCase() === "vinyle") {
        return vinyleImg;
    }
    else {
        return CDImg
    }
}