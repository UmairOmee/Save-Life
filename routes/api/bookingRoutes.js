const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// const keys = require('../../config/key');
const router = express.Router();


// Loads Profilr Model
const Profile = require('../../models/Profile');

// Loads User model
const User = require('../../models/User');

// Loads User model
const Booking = require('../../models/Booking');

// @route   POST api/booking/bookingrequest
router.post('/bookingrequest', 
    (req, res) => {
    const newBooking = new Booking({
                  user: req.body.id,
                  phonenumber: req.body.phonenumber,
                  address: req.body.address,
                  time: req.body.time,
                  date: req.body.date,
                  description: req.body.description,
    });
                   newBooking
                   .save((err) => {
                       if(err) return console.log(err)
                       console.log("Booking Request Successfully send")
                       Booking.find()
                        .populate('user')
                        .then((bookings) => {
                          return res.json({ success: true, bookings })
                        })
                        .catch(err => console.log(err))
                   })
    
})

router.post('/maprequestend',
  (req, res) => {
    Booking.findByIdAndUpdate(req.body.id,{
      status: "completed"
    }, (err, data) => {
      return res.json({success: true, data})
    })
  }
)



router.post('/driveracceptedrequests',
(req,res) => {
  Booking.findByIdAndUpdate(req.body.id, {
    status: "accepted"
  },(err, data) => {
    // return res.json({ success: true, data })
    Booking.find()
      .populate('user')
      .then((bookings) => {
        return res.json({ success: true, bookings })
      })
      .catch(err => console.log(err))
  })
})

router.post('/drivercompletedrequests',
(req,res) => {
  Booking.findByIdAndUpdate(req.body.id, {
    status: "completed"
  },(err, data) => {
    // return res.json({ success: true, data }
    Booking.find()
    .populate('user')
    .then((bookings) => {
      return res.json({ success: true, bookings })
    })
    .catch(err => console.log(err))
  })
})

router.post('/booknowdriver',
  (req, res) => {
    Booking.findByIdAndUpdate(req.body.id, {
                  driver: req.body.driverid,
                  driverCords: {
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                  }
    }, async (err, data) => {
      if(err) return console.log(err)
      let newdata= await Booking.findById(data._id)
                   .populate({
                    path:"user",model:"users"  
                   }) .populate({
                    // path:"drver",model:"users"
                    path: "driver", model: "users"
                   })
                   return res.json({ success: true, newdata })
      
    })
  })

  router.post('/booknowupdatedriver',
  (req, res) => {
    Booking.findByIdAndUpdate(req.body.id, {
      driverCords: {
        longitude: req.body.longitude,
        latitude: req.body.latitude
      }
    }, async (err, data) => {
      let newdata= await Booking.findById(data._id)
      .populate({
        path:"user",model:"users"  
       })
       .populate({
        // path:"drver",model:"users" 
        path: "driver", model: "users" 
       })
       return res.json({ success: true, newdata })
      
    })
  }
)


// @route   POST api/booking/booknow
router.post('/booknow', 
    (req, res) => {
    const newBooking = new Booking({
                  user: req.body.id,
                  userCords: {
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                  },
                  type: req.body.type
    });

                   newBooking
                   .save(async (err, data) => {
                       if(err) return console.log(err)
                       console.log("Booking Request Successfully Save");

                    let newdata= await Booking.findById(data._id)
                   .populate({
                    path:"user",model:"users"  
                   }) .populate({
                    // path:"drver",model:"users" 
                    path: "driver", model: "users" 
                   })
                   return res.json({ success: true, newdata })
                   })
                   
})

router.post('/booknowupdate',
  (req, res) => {
    Booking.findByIdAndUpdate(req.body.id, {
      userCords: {
        longitude: req.body.longitude,
        latitude: req.body.latitude
      }
    }, async (err, data) => {
      let newdata= await Booking.findById(data._id)
      .populate({
        path:"user",model:"users"  
       })
       .populate({
        // path:"drver",model:"users"
        path: "driver", model: "users"  
       })
       return res.json({ success: true, newdata })
      
    })
  }
)



// // @route   POST api/booking/bookingrequest
// router.post('/bookingrequest', 
//     (req, res) => {
//     const newBooking = new Booking({
//                      user: req.user._id,
//                   phonenumber: req.body.phonenumber,
//                   address: req.body.address,
//                   time: req.body.time,
//                   date: req.body.date,
//                   description: req.body.description,
//     });

