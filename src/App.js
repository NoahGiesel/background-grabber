import React, {useEffect } from 'react';
import './App.css'; 
import $ from "jquery";

function App() {
  
  function handleClick(e) {
    verifica()
    e.preventDefault(); 
    $("div").toggleClass("cross");   
  }
  
  const verifica =  () => {
    function $(el) {
      return document.getElementById(el);
    }
    var inp1 = $("inp1");
    var inp2 = $("inp2");
    var inp3 = $("inp3");
    var hsl = $("hsl");
    var rgb = $("rgb");
    var hex = $("hex");
    var view = $("view");
    var copyHSL = $("copyHSL");
    var copyRGB = $("copyRGB");
    var copyHexadecimal = $("copyHexadecimal");
    var root = document.documentElement;
    var h, s, l;
    h = [];
    s = [];
    l = [];
    
    function update() {
      h = [];
      s = [];
      l = [];
      for (var i = 0; i < 360; i++) {
        h.push("hsl(" + (i + 1) + ", " + 100 + "%, " + 50 + "%)");
      }
      for (let i = 0; i < 100; i++) {
        s.push("hsl(" + inp1.value + ", " + i + "%, 50%)");
        l.push("hsl(" + inp1.value + ", 100%, " + i + "%)");
      }
      inp1.style.background = "linear-gradient(to right, " + h.join(", ") + ")";
      inp2.style.background = "linear-gradient(to right, " + s.join(", ") + ")";
      inp3.style.background = "linear-gradient(to right, " + l.join(", ") + ")";
       
      view.style.backgroundColor =
        "hsl(" + inp1.value + ", " + inp2.value + "%, " + inp3.value + "%)";
      root.style.setProperty("--color1", "hsl(" + inp1.value + ", 100%, 50%)");
      root.style.setProperty(
        "--color2",
        "hsl(" + inp1.value + ", " + inp2.value + "%, 50%)"
      );
      root.style.setProperty(
        "--color3",
        "hsl(" + inp1.value + ", 100%, " + inp3.value + "%)"
      );
      $("rgb").innerHTML = window.getComputedStyle(view).backgroundColor;
      var str = window.getComputedStyle(view).backgroundColor;
      str = str.replace("rgb", "");
      str = str.replace("(", "");
      str = str.replace(")", "");
      str = str.split(",");
      var hsl =  "hsl(" + inp1.value + ", " + inp2.value + "%, " + inp3.value + "%)";
      var hex = [0, 0, 0];
      hex[0] = parseFloat(str[0]).toString(16);
      hex[1] = parseFloat(str[1]).toString(16);
      hex[2] = parseFloat(str[2]).toString(16);
      
      if(hex[0].length < 2) {
        hex[0] = '0'+hex[0];
      }
      if(hex[1].length < 2) {
        hex[1] = '0'+hex[1];
      }
      if(hex[2].length < 2) {
        hex[2] = '0'+hex[2];
      }
    
      hex = "#" + hex.join("");
      $("hsl").innerHTML = hsl;
      $("hex").innerHTML = hex;
    }
    update();
    inp1.oninput = update;
    inp2.oninput = update;
    inp3.oninput = update;
    hsl.oninput = convert;
    
    
    copyHSL.onclick = function() { 
      const el = document.createElement('textarea');
      el.value = hsl.innerHTML;
       document.body.appendChild(el);
      el.select(); 
      document.execCommand('copy');
      document.body.removeChild(el);   
    };
    
    copyRGB.onclick = function() { 
      const el = document.createElement('textarea');
      el.value = rgb.innerHTML; 
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);  
    };
    
    copyHexadecimal.onclick = function() { 
      const el = document.createElement('textarea');
      el.value = hex.innerHTML; 
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);  
    };

    
    
    function convert() {
      var str = this.value;
      str = str.replace("hsl", "");
      str = str.replace("(", "");
      str = str.replace(")", "");
      str = str.replace("%", "");
      str = str.replace("%", "");
      str = str.split(",");
      inp1.value = parseFloat(str[0]);
      inp2.value = parseFloat(str[1]);
      inp3.value = parseFloat(str[2]);
      update();
      console.log(inp2.value < parseFloat(str[1]));
    }
      
  }
  useEffect(() => {
    verifica();
  }); 
   
  return (
    <div className="App" id="container" >     
    <div id="view"></div>
      <div  onClick={handleClick} > 
        <svg viewBox="0 0 800 600">
          <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
          <path d="M300,320 L540,320" id="middle"></path>
          <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
        </svg>
      </div>
      <div id="div1">
        <div className="container" >

        <div id="colors">
          <div className="two-col">
            <p id="hsl">hsl(255, 255, 255)</p> 
            <button className="copy" id="copyHSL"> 📖 </button> 
          </div>
        <div className="two-col"> 
            <p id="rgb">rgb(255, 255, 255)</p>  
            <button  className="copy" id="copyRGB"> 📖 </button> 
          </div>
          <div className="two-col">
            <p id="hex">#ffffff</p>  
            <button  className="copy" id="copyHexadecimal"> 📖 </button> 
          </div> 
            <input className="inp" type="range" id="inp1" min="0" max="360"  draggable="false"/>
            <input className="inp" type="range" id="inp2" min="0" max="100"   draggable="false"/>
            <input className="inp" type="range" id="inp3" min="0" max="100"  draggable="false"/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
