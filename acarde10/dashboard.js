﻿Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {

	//
	// skinConfig - a copy of the skin configuration from config.json
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
	// this function is called before everything else, 
	// so you may perform any DOM or resource initializations / image preloading here

	utils.preloadImages([
		'images/bg-off.png', 'images/bg-on.png',
		'images/pedal.png','images/sidebar01.png','images/sidebar02.png',
	]);
	
	// return to menu by a click
    
	$(document).add('body').on('click', function () {
		window.history.back();
	});
};


Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    
	//
	// data - telemetry data JSON object
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//    
	// This filter is used to change telemetry data     
	// before it is displayed on the dashboard.    
	// You may convert km/h to mph, kilograms to tons, etc.  
	
	// round truck speed
    
	//data.truckSpeedRounded = Math.abs(data.truckSpeed > 0
	//? Math.floor(data.truckSpeed)
	//: Math.round(data.truckSpeed)) + 'km/h';
    
	// other examples:
    
	// convert kilometers per hour to miles per hour
    
	//data.truckSpeedMph = data.truckSpeed * 0.621371;
    
	// convert kg to t
	data.hasJob = data.trailer.attached;
	data.trailer.mass = (data.trailer.mass / 1000.0) + 't';

	//data.jobIncome = '€' + data.jobIncome;
	data.job.sourceCity = data.job.sourceCity + ' (' + data.job.sourceCompany + ')';
	data.job.destinationCity = data.job.destinationCity + ' (' + data.job.destinationCompany + ')';
	data.truck.fuel = Math.round(data.truck.fuel) + 'L';
	data.truck.fuelAverageConsumption = utils.formatFloat(data.truck.fuelAverageConsumption * 100 ,1) + 'L';
	data._fuelAvg = 'x 100Km';
	data.trailer.name = data.trailer.name + ' (' + data.trailer.mass + ')';
	data.truck.make = data.truck.make + ' ' + data.truck.model;
	data.truck.wearEngine = Math.round(data.truck.wearEngine * 100) + '%';
	data.truck.wearCabin = Math.round(data.truck.wearCabin * 100) + '%';
	data.truck.wearTransmission = Math.round(data.truck.wearTransmission * 100) + '%';
	data.truck.wearChassis = Math.round(data.truck.wearChassis * 100) + '%';
	data.truck.wearWheels = Math.round(data.truck.wearWheels * 100) + '%';
	//data.truck.lightsAuxOn = (data.truck.lightsAuxFrontOn || data.truck.lightsAuxRoofOn);
	data._airPressureOn = (data.truck.airePressureWarningOn || data.truck.airPressureEmergencyOn);
	// format odometer data as: 00000.0
	//data.truckOdometer = utils.formatFloat(data.truckOdometer, 1);
	// convert gear to readable format
    
	data.truck.gear = data.truck.gear > 0 ? data.truck.gear : (data.truck.gear < 0 ? 'R' : 'N');
	data.truck.displayedGear = data.truck.displayedGear > 0 ? data.truck.displayedGear : (data.truck.displayedGear < 0 ? 'R' + Math.abs(data.truck.displayedGear) : 'N');
    
	data._dangerWarning = (data.truck.blinkerLeftOn && data.truck.blinkerRightOn);
	data._auxLights = (data.truck.lightsAuxRoofOn || data.truck.lightsAuxFronOn);
	// convert rpm to rpm * 100
	data.color = (utils.formatFloat(data.truck.speed ,0) > data.navigation.speedLimit) ? '#FFFFFF' : '#FF0000';
	//data.engineRpm = data.engineRpm / 100;

	data.trailer.wear = Math.round(data.trailer.wear * 100) + '%'; 
	// return changed data to the core for rendering
    
	return data;
};


Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
  
	$('._userThrottleBar').height(303-data.truck.userThrottle * 303);
	$('._userBrakeBar').height(303-data.truck.userBrake * 303);
	$('._userClutchBar').height(303-data.truck.userClutch * 303);
	$('._gearR1').height(0);
	$('._gearR2').height(0);
	$('._gearN').height(0);
	$('._gear1').height(0);
	$('._gear2').height(0);
	$('._gear3').height(0);
	$('._gear4').height(0);
	$('._gear5').height(0);
	$('._gear6').height(0);
	$('._gear7').height(0);
	$('._gear8').height(0);
	$('._gear9').height(0);
	$('._gear10').height(0);
	if(data.truck.displayedGear === 'N'){
		$('._gearN').height(486);
	}
	if(data.truck.displayedGear === 'R1'){
		$('._gearR1').height(486);
	}
	if(data.truck.displayedGear === 'R2'){
		$('._gearR2').height(486);
	}
	if(data.truck.displayedGear === 1){
		$('._gear1').height(486);
	}
	if(data.truck.displayedGear === 2){
		$('._gear2').height(486);
	}
	if(data.truck.displayedGear === 3){
		$('._gear3').height(486);
	}
	if(data.truck.displayedGear === 4){
		$('._gear4').height(486);
	}
	if(data.truck.displayedGear === 5){
		$('._gear5').height(486);
	}
	if(data.truck.displayedGear === 6){
		$('._gear6').height(486);
	}
	if(data.truck.displayedGear === 7){
		$('._gear7').height(486);
	}
	if(data.truck.displayedGear === 8){
		$('._gear8').height(486);
	}
	if(data.truck.displayedGear === 9){
		$('._gear9').height(486);
	}
	if(data.truck.displayedGear === 10){
		$('._gear10').height(486);
	}
	//
	if (data.truck.model === 'New Actros') {
		$('.truck-make').css('font-size', '75px');
	}
	// data - same data object as in the filter function
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
    
	// we don't have anything custom to render in this skin,
	// but you may use jQuery here to update DOM or CSS
};
