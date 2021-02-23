const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const users=mongoose.model('users', 
               new Schema({firstname: String,
                lastname: String,
                email:{type:String,unique:true},
                password: String, 
                role:String}), 
               );


const sensornodes=mongoose.model('sensornodes', 
               new Schema({name: {type:String,unique:true},
                type: Number,
                loc: String,
                MC:String,
                F: String,
                Time:Number,
                Used:Number,
                S: String,
                TS:String,
                FS:String,
                GS:String,
                Temp: Number, 
                fuel: Number,
                Glat: Number,
                Glon: Number,
                service:String,
                dis:String,
                Status:String}), 
               );


module.exports.index = function(req, res, next) 
{
    res.render('index');
};

module.exports.register = function(req, res, next) 
{
    res.render('register');
};

module.exports.registration = function(req, res, next) 
{
    var newuser= new users();
    newuser.firstname=req.body.firstname;
    newuser.lastname=req.body.lastname;
    newuser.email=req.body.email;
    newuser.password=req.body.password;
    newuser.role=req.body.role;
    newuser.save(function (err,docs) {
        if (err) return handleError(err);
        res.render('index');
        });  
};

module.exports.home = function(req, res, next) 
{
    var email=req.body.email;
    users.find({email:email},function (err, docs) {
        var matches = docs.filter(function(user)
                 {
                     return    (user.email === req.body.email) 
                            && (user.password === req.body.password) && (user.role===req.body.role);
                 });
        
        if (matches.length === 0)
        {
          res.render('index', {message:"Invalid credentials!"});
        }
        else
        { 
          if(req.body.role==='F')
          {
            var name=docs[0].firstname;
            user1=name;
            res.cookie('cookie','admin',{maxAge: 900000, httpOnly: false,path:'/'});
            user=docs;
            res.render('fhome',{user:user});
          }
          if(req.body.role==='MC')
            {
                var name=docs[0].firstname;
                res.cookie('cookie','admin',{maxAge: 900000, httpOnly: false,path:'/'});
                user=docs;
                res.render('mhome',{user:user});
            }
            if(req.body.role==='SCS')
            {
                var name=docs[0].firstname;
                res.cookie('cookie','admin',{maxAge: 900000, httpOnly: false,path:'/'});
                user=docs;
                res.render('shome',{user:user});
            }
        }
    })
};

module.exports.mdashboard = function(req, res, next) 
{
    res.render('Mdashboard');
};

module.exports.mhome = function(req, res, next) 
{
    res.render('mhome',{user:user});
};

module.exports.mmachines = function(req, res, next) 
{
    res.render('mmachines',{user:user});
};

module.exports.madd = function(req, res, next) 
{
    res.render('maddm',{user:user});
};

module.exports.maddm = function(req, res, next)
{
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.loc=req.body.sloc;
    newsensor.MC=user[0].firstname;
    newsensor.F="";
    newsensor.S="";
    newsensor.Glat=0;
    newsensor.Glon=0;
    newsensor.Temp=0;
    newsensor.fuel=0;
    newsensor.Time=0;
    newsensor.Used=0;
    newsensor.service="";
    newsensor.dis="";
    newsensor.Status="inactive";
    newsensor.type="";
    newsensor.TS="";
    newsensor.FS="";
    newsensor.GS="";
    newsensor.save(function (err,docs) {
        if (err) res.render('mmachines');
                res.render('mhome',{user:user});
                    })
}

module.exports.mmymachines = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({MC:name},function (err, doc) {
            res.render('mmymachines',{user:user,machines:doc});
            })
};

module.exports.mmysensors = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({MC:name},function (err, doc) {
            res.render('mmysensors',{user:user,machines:doc});
            })
};

module.exports.mdelete = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({MC:name},function (err, doc) {
            res.render('mdeletem',{user:user,machines:doc});
            })
};

module.exports.mdeletem = function(req, res, next) 
{
    if(req.body.check)
   {
       var c=req.body.check;
       sensornodes.deleteOne({name:c},function(err,docs){
                if(!err){
                    res.render('mhome',{user:user});
                }
                else
                {
                console.log("error")
                }
            });
   }
};

module.exports.msensors = function(req,res, next)
{
    res.render('msensors',{user:user})
}

module.exports.maddsensor = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({MC:name},function (err, doc) {
            res.render('madds',{user:user,machines:doc});
            })
}