//                    newBooking
//                    .save()
//                    .then(booking => 
//                       User.findByIdAndUpdate(req.user._id, {
//                         userRequest: booking._id
//                       })
//                       .then(user => 
//                         User.findById(user._id)
//                         .populate('userRequest')
//                         .then(user => res.json(user))
//                         .catch(err => console.log(err))
//                         )
//                         .catch(err => console.log(err))
//                    )
//                    .catch(err => console.log(err));
    
// })

// @route   PUT /approverequest
// @desc    Approving User Booking request
// @access  Private
// router.get(
//     '/getBookingRequests/:user_id',
//     (req, res) => {
//       User.find({_id: req.params.user_id}, (err, bookings) => {
//           if(err) return console.log(err);
//           console.log(bookings)
//       })
//     }
// )


router.put(
  '/bq',
  (req, res) => {
    const driverId = req.body.id;
    const requestId = req.body.request._id;
    console.log("driverId", req.body.id)
    User.updateMany({isDriver: true}, {
      $pull: {request: req.body.request}
    }, {
      new: true
    })
    .then(users => {
      Booking.findByIdAndUpdate(requestId,
        // findOne({_id:req.body.user},function (err, products) {
        { driver: driverId,
          status: "accepted"
        }, async function (err, request) {
            if (err) {
                return res.json({ success: false, err: err })
            }
            let data=await  Booking.find().populate({
              path:"driver",model:"users"  
             })
             .populate({
              path:"user",model:"users"  
             })
             return res.json({ success: true, data })
          //   Booking.find(function (err, data) {
          //     if (err) {
          //         return res.json({ success: false, err: err })
          //     }
          //     else {
          //         res.json({ success: true, data: data })
          //     }
          // })

        })
    })
    .catch(err => console.log(err))
  }
)


router.put('/compelterequest', (req, res) => {
  const requestId = req.body.id;
  Booking.findByIdAndUpdate(requestId, 
    {
      status: "completed"
    }, async function (err, request) {
      if (err) {
        return res.json({ success: false, err: err })
    }
    return res.json({ success: true, request })
    })
})

// router.get("/api/booking/updatedrequets", async (req, res) => {
//   let data=await  Booking.find().populate({
//     path:"driver",model:"users"  
//    })
//    .populate({
//     path:"user",model:"users"  
//    })
//    return res.json({ success: true, data })
// })

// server.post('/addCart', (req, res) => {

//   User.findByIdAndUpdate(req.body.user,
//       // findOne({_id:req.body.user},function (err, products) {
//       { $push: { cart: req.body.product } }, function (err, products) {
//           if (err) {
//               return res.json({ success: false, err: err })
//           }
//           console.log(products)
//           res.json({ "success": true, "data": products })
//       })
// })

// router.put(
//   '/bq',
//   (req, res) => {
//     const userId = req.body.id;
//     User.updateMany({isDriver: true}, {
//       $pull: {request: req.body.request}
//     },{
//       new:true
//   })
//     .then((users) => {
//       // res.json(users)
//       User.findByIdAndUpdate( userId, {
//   acceptRequest: req.body.request._id
//       })
      
//       .then(user => {
//       User.findById(user._id)
//       .populate({path:"acceptRequest",model:'booking'})
//       .then(user => jwt.sign(
//         user,
//         keys.secretOrKey,
//         { expiresIn: 3600 },
//         (err, token) => {
//           res.json({
//             success: true,
//             token: 'Bearer ' + token
//           });
//         }
//       ))
//       .catch(err => console.log(err))
//       })
//       .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
//   }
// );



// router.get(
//   '/getBookingRequests/:user_id',
//   (req, res) => {
//     User.findOne({_id: req.params.user_id})
//     .then((requests) => {
//       res.json(requests)
//     })
//     .catch(err => console.log(err))
//   }
// )


// @route   PUT /approverequest
// @desc    Approving User Booking request
// @access  Private

router.put(
  '/approverequest',
  (req, res) => {
    User.updateMany({isDriver: true},{
      $push:{request: req.body},
  },{
    new:true
})
    .then((requests) => {
      res.json(requests)
    })
    .catch(err => console.log(err))
  }
);


// @route   GET /allbookinglist
// @desc    Getiing All User Booking List
// @access  Private
router.get(
    '/allbooking',
    (req, res) => {
      Booking.find()
      .populate('user')
      .then((bookings) => {
        res.json(bookings)
      })
      .catch(err => console.log(err))
    }
  );


module.exports = router;