function change(){
    var star=document.getElementById("main")
    var disp=document.getElementById("check")
    
    if(star.style.display="none"){
      star.style.display="block";
      disp.style.display="none";
      let nam=document.getElementById("query").value;
     nam.innerText=" ";
    }
   
  }

  function mute(){
    var mute=document.getElementById("mute")
    var sound=document.getElementById("sound")
    if(mute.style.display="none"){
        mute.style.display="block";
        sound.style.display="none"
        var audio = document.getElementById('audio');
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0
            $('#play').addClass('glyphicon-play-circle')
            $('#play').removeClass('glyphicon-pause')
           
        }

    }
  }

  function unmute(){
    var mute=document.getElementById("mute")
    var sound=document.getElementById("sound")
    if(sound.style.display="none"){
        mute.style.display="none";
        sound.style.display="block"
        var audio = document.getElementById("audio");
        if (audio.paused) {
            audio.play();
            $('#play').removeClass('glyphicon-play-circle')
            $('#play').addClass('glyphicon-pause')
        }
    }

  }

var bx1=document.querySelector(".box1");
bx1.style.color = "yellow";
bx1.onmouseover.style.color="white";
bx1.onmouseout.style.color="yellow";
// bx1.onmouseover = function() {mouseOver(bx1)};
// bx1.onmouseout = function() {mouseOut(bx1)};


// function mouseOver(bx1) {
//     bx1.style.color = "white";
//   }
//   function mouseOut(bx1) {
//     bx1.style.color = "yellow";
//   }

var timerId;



async function searchMovies(n){

    let res = await fetch(`https://swapi.dev/api/people/?search=${n}`);
    let data=await res.json();
    console.log("data:",data);

    var results=(data.results);
    return results
}


function appendMovies(m){
 
    document.getElementById("query").addEventListener('click', function(){
    document.getElementById("movies").style.display = "block";
});
    m.forEach(({name,birth_year,gender,hair_color,mass,height,eye_color}) =>{
       let p=document.createElement('p');
       let p1=document.createElement('p');
       let p2=document.createElement('p');
       console.log("movies:",name,gender);
       p.innerText=name;
       p.style.lineHeight="10px"
       p.style.top="3px"
       p.onmouseover = function() {mouseOver(p)};
       p.onmouseout = function() {mouseOut(p)};
       p1.innerText=birth_year;
       p2.innerText=gender;
    
        p2.style.float="right";
        p2.style.marginRight="4%"

        p.onclick =function(){ 
           
            document.getElementById("main").style.display = "none";
            document.getElementById("movies").style.display = "none";
            display(name,birth_year,gender,hair_color,mass,height,eye_color)};
        
        let movies_div=document.getElementById("movies");
       p.append(p2,p1);
       movies_div.append(p);
      
       
    });
}

function display(name,birth_year,gender,hair_color,mass,height,eye_color){
    
    document.getElementById("main").style.display = "none";
    document.getElementById("check").style.display = "block";
    let birth=document.getElementById("a1");
    let gen=document.getElementById("a2");
    let ht=document.getElementById("a3");
    birth.innerText=`Birth Year: ${birth_year}` ;
    gen.innerText=`Gender: ${gender}` ;
    ht.innerText=`Height: ${height}` ;
    let eye=document.getElementById("b1");
    let mas=document.getElementById("b2");
    let hair=document.getElementById("b3");
    eye.innerText=`Eye Color: ${eye_color}` ;
    mas.innerText=`Mass: ${mass}` ;
    hair.innerText=`Hair Color: ${hair_color}` ;


    
    
    
}

function mouseOver(p) {
  p.style.color = "yellow";
}


function mouseOut(p) {
  p.style.color = "white";
}


async function main(){

    let nam=document.getElementById("query").value;
    let movies= await searchMovies(nam);
    if(movies===undefined){
        return false;
    }
    appendMovies(movies);

    
}

function debounce(func, delay){
    let nam=document.getElementById("query").value;
    if(timerId){
        clearTimeout(timerId);
    }
    timerId=setTimeout(()=>{
        func();
    },delay);
}