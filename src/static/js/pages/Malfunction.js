import React from 'react';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

function graphsHandler(){

	var selectedCells = [];
	var i;


	for (i=0;i<60;i++) {
		selectedCells[i]=0;
	}

	function CalculateDimension(source,value){

		if ( "Consumption" === source ) {
			document.getElementById("Dimension").value = ( value / 1500 ).toFixed(2);
		}

		if ( "Dimension" === source ) {
			document.getElementById("Consumption").value = 1500 * value;
		}
	}

	function GetCurve() {

		var irr = document.getElementById("Irradiation");
		var t = document.getElementById("Temperature");
		var ivcurve = document.getElementById("IVcurve");
		var pvcurve = document.getElementById("PVcurve");

		var fIrr = ( irr.value / 1000 ).toFixed(2);
		var numT = t.value;
		var showIrr = document.getElementById("ValueIrradiation");
		
		showIrr.innerHTML = irr.value;

		var showT = document.getElementById("ValueTemperature");
		showT.innerHTML = t.value;
		
		ivcurve.src = "http://localhost:8080/static/Images/Matlab/" + "IV_S" + fIrr.toString() + "_T" + numT.toString() + ".png";
		pvcurve.src = "http://localhost:8080/static/Images/Matlab/" + "PV_S" + fIrr.toString() + "_T" + numT.toString() + ".png";
	}

	function Stop(event) {
		ResizeCanvas(event);
	}

	function ResizeCanvas(event) {

		if (!! event ){
			event.stopPropagation();
		}
		
		var shading=GetShadingValue();
		var canvas = document.getElementById("myCanvas");
		var image = document.getElementById("Cell");
		canvas.width = window.innerWidth * 0.4;
		
		var width = canvas.width/11;
		var distance = width+(canvas.width-10*width)/9;
		canvas.height = 6*width + 5*(canvas.width-10*width)/9;
		
		var offset1= 30;
		var offset2= 50;
		canvas.width = offset1 + canvas.width + offset2;
		
		var cell = [];
		var acc=0;
		var x, y;
		for (y=1 ; y<6+1 ; y++) {
		
			for (x=1 ; x<10+1 ; x++) {
		
				cell = canvas.getContext("2d");
				cell.drawImage(image,offset1+(x-1)*distance,(y-1)*distance,width,width);
				cell.beginPath();
				cell.moveTo(offset1+(x-1)*distance,(y-1)*distance);
				cell.lineTo(offset1+(x-1)*distance+width,(y-1)*distance);
				cell.lineTo(offset1+(x-1)*distance+width,(y-1)*distance+width);
				cell.lineTo(offset1+(x-1)*distance,(y-1)*distance+width);
		
				if ( null != event ){
					if ( IsInPath( event, cell ) ) 	{
						selectedCells[acc] = ( selectedCells[acc] + 1 ) % 2;
					}
				}
		
				SelStyle(cell,acc,shading);
		
				cell.closePath();
				cell.fill();
				cell.stroke();
				cell.globalAlpha=1;
				//cell.globalCompositeOperation='destination-over';
				//cell.drawImage(image,10+(10-1)*distance,(6-1)*distance,width,width);
				//cell.globalCompositeOperation='source-over';
				acc++;
			}
		}

		DrawCurrentPath(canvas,offset1,offset2,width,distance);
		
		priny();
	}

	function DrawCurrentPath(canvas,offset1,offset2,width,distance) {

		var diodes = [0,0,0];
		
		for (i=0;i<20;i++) {
			if (selectedCells[i]==1) {
				diodes[0]=1;
				break;
			}
		}
		
		for (i=20;i<40;i++) {
			if (selectedCells[i]==1) {
				diodes[1]=1;
				break;
			}
		}
		
		for (i=40;i<60;i++) {
			if (selectedCells[i]==1) {
				diodes[2]=1;
				break;
			}
		}
		
		var shading=GetShadingValue();
		diodes=ActiveDiodes(diodes,shading);
		
		var currentPath=canvas.getContext("2d");
		currentPath.lineWidth= width/7;
		
		var diodesize=3*currentPath.lineWidth;
		currentPath.lineCap = "square";
		currentPath.strokeStyle= "red";
		currentPath.beginPath();
		currentPath.moveTo(offset1+9*distance+width+offset2/2,width/2);
		currentPath.lineTo(offset1+9*distance+width+3*offset2/4,width/2);
		currentPath.stroke();
		currentPath.moveTo(offset1+9*distance+width+offset2/2,distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2,2*distance+width/2);
		currentPath.stroke();
		currentPath.moveTo(offset1+9*distance+width+offset2/2,3*distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2,4*distance+width/2);
		currentPath.stroke();
		currentPath.moveTo(offset1+9*distance+width+offset2/2,5*distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+3*offset2/4,5*distance+width/2);
		currentPath.stroke();
		
		var arrow=document.getElementById("ArrowRed");
		
		var arrowsize=2.5*currentPath.lineWidth;
		currentPath.drawImage(arrow,offset1+9*distance+width+2*offset2/3,5*distance+width/2-arrowsize/2,arrowsize,arrowsize)
		
		var image;

		//diode 1
		if (diodes[0]==1 && (diodes[1]==0 || diodes[2]==0) ) {
			currentPath.strokeStyle= "red";
			image=document.getElementById("ActiveDiode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "black";
		}
		else {
			currentPath.strokeStyle= "black";
			image=document.getElementById("Diode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "red";
		}

		currentPath.beginPath();
		currentPath.moveTo(offset1/2,width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,width/2);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,width/2);
		currentPath.lineTo(offset1/2,distance+width/2);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,distance+width/2)
		currentPath.stroke();
		currentPath.drawImage(image,(offset1+9*distance+width+offset2/2)-diodesize/2,distance-diodesize/2,diodesize,diodesize);
		
		//diode 2
		if (diodes[1]==1 && (diodes[0]==0 || diodes[2]==0)) {
			currentPath.strokeStyle= "red";
			image=document.getElementById("ActiveDiode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,2*distance+width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,3*distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "black";
		}
		else {
			currentPath.strokeStyle= "black";
			image=document.getElementById("Diode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,2*distance+width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,3*distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "red";
		}

		currentPath.beginPath();
		currentPath.moveTo(offset1/2,width/2+2*distance);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,width/2+2*distance);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,width/2+2*distance);
		currentPath.lineTo(offset1/2,width/2+3*distance);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,3*distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,3*distance+width/2)
		currentPath.stroke();
		currentPath.drawImage(image,(offset1+9*distance+width+offset2/2)-diodesize/2,3*distance-diodesize/2,diodesize,diodesize);
		
		//diode 3
		if (diodes[2]==1 && (diodes[0]==0 || diodes[1]==0)) {
			currentPath.strokeStyle= "red";
			image=document.getElementById("ActiveDiode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,4*distance+width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,5*distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "black";
		}
		else {
			currentPath.strokeStyle= "black";
			image=document.getElementById("Diode");
			currentPath.beginPath();
			currentPath.moveTo(offset1+9*distance+width+offset2/2,4*distance+width/2+currentPath.lineWidth);
			currentPath.lineTo(offset1+9*distance+width+offset2/2,5*distance+width/2-currentPath.lineWidth);
			currentPath.stroke();
			currentPath.strokeStyle= "red";
		}

		currentPath.beginPath();
		currentPath.moveTo(offset1/2,width/2+4*distance);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,width/2+4*distance);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,width/2+4*distance);
		currentPath.lineTo(offset1/2,width/2+5*distance);
		currentPath.stroke();
		currentPath.moveTo(offset1/2,5*distance+width/2);
		currentPath.lineTo(offset1+9*distance+width+offset2/2-currentPath.lineWidth,5*distance+width/2)
		currentPath.stroke();
		currentPath.drawImage(image,(offset1+9*distance+width+offset2/2)-diodesize/2,5*distance-diodesize/2,diodesize,diodesize);
	}

	function GetShadingValue() {
		var options = document.getElementsByName("SD");
		var shading;
		for(var i = 0; i < options.length; i++) {
		    if(options[i].checked){
		        shading = options[i].value;
		    }
		}
		return shading;
	}

	function ActiveDiodes(diodes,shading) {

		var mivcurve=document.getElementById('MIVcurve');
		var mpvcurve=document.getElementById('MPVcurve');
		var all=(1).toFixed(2);
		var x=(shading/1).toFixed(2);

		if((diodes[0]+diodes[1]+diodes[2])==0) {
			mivcurve.src="http://localhost:8080/static/Images/Matlab/IVM_S1_1.00_S2_1.00_S_31.00.png";
			mpvcurve.src="http://localhost:8080/static/Images/Matlab/PVM_S1_1.00_S2_1.00_S_31.00.png";
		}
		else if((diodes[0]+diodes[1]+diodes[2])==1) {
			mivcurve.src="http://localhost:8080/static/Images/Matlab/IVM_S1_1.00_S2_1.00_S_3"+x.toString()+".png";
			mpvcurve.src="http://localhost:8080/static/Images/Matlab/PVM_S1_1.00_S2_1.00_S_3"+x.toString()+".png";
		}
		else if((diodes[0]+diodes[1]+diodes[2])==2) {
			mivcurve.src="http://localhost:8080/static/Images/Matlab/IVM_S1_1.00_S2_"+x.toString()+"_S_3"+x.toString()+".png";
			mpvcurve.src="http://localhost:8080/static/Images/Matlab/PVM_S1_1.00_S2_"+x.toString()+"_S_3"+x.toString()+".png";
		}
		else {
			mivcurve.src="http://localhost:8080/static/Images/Matlab/IVM_S1_"+x.toString()+"_S2_"+x.toString()+"_S_3"+x.toString()+".png";
			mpvcurve.src="http://localhost:8080/static/Images/Matlab/PVM_S1_"+x.toString()+"_S2_"+x.toString()+"_S_3"+x.toString()+".png";
		}

		if(shading==0.8) {
			diodes=[0,0,0];
		}
		
		if(shading==0.5 && (diodes[0]+diodes[1]+diodes[2])==2) {
			diodes=[0,0,0];
		}
		
		return diodes;
	}

	function priny() {
		console.log(selectedCells);
	}

	function IsInPath(event,cxt) {
		var bb, x, y;
		var canvas = document.getElementById("myCanvas");
		bb = canvas.getBoundingClientRect();
		x = (event.clientX-bb.left) * (canvas.width/bb.width);
		y = (event.clientY-bb.top) * (canvas.height/bb.height);
		return cxt.isPointInPath(x,y);
	}

	function SelStyle(cxt,acc,shading){
		if (selectedCells[acc]==1) {
			cxt.globalAlpha=1-shading;
			cxt.lineWidth= 3;
	    	cxt.strokeStyle= "black";
	    	cxt.fillStyle= "black";
		}
		else {
			cxt.globalAlpha=0.0;
			cxt.lineWidth= 10;
	    	cxt.fillStyle= "gray";
	    	cxt.strokeStyle= "darkblue";
		}
	}

	ResizeCanvas(null);

	window.onresize = function() {
	  ResizeCanvas(null);
	}

	window.onClick = function () {
		for (i=0;i<60;i++) {
			selectedCells[i]=0;
		}
		ResizeCanvas(event);
	}

	return Object.freeze({
		Stop: Stop,
		GetCurve: GetCurve,
		ResizeCanvas: ResizeCanvas,
	});
}