module.exports.madds = function(req, res, next) 
{
   if(req.body.check)
   {
       var c=req.body.check;
       s=c;
           res.render('maddsensor',{name:c,user:user})
   }
};

module.exports.maddss = function(req, res, next) 
{
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.type=req.body.type;
    if(req.body.type==1)
    {
        newsensor.TS="";
        newsensor.FS="added";
        newsensor.GS="";
    }
    if(req.body.type==2)
    {
        newsensor.TS="added";
        newsensor.FS="";
        newsensor.GS="";
    }
    if(req.body.type==3)
    {
        newsensor.TS="";
        newsensor.FS="";
        newsensor.GS="added";
    }
    if(req.body.type==4)
    {
        newsensor.TS="added";
        newsensor.FS="";
        newsensor.GS="added";
    }
    if(req.body.type==5)
    {
        newsensor.TS="";
        newsensor.FS="added";
        newsensor.GS="added";
    }
    if(req.body.type==6)
    {
        newsensor.TS="added";
        newsensor.FS="added";
        newsensor.GS="";
    }
    if(req.body.type==7)
    {
        newsensor.TS="added";
        newsensor.FS="added";
        newsensor.GS="added";
    }
    
    var conditions = { name:newsensor.name }
  , update = {type:newsensor.type,TS:newsensor.TS,FS:newsensor.FS,GS:newsensor.GS}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user}); 
   
};

module.exports.mupdatesensor = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{MC:name},{type:{$ne:0}}]},function (err, doc) {
            res.render('mupdates',{user:user,machines:doc});
            })
}

module.exports.mupdates = function(req,res,next)
{
    if(req.body.check)
   {
       var c=req.body.check;
       s=c;
       var name=user[0].firstname;
       sensornodes.find({MC:name},function (err, doc) {
        res.render('mupdatesensor',{user:user,machines:doc});
        })
   }
}

module.exports.mupdatess = function(req, res, next) 
{
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.type=req.body.type;
    if(req.body.type==1)
    {
        newsensor.TS="";
        newsensor.FS="added";
        newsensor.GS="";
    }
    if(req.body.type==2)
    {
        newsensor.TS="added";
        newsensor.FS="";
        newsensor.GS="";
    }
    if(req.body.type==3)
    {
        newsensor.TS="";
        newsensor.FS="";
        newsensor.GS="added";
    }
    if(req.body.type==4)
    {
        newsensor.TS="added";
        newsensor.FS="";
        newsensor.GS="added";
    }
    if(req.body.type==5)
    {
        newsensor.TS="";
        newsensor.FS="added";
        newsensor.GS="added";
    }
    if(req.body.type==6)
    {
        newsensor.TS="added";
        newsensor.FS="added";
        newsensor.GS="";
    }
    if(req.body.type==7)
    {
        newsensor.TS="added";
        newsensor.FS="added";
        newsensor.GS="added";
    }
    
    var conditions = { name:newsensor.name }
  , update = {type:newsensor.type,TS:newsensor.TS,FS:newsensor.FS,GS:newsensor.GS}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user}); 
   
};

module.exports.mdeletesensor = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{MC:name},{type:{$ne:0}}]},function (err, doc) {
            res.render('mdeletes',{user:user,machines:doc});
            })
}

module.exports.mdeletes = function(req,res,next)
{
    if(req.body.check)
   {
       var c=req.body.check;
       s=c;
       var name=user[0].firstname;
       sensornodes.find({MC:name},function (err, doc) {
        res.render('mdeletesensor',{user:user,machines:doc});
        })
   }
}

module.exports.mdeletess = function(req, res, next) 
{
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.type=req.body.type;
    if(req.body.type==1)
    {
        newsensor.FS="";
        var conditions = { name:newsensor.name }
  , update = {FS:newsensor.FS}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user}); 

    }
    if(req.body.type==2)
    {
        newsensor.TS="";
        var conditions = { name:newsensor.name }
  , update = {TS:newsensor.TS}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user});
    }
    if(req.body.type==3)
    {
        newsensor.GS="";
        var conditions = { name:newsensor.name }
  , update = {GS:newsensor.GS}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user});
    }
     
   
};

