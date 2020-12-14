exports.login = async (req, res, Users) => {
    console.log(`{"endpoint":"LOGIN","message":"request-received"}`)
    let user;
    try {

        user = await Users.findOne({
            where: {
                email: req.body.email,
                passwordHash: req.body.password,
            }
        })

    } catch (err) {
        console.log(err)

        res.send({
        code: 500,
        status: "Internal Server Error",
        })

        return
    }

    // Handle failure
    if (user == null) {
        res.send({
            code: 401,
            status: "Unauthorized",
        })

        return
    }

    // Handle success
    res.send({
        user: user,
    })
}

exports.createUser = async (req, res, Users) => {
    console.log(`{"endpoint":"CREATE_USER","message":"request-received"}`)

    // Create user
    let createRes;
    try {

        createRes = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: req.body.password,
            budget: req.body.budget,
        })

    } catch(err) {
        console.log(err)

        res.send({
        code: 500,
        status: "Internal Server Error",
        })

        return
    }

    // Handle success
    res.send({
        code: 200,
        status: "Ok",
        message: "user created",
        user: {
            id: createRes.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: req.body.password,
            budget: req.body.budget,
        }
    })
}