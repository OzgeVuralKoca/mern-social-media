class File {
    constructor(fieldname) {
        this.fieldname = fieldname.fieldname
        this.originalname = fieldname.originalname
        this.encoding = fieldname.encoding
        this.mimetype = fieldname.mimetype
        this.destination = fieldname.destination
        this.filename = fieldname.filename
        this.path = fieldname.path
        this.size = fieldname.size
    }
}

module.exports = File