module.exports.mconfiguresensor = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{MC:name},{type:{$ne:0}}]},function (err, doc) {
            res.render('mconfigures',{user:user,machines:doc});
            })
}

module.exports.mconfigures = function(req,res,next)
{
    if(req.body.check)
   {
       var c=req.body.check;
       s=c;
       var name=user[0].firstname;
       sensornodes.find({name:c},function (err, doc) {
        res.render('mconfiguresensor',{user:user,machines:doc});
        })
   }
}

module.exports.mconfiguress = function(req, res, next) 
{
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.Status=req.body.type;
        var conditions = { name:newsensor.name }
  , update = {Status:newsensor.Status}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('mhome',{user:user}); 
    }

module.exports.mabout =function(req,res,next)
{
    res.render('mabout',{user:user})
}


module.exports.logout =function(req,res,next)
{
    req.session.destroy();
    res.render('index');
}

module.exports.sdashboard = function(req, res, next) 
{
    res.render('sdashboard');
};

module.exports.shome = function(req, res, next) 
{
    res.render('shome',{user:user});
};

module.exports.smymachines = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({},function (err, doc) {
            res.render('smymachines',{user:user,machines:doc});
            })
};

module.exports.smysensors = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({},function (err, doc) {
            res.render('smysensors',{user:user,machines:doc});
            })
};

module.exports.sabout =function(req,res,next)
{
    res.render('sabout',{user:user})
}

module.exports.fdashboard = function(req, res, next) 
{
    res.render('fdashboard');
};

module.exports.fhome = function(req, res, next) 
{
    res.render('fhome',{user:user});
};

module.exports.fmachines = function(req, res, next) 
{
    res.render('fmachines',{user:user});
};

module.exports.fservicerequests = function(req, res, next) 
{
    res.render('fservicerequests',{user:user});
};

module.exports.fadd = function(req, res, next) 
{
    sensornodes.find({F:""},function (err, doc) {
        res.render('faddm',{user:user,machines:doc});
        })
};

module.exports.faddm = function(req, res, next) 
{
    sensornodes.find({F:""},function (err, doc) {
        res.render('faddmachine',{user:user,machines:doc});
        })
};

module.exports.faddms = function(req,res,next)
{
    var name=user[0].firstname;
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.Time=req.body.type;
    newsensor.F=name;
    newsensor.Used=Math.floor((Math.random() * req.body.type) + 0) 
    sensornodes.find({name:newsensor.name},function (err, doc) {
            if(doc[0].FS==='added')
            {
                newsensor.fuel=Math.floor((Math.random() * 150) + 50);
            }
            if(doc[0].TS==='added')
            {
                newsensor.Temp=Math.floor(Math.random() * 11 + 55);
            }
            if(doc[0].GS==='added')
            {
                newsensor.Glat=Math.floor(Math.random() * 0.5 + 37.3382);
                newsensor.Glon=Math.floor(Math.random() * 0.5 + (-121.8863));
            } 
            var conditions = { name:newsensor.name }
  , update = {F:newsensor.F,Time:newsensor.Time,Used:newsensor.Used,fuel:newsensor.fuel,Temp:newsensor.Temp,Glat:newsensor.Glat,Glon:newsensor.Glon}
  , options = { multi: true };
            sensornodes.updateOne(conditions, update, options, callback);
            function callback (err, docs) {
              }
            })
              res.render('fhome',{user:user});         
}

module.exports.fdelete = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({F:name},function (err, doc) {
        res.render('fdeletem',{user:user,machines:doc});
        })

}

module.exports.fdeletem = function(req, res, next) 
{
    if(req.body.check)
    {
    var newsensor= new sensornodes();
    newsensor.name=req.body.sname;
    newsensor.type=req.body.type;
    newsensor.F="";
    var conditions = { name:req.body.check }
  , update = {F:newsensor.F}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('fhome',{user:user});
    }    
}

module.exports.fmymachines = function(req, res, next) 
{
    var name=user[0].firstname;
    sensornodes.find({F:name},function (err, doc) {
            res.render('fmymachines',{user:user,machines:doc});
            })
};

module.exports.fservicerequests = function(req, res, next) 
{
    res.render('fservicerequests',{user:user});
};

module.exports.faddr = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({F:name},function (err, doc) {
            res.render('faddrequest',{user:user,machines:doc});
            })
}