class Malfunction extends _PageComponent {

	constructor(props){
		super(props);
		this.graphsHandler = null;

		this.GetCurve = this.GetCurve.bind(this);
		this.ResizeCanvas = this.ResizeCanvas.bind(this);
		this.Stop = this.Stop.bind(this);
	}

	componentDidMount(){
		this.graphsHandler = graphsHandler();
		setTimeout(() => {
			this.graphsHandler.ResizeCanvas(null);
		}, 500);
		
	}

	GetCurve(){
		this.graphsHandler.GetCurve();
	}

	ResizeCanvas(event){
		this.graphsHandler.ResizeCanvas(event);
	}

	Stop(event){
		this.graphsHandler.Stop(event);
	}

    render() {
        return <Content>


					<h1>{ ApplicationStore.get('title') }</h1>
					<br/>
					
					<div className="content-row">


				      <div className="IV-PVimages" id="CellIVPV">
					        
					        <div id="IRR">
					          <label htmlFor="Irradiation">Ηλιοφάνεια (W/m<sup>2</sup>):</label>
					          <input className="UserSlider1" id="Irradiation" type="range" min="0" max="1000" step="10" defaultValue="1000" onInput={ this.GetCurve } onChange={ this.GetCurve } />
					          <div id="ValueIrradiation"> 1000 W/m<sup>2</sup></div>
					        </div>

					        <div id="TEM">
					          <label htmlFor="Temperature">Θερμοκρασία (<sup>ο</sup>C):</label>
					          <input className="UserSlider1" id="Temperature" type="range" min="0" max="50" step="5" defaultValue="25" onInput={ this.GetCurve } onChange={ this.GetCurve } />
					          <div id="ValueTemperature"> 25<sup>o</sup> C</div>
					        </div>

					        <br/>

							<div id="Curves">

								<div>
					          		<img id="onTop" src="http://localhost:8080/static/Images/Random/LettersIVcell.png" />
					          		<img id="IVcurve" src="http://localhost:8080/static/Images/Matlab/IV_S1.00_T25.png" alt="IV Curve" />
					          	</div>

					          	<div>					          	
					          		<img id="onTop" src="http://localhost:8080/static/Images/Random/LettersPVcell.png" />
					          		<img id="PVcurve" src="http://localhost:8080/static/Images/Matlab/PV_S1.00_T25.png" alt="PV Curve" />
					          	</div>
					        </div>

				        </div>

					</div>
					
					<div className="content-row">

						<img id="Cell" src="http://localhost:8080/static/Images/Random/Cell.png" style={{ display:"none" }} />
				      	<img id="ActiveDiode" src="http://localhost:8080/static/Images/Random/DiodeActive.png" style={{ display:"none" }} />
				      	<img id="Diode" src="http://localhost:8080/static/Images/Random/Diode.png" style={{ display:"none" }} />
				      	<img id="ArrowRed" src="http://localhost:8080/static/Images/Random/ArrowRed.png" style={{ display:"none" }} />

				      <div id="Module-Shading">
				        
				        <div id="LevelShading">
				        
				          Ηλιακή ακτινοβολία σκιασμένων κυψελών:<br/><br/>	
				          
				          <input className="UserSlider2" name="SD" id="ShadingDensity1" type="radio" value="0.8" onClick={ this.Stop } defaultChecked />
				          <label htmlFor="ShadingDensity1" onClick={ this.Stop }> 800W/m<sup>2</sup></label>
				          <br/>
				          
				          <input className="UserSlider2" name="SD" id="ShadingDensity2" type="radio" value="0.5" onClick={ this.Stop } />
				          <label htmlFor="ShadingDensity2" onClick={ this.Stop }> 500W/m<sup>2</sup></label>
				          <br/>
				          
				          <input className="UserSlider2" name="SD" id="ShadingDensity3" type="radio" value="0.2" onClick={ this.Stop } />
				          <label htmlFor="ShadingDensity3" onClick={ this.Stop }> 200W/m<sup>2</sup></label>
				          <br/>

				        </div>
				        <canvas id="myCanvas" style={ { border: "5px solid #C0C0C0" } } onClick={ this.ResizeCanvas }></canvas>
				      </div>

				      <br />

				      <div className="IV-PVimages" id="ModuleIVPV">
				        <div id="ModuleCurves">

				        	<div>
				          		<img id="onTop" src="http://localhost:8080/static/Images/Random/LettersIVmodule.png" width="50%" />
				          		<img id="MIVcurve" src="http://localhost:8080/static/Images/Matlab/IVM_S1_1.00_S2_1.00_S_31.00.png" alt="IV Curve" width="50%" />
				          	</div>

				          	<div>
				          		<img id="onTop" src="http://localhost:8080/static/Images/Random/LettersPVmodule.png" width="50%" />
				          		<img id="MPVcurve" src="http://localhost:8080/static/Images/Matlab/PVM_S1_1.00_S2_1.00_S_31.00.png" alt="PV Curve" width="50%" />
				          	</div>

				        </div>
				      </div>

					</div>

				</Content>;
    }
}

export default Malfunction;
