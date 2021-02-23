var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");


router.get('/', ctrlMain.index);
router.get('/register', ctrlMain.register);
router.post('/registration', ctrlMain.registration);
router.get('/mdashboard', ctrlMain.mdashboard);
router.get('/mhome', ctrlMain.mhome);
router.post('/Home', ctrlMain.home);
router.get('/mmachines', ctrlMain.mmachines);
router.get('/madd', ctrlMain.madd);
router.post('/maddm', ctrlMain.maddm);
router.get('/mmymachines', ctrlMain.mmymachines);
router.get('/mmysensors', ctrlMain.mmysensors);
router.get('/mdelete', ctrlMain.mdelete);
router.post('/mdeletem', ctrlMain.mdeletem);
router.get('/msensors', ctrlMain.msensors);
router.get('/maddsensor', ctrlMain.maddsensor);
router.post('/madds', ctrlMain.madds);
router.post('/maddss', ctrlMain.maddss);
router.get('/mupdatesensor', ctrlMain.mupdatesensor);
router.post('/mupdates', ctrlMain.mupdates);
router.post('/mupdatess', ctrlMain.mupdatess);
router.get('/mdeletesensor', ctrlMain.mdeletesensor);
router.post('/mdeletes', ctrlMain.mdeletes);
router.post('/mdeletess', ctrlMain.mdeletess);
router.get('/mconfiguresensor', ctrlMain.mconfiguresensor);
router.post('/mconfigures', ctrlMain.mconfigures);
router.post('/mconfiguress', ctrlMain.mconfiguress);
router.get('/mabout', ctrlMain.mabout);
router.get('/logout', ctrlMain.logout);
router.get('/sdashboard', ctrlMain.sdashboard);
router.get('/shome', ctrlMain.shome);
router.get('/smymachines', ctrlMain.smymachines);
router.get('/smysensors', ctrlMain.smysensors);
router.get('/sabout', ctrlMain.sabout);
router.get('/fdashboard', ctrlMain.fdashboard);
router.get('/fhome', ctrlMain.fhome);
router.get('/fmachines', ctrlMain.fmachines);
router.get('/fadd', ctrlMain.fadd);
router.post('/faddm',ctrlMain.faddm)
router.post('/faddms',ctrlMain.faddms)
router.get('/fdelete', ctrlMain.fdelete);
router.post('/fdeletem', ctrlMain.fdeletem);
router.get('/fmymachines', ctrlMain.fmymachines);
router.get('/fservicerequests', ctrlMain.fservicerequests);
router.get('/faddr', ctrlMain.faddr);
router.post('/faddrequest', ctrlMain.faddrequest);
router.post('/faddrr', ctrlMain.faddrr);
router.get('/fupdater', ctrlMain.fupdater);
router.post('/fupdaterequest', ctrlMain.fupdaterequest);
router.post('/fupdaterr', ctrlMain.fupdaterr);
router.get('/fdeleter', ctrlMain.fdeleter);
router.post('/fdeleterequest', ctrlMain.fdeleterequest);
router.get('/fmyservice', ctrlMain.fmyservice);
router.get('/fmakepayment', ctrlMain.fmakepayment);
router.post('/fpayment', ctrlMain.fpayment);
router.get('/payment', ctrlMain.payment);
router.get('/pay', ctrlMain.pay);


module.exports = router;