module.exports.faddrequest = function(req,res,next)
{
    if(req.body.check)
    {
        var c = req.body.check;
        sensornodes.find({name:c},function (err, doc) {
            res.render('faddr',{user:user,machines:doc});
            })    
    }
}

module.exports.faddrr = function(req,res,next)
{
    var newsensor= new sensornodes();
    newsensor.dis=req.body.sloc;
    newsensor.service="required";
    var conditions = { name:req.body.sname}
  , update = {dis:newsensor.dis,service:newsensor.service}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('fhome',{user:user});
}

module.exports.fupdater = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{F:name},{service:"required"}]},function (err, doc) {
            res.render('fupdaterequest',{user:user,machines:doc});
            })
}

module.exports.fupdaterequest = function(req,res,next)
{
    if(req.body.check)
    {
        var c = req.body.check;
        sensornodes.find({name:c},function (err, doc) {
            res.render('fupdater',{user:user,machines:doc});
            })    
    }
}

module.exports.fupdaterr = function(req,res,next)
{
    var newsensor= new sensornodes();
    newsensor.dis=req.body.sloc;
    newsensor.service="required";
    var conditions = { name:req.body.sname}
  , update = {dis:newsensor.dis,service:newsensor.service}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs) {
    }
    res.render('fhome',{user:user});
}

module.exports.fdeleter = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{F:name},{service:"required"}]},function (err, doc) {
            res.render('fdeleterequest',{user:user,machines:doc});
            })
}

module.exports.fdeleterequest = function(req,res,next)
{
    if(req.body.check)
    {
    var newsensor= new sensornodes();
    newsensor.dis="";
    newsensor.service="";
    var conditions = { name:req.body.check}
  , update = {dis:newsensor.dis,service:newsensor.service}
  , options = { multi: true };
  sensornodes.updateOne(conditions, update, options, callback);
  function callback (err, docs){
    }
    res.render('fhome',{user:user});
}
}

module.exports.fmyservice = function(req,res,next)
{
    var name=user[0].firstname;
    sensornodes.find({$and:[{F:name},{service:"required"}]},function (err, doc) {
            res.render('fmyrequests',{user:user,machines:doc});
            })
}

module.exports.fmakepayment = function(req,res,next)
{
    var name = user[0].firstname;
    sensornodes.find({F:name},function(err,doc){
        res.render('mpayment',{user:user,machines:doc})
    } )
}

module.exports.fpayment = function(req,res,next)
{
    var name = user[0].firstname;
    sensornodes.find({F:name},function(err,doc){
        Charge=doc[0].Used * 15
        tax=0.1*(Charge + 50)
        Total=Charge + tax + 50;
        res.render('fpayment',{user:user,charge:Charge,tax:tax,total:Total})
    } )
}

module.exports.payment = function(req,res,next)
{
    res.render('payment',{user:user})
}

module.exports.pay = function(req,res,next)
{
    res.render('successfule',{user:user})
}






     
   








// module.exports.fadd = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.name=req.body.sname;
//     newsensor.type=req.body.type;
//     newsensor.F=user[0].firstname;
//     newsensor.MC="";
//     newsensor.S="";
//     newsensor.Glat=0;
//     newsensor.Glon=0;
//     newsensor.Temp=0;
//     newsensor.fuel=0;
//     newsensor.service="N/A";
//     newsensor.dis="";
//     newsensor.Status="inactive";
//     newsensor.save(function (err,docs) {
//         if (err) return handleError(err);
//         var name=user[0].firstname;
//             sensors.find({F:name},function (err, doc) {
//                 mysensors=doc;
//         res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode});
//             })
//         });
// };


// module.exports.feditsensor = function(req, res, next) 
// {
//    if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensors.find({name:c},function (err, doc) {
//            res.render('feditsensor',{sensors:mysensors})
//        })
//    }
// };

// module.exports.fedit = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.name=req.body.sname;
//     newsensor.type=req.body.type;
//     var conditions = { name:newsensor.name }
//   , update = {type:newsensor.type}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     var name=user[0].firstname;
//             sensors.find({F:name},function (err, doc) {
//                 mysensors=doc;
//     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode}); 
//             })
// };

