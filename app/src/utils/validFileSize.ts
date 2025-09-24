import { acceptedFormats } from "./acceptedFormats";

export const validFileSize = (
    file: any,
    maxSize: number,
) => {

    if (file && !acceptedFormats.includes(file.type)) {
        console.error(
            `Le format de fichier ${file.name} n'est pas accepté. Ignorée.`
        );
        return false;
    }

    if (file.size && file.size > maxSize) {
        console.error(
            `La photo ${file.name} est trop lourde (${file.size} octets). Ignorée.`
        );
        return false;
    }
    return true;
};

