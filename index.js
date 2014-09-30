var exec = require('child_process').exec;
var ADB = require('appium-adb');
var adb = new ADB();
var args = process.argv.slice(2).join(' ');

adb.getConnectedDevices(function(err, devices) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  devices.forEach(function(device){
    var arg = "adb -s " + device.udid + " " + args;
    exec(arg, function(err, stdout, stderr){
      if (err) { console.log ('error for device:', device.udid, err); }
      console.log(device.udid, ':', stdout, stderr || '');
    });
  });
});