// module.exports.fdeletesensor = function(req, res, next) 
// { 
//     if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensors.deleteOne({name:c},function(err,docs){
//                 if(!err){
//                     var name=user[0].firstname;
//             sensors.find({F:name},function (err, doc) {
//                 mysensors=doc;
//                     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode});
//             })
//                 }
//                 else
//                 {
//                 console.log("error")
//                 }
//             });
//    }
// };

// module.exports.faddn = function(req, res, next) 
// {
//     var newsensor= new sensornodes();
//     newsensor.name=req.body.sname;
//     newsensor.type=req.body.type;
//     newsensor.F=user[0].firstname;
//     newsensor.MC="";
//     newsensor.S="";
//     newsensor.Glat="";
//     newsensor.Glon="";
//     newsensor.Temp="";
//     newsensor.fuel="";
//     newsensor.service="N/A";
//     newsensor.dis="";
//     newsensor.Status="inactive";
//     var name=user[0].firstname;
//     console.log(name)
//     newsensor.save(function (err,docs) {
//         if (err) return handleError(err);
//         sensornodes.find({F:name},function (err, doc) {
//         sensornode=doc;
//         res.render('fsensors',{user:user,sensors:mysensors,nodes:sensornode});
//         })
//         });
// };

// module.exports.fdeletenode = function(req, res, next) 
// { 
//     if(req.body.check)
//    {
//        var c=req.body.check;
//        var name=user[0].firstname;
//        s=c;
//        sensornodes.deleteOne({name:c},function(err,docs){
//                 if(!err){
//                     sensornodes.find({F:name},function (err, doc) {
//                         sensornode=doc;
//                     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode});
//                     })
//                 }
//                 else
//                 {
//                 console.log("error")
//                 }
//             });
//    }
// };


// module.exports.fhome = function(req, res, next) 
// {
    
//     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode});
// };

// module.exports.mhome = function(req, res, next) 
// {
    
//     res.render('mhome',{user:user,sensors:mysensors,nodes:sensornode});
// };

// module.exports.shome = function(req, res, next) 
// {
    
//     var name=user[0].firstname;
//             sensors.find({S:name},function (err, doc) {
//                 sensornodes.find({S:name},function (err, doc1) {
//                 mysensors=doc;

//     res.render('shome',{user:user,sensors:mysensors,nodes:doc1}); 
//             })
//         })
// };

// module.exports.msensors = function(req, res, next)
// {  
//     var name=user[0].firstname;
//     sensors.find({MC:name},function (err, doc) {
//         sensors.find({MC:""},function (err, doc1) {
//             res.render('msensors',{user:user,sensors:doc,sensors1:doc1});
//     })
// })
// }

// module.exports.ssensors = function(req, res, next)
// {  
//     var name=user[0].firstname;
//     sensors.find({S:name},function (err, doc) {
//         sensors.find({$and:[{S:""},{service:"required"}]},function (err, doc1) {
//             res.render('ssensors',{user:user,sensors:doc,sensors1:doc1});
//     })
// })
// }

// module.exports.msensornodes = function(req, res, next)
// {  
//     var name=user[0].firstname;
//     sensornodes.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:""},function (err, doc1) {
//             res.render('msensornodes',{user:user,sensornodes:doc,sensornodes1:doc1});
//     })
// })
// }

// module.exports.ssensornodes = function(req, res, next)
// {  
//     var name=user[0].firstname;
//     sensornodes.find({S:name},function (err, doc) {
//         sensornodes.find({$and:[{S:""},{service:"required"}]},function (err, doc1) {
//             res.render('ssensornodes',{user:user,sensornodes:doc,sensornodes1:doc1});
//     })
// })
// }

// module.exports.fsensors = function(req, res, next) 
// {
//     res.render('fsensors',{sensors:mysensors});
// };

// module.exports.fsensornodes = function(req, res, next) 
// {
//     res.render('fsensornode',{nodes:sensornode});
// };

// module.exports.fservicereqs = function(req, res, next) 
// {
//     var name=user[0].firstname;
//             sensors.find({F:name,service:"required"},function (err, doc) {
//                 sensornodes.find({F:name,service:"required"},function (err, doc1) {
//             mysensors1=doc;
//             sensornode1=doc1;
//             res.render('fservicereq',{sensors:mysensors1,nodes:sensornode1});
//                 })
//             })
// };

