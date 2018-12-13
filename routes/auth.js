const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')


const isAuthenticated = (req, res, next) =>{
  if(req.session.currentUser) return next()
  return res.status(403).json({message:'Unauthorized, log In first'})
}


router.post('/login', (req, res, next)=>{  
  passport.authenticate('local', (err, user, info)=>{
    
    if(err)return res.status(500).json(info)
    if(!user) return res.status(500).json(info)
    req.login(user, (err )=>{
      if(err) return res.json(err)
      req.session.currentUser = user;
      console.log(req.session.currentUser)
      return res.status(200).json(req.session.currentUser)
    })
    
  })(req, res, next)
})

router.post('/signup', (req, res, next)=>{
  User.register(req.body,req.body.password)
    .then(r=>{
      res.status(200).json(r)
    }).catch(e=>{
      res.status(500).json(e)
    })
})

router.get('/logged', isAuthenticated, (req, res, next)=>{
  return res.status(200).json(req.session.currentUser)
  
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy()
  //req.logOut()
  res.status(200).json({message:'Logged out successful'})
})

router.get('/profile' ,(req, res, next)=>{
  return res.json(req.session.currentUser)
})


module.exports = router