const swag = require("../models/swag");


module.exports={

add: (req, res, next)=>{
    const{id} = req.query;
    let{cart} = req.session.user;
    const index = cart.findIndex(swag => swag.id == id)
    if(index=== -1){
      const selectAdd = swag.find(swag=>swag.id == id);
      cart.push(selectAdd);
      req.session.user.total += selectAdd.price
    }
    res.status(200).json(req.session.user)
},
delete: (req, res, next)=>{
    const{id} = req.query;
    const{cart} = req.session.user;

    const selectedDelete = swag.find(dUser => dUser.id === +id);
    if(selectedDelete){
        const d = cart.findIndex(dUser=>dUser.id=== +id);
        console.log("d", d)
        cart.splice(d,1);
        req.session.user.total -= selectedDelete.price;
    }
    res.status(200).json(req.session.user)
},
checkout: (req, res, next)=>{
    const{user} = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).json(req.session.user);

},



}