// module.exports.mservicereqs = function(req, res, next) 
// {
//     var name=user[0].firstname;
//             sensors.find({MC:name,service:"required"},function (err, doc) {
//                 sensornodes.find({MC:name,service:"required"},function (err, doc1) {
//             mysensors1=doc;
//             sensornode1=doc1;
//             res.render('mservicereqs',{sensors:mysensors1,nodes:sensornode1});
//                 })
//             })
// };

// module.exports.fabout = function(req, res, next) 
// {
//     res.render('fabout');
// };

// module.exports.mabout = function(req, res, next) 
// {
//     res.render('mabout');
// };

// module.exports.sabout = function(req, res, next) 
// {
//     res.render('sabout');
// };

// module.exports.faddsensor = function(req, res, next) 
// {
//     res.render('faddsensor');
// };

// module.exports.faddnode = function(req, res, next) 
// {
//     res.render('faddnode');
// };

// module.exports.flogout = function(req, res, next) 
// {
//     req.session.destroy();
//    res.render('index');
// };

// module.exports.fservicereq = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var c=req.body.check;
//     sensor=c;
//     res.render('fservice');
//   }
// };

// module.exports.faddservice = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.service="required";
//     newsensor.dis=req.body.dis;
//         sensors.find({F:sensor},function (err, doc) {
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode}); 
//             })
// };

// module.exports.fnservicereq = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var c=req.body.check;
//     sensor=c;
//     res.render('faddservicen');
//   }
// };

// module.exports.faddnservice = function(req, res, next) 
// {
//     var newsensor= new sensornodes();
//     newsensor.service="required";
//     newsensor.dis=req.body.dis;
//         sensornodes.find({F:sensor},function (err, doc) {
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     res.render('fhome',{user:user,sensors:mysensors,nodes:sensornode}); 
//         })
// };

// module.exports.fdeleteservice = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var sensor=req.body.check;
//     var newsensor= new sensors();
//     newsensor.service="N/A";
//     newsensor.dis="";
//         sensors.find({F:sensor},function (err, doc) {
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     res.render('fhome',{user:user,sensors:doc,nodes:sensornode}); 
//         })
//     }
// };

// module.exports.fdeletenservice = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var sensor=req.body.check;
//     var newsensor= new sensornodes();
//     newsensor.service="N/A";
//     newsensor.dis="";
//         sensornodes.find({F:sensor},function (err, doc) {
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     res.render('fhome',{user:user,sensors:mysensors,nodes:doc}); 
//         })
//     }
// };

// module.exports.maddsensor = function(req,res,next)
// {
//     if(req.body.check)
//     {
//         var sensor=req.body.check;
//         var newsensor= new sensors();
//         var name=user[0].firstname;
//         newsensor.MC=name;
//          sensors.find({name:sensor},function(err,doc){
//              type=doc[0].type;
//              if(type==="GPS"){
//                  newsensor.Glat=Math.floor((Math.random() * 10) + 1);
//                  newsensor.Glon=Math.floor((Math.random() * 10) + 1);
//              }
//              if(type==="TEMP"){
//                  newsensor.Temp=Math.floor((Math.random() * 10) + 1);;    
//              }
//              if(type==="FUEL"){
//                  newsensor.fuel=Math.floor((Math.random() * 10) + 1);
//              }
         
//          var conditions = { name:sensor }
//   , update = {MC:newsensor.MC,Glat:newsensor.Glat,Glon:newsensor.Glon,Temp:newsensor.Temp,fuel:newsensor.fuel,Status:"active"}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
// })
//     sensors.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:name},function(err,doc1){
//             res.render('mhome',{user:user,sensors:doc,nodes:doc1});    
//     })
// })
//     }
// }

// module.exports.mdeletesensor = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {MC:"",Status:"inactive",Glat:"",Glon:"",Temp:"",fuel:""}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({MC:name},function (err, doc) {
//     sensornodes.find({MC:name},function(err,doc1){
//         res.render('mhome',{user:user,sensors:doc,nodes:doc1});    
// })
// })

// }

// module.exports.mservicereq = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var c=req.body.check;
//     sensor=c;
//     res.render('mservice');
//   }
// };

// module.exports.maddservice = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.service="required";
//     newsensor.dis=req.body.dis;
//         sensors.find({MC:sensor},function (err, doc) {
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     res.render('mhome',{user:user,sensors:mysensors,nodes:sensornode}); 
//             })
// };

