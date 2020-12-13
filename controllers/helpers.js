exports.validateCreateItemRequest = (body) => {
    let errs = ""
    if (body.description == null || body.description == "") {
        errs += "invalid description "
    }
    if (body.price == null || isNaN(body.price)) {
        errs += "invalid price "
    }
    if (errs.length > 0) {
        throw new Error(errs)
    }
}