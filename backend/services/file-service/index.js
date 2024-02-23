class FileService {
    static generateLink(file) { 
        // Генерируем ссылку на изображение 
        const filename = file.filename;
        const dest = file.destination.split('/')[1];

        return `${dest}/${filename}`
    }
}

module.exports = FileService