// module.exports.meditsensor = function(req, res, next) 
// {
//    if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensors.find({name:c},function (err, doc) {
//            res.render('meditsensor',{sensors:doc})
//        })
//    }
// };

// module.exports.medit = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.name=req.body.sname;
//     newsensor.Status=req.body.type;
//     var conditions = { name:newsensor.name }
//   , update = {Status:newsensor.Status}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     var name=user[0].firstname;
//             sensors.find({MC:name},function (err, doc) {
//                 sensornodes.find({MC:name},function (err, doc1) {
//                 mysensors=doc;

//     res.render('mhome',{user:user,sensors:mysensors,nodes:doc1}); 
//             })
//         })
// };

// module.exports.maddnsensor = function(req,res,next)
// {
//     if(req.body.check)
//     {
//         var sensor=req.body.check;
//         var newsensor= new sensornodes();
//         var name=user[0].firstname;
//         newsensor.MC=name;
//         newsensor.Glat=Math.floor((Math.random() * 10) + 1);
//         newsensor.Glon=Math.floor((Math.random() * 10) + 1);
//         newsensor.Temp=Math.floor((Math.random() * 10) + 1);;    
//         newsensor.fuel=Math.floor((Math.random() * 10) + 1);
         
//          var conditions = { name:sensor }
//   , update = {MC:newsensor.MC,Glat:newsensor.Glat,Glon:newsensor.Glon,Temp:newsensor.Temp,fuel:newsensor.fuel,Status:"active"}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     sensors.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:name},function(err,doc1){
//             res.render('mhome',{user:user,sensors:doc,nodes:doc1});    
//     })
// })
//     }
// }

// module.exports.mservicenreq = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var c=req.body.check;
//     sensor=c;
//     res.render('maddservicen');
//   }
// };

// module.exports.maddservicen = function(req, res, next) 
// {
//     var newsensor= new sensornodes();
//     var name=user[0].firstname;
//     newsensor.service="required";
//     newsensor.dis=req.body.dis;
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     sensors.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:name},function(err,doc1){
//             res.render('mhome',{user:user,sensors:doc,nodes:doc1});    
//     })
// })
// };

// module.exports.mdeletensensor = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {MC:"",Status:"inactive",Glat:"",Glon:"",Temp:"",fuel:""}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({MC:name},function (err, doc) {
//     sensornodes.find({MC:name},function(err,doc1){
//         res.render('mhome',{user:user,sensors:doc,nodes:doc1});    
// })
// })

// }

// module.exports.meditnsensor = function(req, res, next) 
// {
//    if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensornodes.find({name:c},function (err, doc) {
//            res.render('meditnsensor',{sensors:doc})
//        })
//    }
// };

// module.exports.meditn = function(req, res, next) 
// {
//     var newsensor= new sensornodes();
//     newsensor.name=req.body.sname;
//     newsensor.Status=req.body.type;
//     var conditions = { name:newsensor.name }
//   , update = {Status:newsensor.Status}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     var name=user[0].firstname;
//             sensors.find({MC:name},function (err, doc) {
//                 sensornodes.find({MC:name},function (err, doc1) {
//                 mysensors=doc;

//     res.render('mhome',{user:user,sensors:mysensors,nodes:doc1}); 
//             })
//         })
// };

// module.exports.mdeleteservice = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var sensor=req.body.check;
//     var name=user[0].firstname;
//     var newsensor= new sensors();
//     newsensor.service="N/A";
//     newsensor.dis="";
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     sensors.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:name},function (err, doc1) {
//         mysensors=doc;

// res.render('mhome',{user:user,sensors:mysensors,nodes:doc1}); 
//     })
// })
//     }
// };

// module.exports.mdeletenservice = function(req, res, next) 
// {
//     if(req.body.check)
//     {
//     var sensor=req.body.check;
//     var newsensor= new sensornodes();
//     var name=user[0].firstname;
//     newsensor.service="N/A";
//     newsensor.dis="";
//     var conditions = { name:sensor }
//   , update = {service:newsensor.service,dis:newsensor.dis}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     sensors.find({MC:name},function (err, doc) {
//         sensornodes.find({MC:name},function (err, doc1) {
//         mysensors=doc;

// res.render('mhome',{user:user,sensors:mysensors,nodes:doc1}); 
//     })
// })
//     }
// };

// module.exports.saddreq = function(req,res,next)
// {
//     if(req.body.check)
//     {
//         var sensor=req.body.check;
//         var newsensor= new sensors();
//         var name=user[0].firstname;
//         newsensor.S=name;
         
//          var conditions = { name:sensor }
//   , update = {S:newsensor.S}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }

//     sensors.find({S:name},function (err, doc) {
//                 sensornodes.find({S:name},function (err, doc1) {
//             mysensors1=doc;
//             sensornode1=doc1;
//             res.render('shome',{sensors:mysensors1,nodes:sensornode1});
//                 })
//             })
//     }
// }

// module.exports.sdeletereq = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {S:"",}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({S:name},function (err, doc) {
//     sensornodes.find({S:name},function(err,doc1){
//         res.render('shome',{user:user,sensors:doc,nodes:doc1});    
// })
// })
// }

// module.exports.ssolved = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {S:"",service:"",dis:""}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({S:name},function (err, doc) {
//     sensornodes.find({S:name},function(err,doc1){
//         res.render('shome',{user:user,sensors:doc,nodes:doc1});    
// })
// })
// }

// module.exports.seditstatus = function(req, res, next) 
// {
//    if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensors.find({name:c},function (err, doc) {
//            res.render('seditstatus',{sensors:doc})
//        })
//    }
// };

// module.exports.sedit = function(req, res, next) 
// {
//     var newsensor= new sensors();
//     newsensor.name=req.body.sname;
//     newsensor.Status=req.body.type;
//     var conditions = { name:newsensor.name }
//   , update = {Status:newsensor.Status}
//   , options = { multi: true };
//   sensors.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     var name=user[0].firstname;
//             sensors.find({S:name},function (err, doc) {
//                 sensornodes.find({S:name},function (err, doc1) {
//                 mysensors=doc;

//     res.render('shome',{user:user,sensors:mysensors,nodes:doc1}); 
//             })
//         })
// };

// module.exports.saddnreq = function(req,res,next)
// {
//     if(req.body.check)
//     {
//         var sensor=req.body.check;
//         var newsensor= new sensornodes();
//         var name=user[0].firstname;
//         newsensor.S=name;
         
//          var conditions = { name:sensor }
//   , update = {S:newsensor.S}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }

//     sensors.find({S:name},function (err, doc) {
//                 sensornodes.find({S:name},function (err, doc1) {
//             mysensors1=doc;
//             sensornode1=doc1;
//             res.render('shome',{sensors:mysensors1,nodes:sensornode1});
//                 })
//             })
//     }
// }

// module.exports.sdeletenreq = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {S:"",}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({S:name},function (err, doc) {
//     sensornodes.find({S:name},function(err,doc1){
//         res.render('shome',{user:user,sensors:doc,nodes:doc1});    
// })
// })
// }

// module.exports.snsolved = function(req,res,next)
// {
//     if(req.body.check)
//    {
//     var name=user[0].firstname;
//        var c=req.body.check;
//        var conditions = { name:c }
//   , update = {S:"",service:"",dis:""}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//    }
//    sensors.find({S:name},function (err, doc) {
//     sensornodes.find({S:name},function(err,doc1){
//         res.render('shome',{user:user,sensors:doc,nodes:doc1});    
// })
// })
// }

// module.exports.seditnstatus = function(req, res, next) 
// {
//    if(req.body.check)
//    {
//        var c=req.body.check;
//        s=c;
//        sensornodes.find({name:c},function (err, doc) {
//            res.render('seditnstatus',{sensors:doc})
//        })
//    }
// };

// module.exports.seditn = function(req, res, next) 
// {
//     var newsensor= new sensornodes();
//     newsensor.name=req.body.sname;
//     newsensor.Status=req.body.type;
//     var conditions = { name:newsensor.name }
//   , update = {Status:newsensor.Status}
//   , options = { multi: true };
//   sensornodes.updateOne(conditions, update, options, callback);
//   function callback (err, docs) {
//     }
//     var name=user[0].firstname;
//             sensors.find({S:name},function (err, doc) {
//                 sensornodes.find({S:name},function (err, doc1) {
//                 mysensors=doc;

//     res.render('shome',{user:user,sensors:mysensors,nodes:doc1}); 
//             })
//         })
// };