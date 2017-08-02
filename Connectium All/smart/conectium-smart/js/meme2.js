"use strict";

//////////////////////////////  variables  //////////////////////////////////////

function Foto (){
    this.image = new Image();
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.grados = 0;
    this.canvas = "";
    this.filtro= false;
}

function Texto(){
    this.texto="";
    this.width=0;
    this.height=0;
    this.x1=0;
    this.x2=0;
    this.y1=0;
    this.y2=0;
    this.x=0;
    this.y=0;
    this.tam=0;
    this.letra="arial";
    this.color="white";
    this.alin="center";
    this.grados=0;
    this.canvas = "";
}


var e = {}, // A container for DOM elements
    reader = new FileReader(),image = new Image(),image2 = new Image(),idd = null,
    ctxt2=null,ctxt = null,emoji=[],modelos=[1,2,6,13,12,13], // For canvas' 2d context
    cambio=null,img = [],adaptar=null,renderMeme2=null,texto = [],marco=null,filtro = [],
    get = function (id) {
        // Short for document.getElementById()
        return document.getElementById(id);
    };

var canvas_x=0,canvas_y=0,canvas_yy=0,canvas_xx=0,rect=null,rect2=null,canvas_x1=0,canvas_y1=0,
    posx=0,posy=0,posxx=0,posyy=0,toque=[],flag=0,flag2=0,flag3=0,flag4=0;

// Get elements (by id):
e.box1 = get("box1");
e.ifile = get("input");
e.file = get("file");
e.box2 = get("box2");
e.topline = get("topline");
e.bottomline = get("bottomline");
e.c = get("c"); // canvas;
e.downloadLink = get("downloadLink");
// Get canvas context:
ctxt = e.c.getContext("2d");
ctxt2 = e.c.getContext("2d");


//////////////////////////////////////////////////////////////////////////////////////////

// --------Evento que se activa cuando se ingresan nuevas imagenes 
var activarInput = function (id){
    e.ifile.setAttribute("name",id);
    e.ifile.click();
};

e.ifile.onchange = function () {
    if(e.ifile!=null){
        if(e.ifile.files[0].type.indexOf("image")>-1){
            if(e.ifile.files[0].size/1000<3000){
                get("cargando").style.display="block";
                cargarimg(e.ifile.name); 
            }
            else{
                alertify.log("La Imagen pesa: "+e.ifile.files[0].size/1000+" KB maximo debe pesar 3000 KB");
            }
        }
        else{
            alertify.log("Solo se admiten imagen");
        }
    }
};

var cargarimg=function(id){
    var con,pos;
    con = id.split("");
    pos = con[1];
    reader.readAsDataURL(e.ifile.files[0]);
    reader.onload = function () {
        img[pos]=new Foto();
        img[pos].canvas=id;
        img[pos].image.src = reader.result;
        img[pos].image.onload = function () {
            img[pos].canvas=id;
            asignarWH(id);
            render();
            get(id).removeAttribute("onclick");
            e.ifile.value="";
            get("cargando").style.display="none";
        };
    };
};

var asignarWH = function (id){
    var con,pos,x,y,aux;
    con = id.split("");
    pos = con[1];
    if(img[pos]!=null){
        x=get(id).width/img[pos].image.width;
        y=get(id).height/img[pos].image.height;
        
        if(get(id).width>get(id).height){
            
            img[pos].height=x*img[pos].image.height;
            img[pos].width=get(id).width;
            if(img[pos].height<get(id).height){
                aux = get(id).height-img[pos].height;
                img[pos].height=get(id).height;
                img[pos].width+=aux;
            }
        }
        else{
            img[pos].width=y*img[pos].image.width;
            img[pos].height=get(id).height;
            if(img[pos].width<get(id).width){
                aux = get(id).width-img[pos].width;
                img[pos].width=get(id).width;
                img[pos].height+=aux;
            }
        }
        img[pos].x=0;
        img[pos].y=0;
    }
};

// -----------------Renderiza------------------------ 
var renderMeme = function () {
        img.forEach(function (item, index){
            var i = index;
            if(img[i]!=null ){
                if(get(img[i].canvas)!=null){
                    ctxt = get(img[i].canvas).getContext("2d");
                    ctxt.clearRect(0, 0, 1000, 1000);
                    if(!img[i].filtro){
                        ctxt.drawImage(img[i].image, img[i].x, img[i].y,img[i].width,img[i].height);
                    }
                    else{
                        ctxt.drawImage(filtro[i], img[i].x, img[i].y,img[i].width,img[i].height);
                    }
                    eventos(img[i].canvas);
                }
            }
        });
};

var renderUnMeme = function (id,opc){
    var i,str;
    str = id.split("");
    i=str[1];
    if(img[i]!=null ){
        if(get(id)!=null){
            if(!img[i].filtro){
                ctxt = get(img[i].canvas).getContext("2d");
                ctxt.clearRect(0, 0, 1000, 1000);
                ctxt.drawImage(img[i].image, img[i].x, img[i].y,img[i].width,img[i].height);
                eventos(img[i].canvas);
            }
            else{
                ctxt = get(img[i].canvas).getContext("2d");
                ctxt.clearRect(0, 0, 1000, 1000);
                ctxt.drawImage(filtro[i], img[i].x, img[i].y,img[i].width,img[i].height);
                eventos(img[i].canvas);
            }
        }
    }
    if(opc!="emoji"){
        renderEmoji(); 
    }
    if(opc!="texto"){
        renderTexto();
    }
    
    
};

//--------Eventos para cuando se escribe texto-------
var addTexto = function (){
    //alert("hola mundo");
    get('texto').value="";
            get('tam').value="18";
            get('letra').value="Kumar One";
            get('color').value="";
            get('alin').value="center";
            get("text").setAttribute("onclick","cargarTexto()");
            abrir('myModal');
};

var cargarTexto=function(){
    if(restri()){
        var num = texto.length;
        cerrar('myModal');
        if(num<4){
           texto.push(new Texto());
            texto[num].texto=get('texto').value;
            texto[num].x=100;
            texto[num].y=100;
            texto[num].tam=get('tam').value;
            texto[num].letra=get('letra').value;
            texto[num].color=get('color').value;
            texto[num].alin=get('alin').value;
            cargarWidth(num);
            render(); 
        }
    }
};
var editarTexto=function(num){
        
        cerrar('myModal');
            texto[num].texto=get('texto').value;
            texto[num].tam=get('tam').value;
            texto[num].letra=get('letra').value;
            texto[num].color=get('color').value;
            texto[num].alin=get('alin').value;
            cargarWidth(num);
            render(); 
       
};

var cargarWidth = function(num){
    var con = texto[num].texto.split("\n").length;
    ctxt.font = "bold " + texto[num].tam + "pt "+texto[num].letra;
    
    if(con==1){
        texto[num].width=ctxt.measureText(texto[num].texto).width; 
        texto[num].height=texto[num].tam*1.45;
        texto[num].y1=texto[num].y-(texto[num].height*0.85);
        texto[num].y2=texto[num].y+(texto[num].height*0.15);
    }
    if(con>1){
        var z = texto[num].texto.split("\n");
        var aux=0;
        for(var i = 0 ; i<con ; i++){
            if(ctxt.measureText(z[i]).width > aux){
                aux=ctxt.measureText(z[i]).width;
            }
        }
        texto[num].width=aux;
        texto[num].height=texto[num].tam*1.55*con;
        texto[num].y1=texto[num].y-(texto[num].tam*1.55*0.85);
        texto[num].y2=texto[num].y1+parseInt(texto[num].height);
    }
      
    if(get('alin').value=="center"){
        texto[num].x1=texto[num].x-(texto[num].width/2);
        texto[num].x2=texto[num].x+(texto[num].width/2);
    }

    if(texto[num].alin=="left" || texto[num].alin=="start"){
        texto[num].x1=texto[num].x;
        texto[num].x2=texto[num].x+texto[num].width;
    }
    if(texto[num].alin=="right" || texto[num].alin=="end"){
        texto[num].x2=texto[num].x;
        texto[num].x1=texto[num].x-texto[num].width;
    }
};

//-------------------Borrar imagen------------------------------
var borrarimg = function(){
    var pos = document.getElementById("pos");
    img.splice(pos.value,1);
    if(img.length>0){
       incluirimg();
    }
     else{
        e.c.width=0;
        e.c.height=0;   
    }
};

var borrartodasimg = function(){
    var num = img.length;
    img.splice(0,num);
};

var borrartodo = function(){
    var num = img.length;
    img.splice(0,num);
    num = emoji.length;
    emoji.splice(0,num);
    num = texto.length;
    texto.splice(0,num);
    marco=null;
    get("canvas").innerHTML="";
    
};

//--------------abrir el modal-------------------
var abrir = function(id) {
    document.getElementById(id).style.display = "block";
   // alert('hollaaaaaa');
    if (id=="list-img"){
        if(img.length>0){
            var imgs = document.getElementById("imgs");
            imgs.innerHTML="";
            for(var i = 0; i<img.length;i++){
                var crear = document.createElement("img");
                crear.setAttribute("src",img[i].image.src);
                crear.setAttribute("width",70);
                crear.setAttribute("height",70);
                crear.setAttribute("name",i);
                crear.setAttribute("id","img"+i);
                crear.setAttribute("onclick","rotar(this.name)");
                imgs.appendChild(crear);
            }
        }
    }
};

// ---------------------cerrar el modal-----------------
var cerrar = function(id) {
    document.getElementById(id).style.display = "none";
};

//--------Funcion para intercarbiar posiciones de las imagenes en el canvas---------------
var pos_rotar=99;

var rotar = function (pos){
    if (pos_rotar==99){
           pos_rotar=pos; 
    }
    else {
        var img_aux = new Image();
        img_aux.src=img[pos].image.src;
        img[pos].image.src = img[pos_rotar].image.src;
        img[pos_rotar].image.src=img_aux.src;
        pos_rotar=99;
        render(); 
        var imgs = document.getElementById("imgs");
        imgs.innerHTML="";
        for(var i = 0; i<img.length;i++){
            var crear = document.createElement("img");
            crear.setAttribute("src",img[i].image.src);
            crear.setAttribute("width",70);
            crear.setAttribute("height",70);
            crear.setAttribute("name",i);
            crear.setAttribute("id","img"+i);
            crear.setAttribute("onclick","rotar(this.name)");
            imgs.appendChild(crear);
        }
    }
};

//------------funcion para agrandar o encojer imagen------------

var zoom = function(nom){
    if (nom=="acercar"){
        if(flag==1){
            var pos = get("pos").value;
            img[pos].width+=img[pos].width*0.1;
            img[pos].height+=img[pos].height*0.1;
        }
        else if(flag2==1){
            var pos = get("pos").value;
            texto[pos].tam=parseInt(texto[pos].tam)+2;
            cargarWidth(pos);
        }
    	render();
    }
    else{
        if(flag==1){
            var pos = get("pos").value;
        	img[pos].width-=img[pos].width*0.1;
        	img[pos].height-=img[pos].height*0.1;
        	render();
        }
        else if(flag2==1){
            var pos = get("pos").value;
            texto[pos].tam=parseInt(texto[pos].tam)-2;
            cargarWidth(pos);
        }

        render();
    }
};

//-------------Desplazar imagenes con el mouse------------------

var dclick= function (event,id){
     rect = get(id).getBoundingClientRect();
    rect2 = get("canvas").getBoundingClientRect();
    flag=1;
    flag2=-1;
    flag4=-1;
    
    canvas_x = event.pageX-rect.left;
    canvas_y = event.pageY-rect.top;
    canvas_x1 = event.pageX-rect2.left;
    canvas_y1 = event.pageY-rect2.top;
    texto.forEach(function(item , index){
            if (item!=null){
                if( (canvas_x1>item.x1 && canvas_x1<item.x2) && (canvas_y1>item.y1 && canvas_y1<item.y2) ){
                    
                    get('texto').value=texto[index].texto;
                    get('tam').value=texto[index].tam;
                    get('letra').value=texto[index].letra;
                    get('color').value=texto[index].color;
                    get('alin').value=texto[index].alin;
                    get("text").setAttribute("onclick","editarTexto("+index+")");
                    abrir('myModal');
                }       
            }
        });
};

var mdown = function(event,id){
    rect = get(id).getBoundingClientRect();
    rect2 = get("canvas").getBoundingClientRect();
    flag=1;
    flag2=-1;
    flag4=-1;
    
    canvas_x = event.pageX-rect.left;
    canvas_y = event.pageY-rect.top;
    canvas_x1 = event.pageX-rect2.left;
    canvas_y1 = event.pageY-rect2.top;
	emoji.forEach(function(item , index){
            if (item!=null){
                if( (canvas_x1>item.x && canvas_x1<item.x+item.width) && (canvas_y1>item.y && canvas_y1<item.y+item.height) ){
                flag4 = index;
                flag=0;
                }       
            }
        });
        
        texto.forEach(function(item , index){
            if (item!=null){
                if( (canvas_x1>item.x1 && canvas_x1<item.x2) && (canvas_y1>item.y1 && canvas_y1<item.y2) ){
                flag2 = index;
                flag=0;
                }       
            }
        });
    flag3=1;
};

var mmove = function(event,id){
    if(flag3==1){
     	var num=0,str;
        str = id.split("");
     	num = str[1];
     	if(flag==1){ 
    	 	var x = event.pageX-rect.left;
       		var y = event.pageY-rect.top;
    		img[num].x+=x-canvas_x;
    		img[num].y+=y-canvas_y;
                canvas_x=x;
                canvas_y=y;
    		renderUnMeme(id);
        }
        else if(flag2!=-1){
            var x = event.pageX-rect2.left;
            var y = event.pageY-rect2.top;
            texto[flag2].x+=x-canvas_x1;
            texto[flag2].x1+=x-canvas_x1;
            texto[flag2].x2+=x-canvas_x1;
            texto[flag2].y+=y-canvas_y1;
            texto[flag2].y1+=y-canvas_y1;
            texto[flag2].y2+=y-canvas_y1;
            canvas_x1=x;
            canvas_y1=y;
//            renderUnMeme(id);
//            renderEmoji();
//            renderTexto(); 
            render();
       }   
        else if(flag4!=-1){ 
    	 	var x = event.pageX-rect2.left;
       		var y = event.pageY-rect2.top;
    		emoji[flag4].x+=x-canvas_x1;
    		emoji[flag4].y+=y-canvas_y1;
                canvas_x1=x;
                canvas_y1=y;
//                renderMeme();
//                renderEmoji();
//                renderTexto();
            render();
        }     
    }
};

 var mup = function(event){
    flag3=0;
   //e.c.removeEventListener("mousemove",mover(event));
};

var move = function(event){
    event.preventDefault();
};

//----Funcion para mover la imagen y el texto y hacer zoom a partir de touch--------------------

var tstart = function(event,id){
    document.body.addEventListener('touchmove',move(event), false);  
    var touch = null;
    rect = get(id).getBoundingClientRect();
    rect2 = get("canvas").getBoundingClientRect();
    if(event.targetTouches.length==1){
        touch = event.targetTouches[0];
        canvas_x = touch.pageX-rect.left;
        canvas_y = touch.pageY-rect.top;
        canvas_x1 = touch.pageX-rect2.left;
        canvas_y1 = touch.pageY-rect2.top;
        flag=1;
        flag2=-1;
        flag4=-1;
        emoji.forEach(function(item , index){
            if (item!=null){
                if( (canvas_x1>item.x && canvas_x1<item.x+item.width) && (canvas_y1>item.y && canvas_y1<item.y+item.height) ){
                flag4 = index;
                flag=0;
                }       
            }
        });
        
        texto.forEach(function(item , index){
            if (item!=null){
                if( (canvas_x1>item.x1 && canvas_x1<item.x2) && (canvas_y1>item.y1 && canvas_y1<item.y2) ){
                flag2 = index;
                flag=0;
                }       
            }
        });
    }
    else if(event.targetTouches.length==2){
        touch = event.targetTouches[0];
        toque[0]=touch.pageX-rect.left;
        toque[1]=touch.pageY-rect.top;
        touch = event.targetTouches[1];
        toque[2]=touch.pageX-rect.left;
        toque[3]=touch.pageY-rect.top;
    }
};

var tmove = function(event,id){
    var touch = null;
    var num=0,str;
    str = id.split("");
    num = str[1];

    if(event.targetTouches.length==1 && flag==1){
        touch = event.touches[0];
        var x = touch.pageX-rect.left;
        var y = touch.pageY-rect.top;
        img[num].x+=x-canvas_x;
        img[num].y+=y-canvas_y;
        canvas_x=x;
        canvas_y=y;
        renderUnMeme(id);
//        renderEmoji();
//        renderTexto();
    }
    else if(event.targetTouches.length==1 && flag4!=-1){
        touch = event.touches[0];
        var x = touch.pageX-rect2.left;
        var y = touch.pageY-rect2.top;
        emoji[flag4].x+=x-canvas_x1;
        emoji[flag4].y+=y-canvas_y1;
        canvas_x1=x;
        canvas_y1=y;
//        renderMeme();
//        renderEmoji();
//        renderTexto();
        render();

    }
    else if(event.targetTouches.length==1 && flag2!=-1){
        touch = event.touches[0];
        var x = touch.pageX-rect2.left;
        var y = touch.pageY-rect2.top;
        texto[flag2].x+=x-canvas_x1;
        texto[flag2].x1+=x-canvas_x1;
        texto[flag2].x2+=x-canvas_x1;
        texto[flag2].y+=y-canvas_y1;
        texto[flag2].y1+=y-canvas_y1;
        texto[flag2].y2+=y-canvas_y1;
        canvas_x1=x;
        canvas_y1=y;
//        renderMeme();
//        renderEmoji();
//        renderTexto();
        render();
    }           
    else if(event.targetTouches.length==2){
     	touch = event.targetTouches[0];
        toque[4]=touch.pageX-rect.left;
        toque[5]=touch.pageY-rect.top;
        touch = event.targetTouches[1];
        toque[6]=touch.pageX-rect.left;
        toque[7]=touch.pageY-rect.top;
        toque[8]=Math.abs(toque[0]-toque[2]);
        toque[9]=Math.abs(toque[1]-toque[3]);
        toque[10]=Math.abs(toque[4]-toque[6]);
        toque[11]=Math.abs(toque[5]-toque[7]);
        toque[0]=toque[4];
        toque[1]=toque[5];
        toque[2]=toque[6];
        toque[3]=toque[7];
        if( toque[8]<toque[10]*0.98 || toque[9]<toque[11]*0.98 ){
            if (flag==1) {            
                img[num].width=img[num].width*1.015;
                img[num].height=img[num].height*1.015;
            }
            else if (flag4!=-1) {            
                emoji[flag4].width=emoji[flag4].width*1.015;
                emoji[flag4].height=emoji[flag4].height*1.015;
            }
            else if(flag2!=-1){
                if(texto[flag2].tam<60){
                    texto[flag2].tam=parseInt(texto[flag2].tam)+2;
                    cargarWidth(flag2);
                }
            }
        }
        else if( toque[8]>toque[10]*1.02 || toque[9]>toque[11]*1.02 ){
            if(flag==1){
                toque[12]-=0.015;
                img[num].width=img[num].width*0.985;
                img[num].height=img[num].height*0.985;
            }
            else if(flag4!=-1){
                toque[12]-=0.015;
                emoji[flag4].width=emoji[flag4].width*0.985;
                emoji[flag4].height=emoji[flag4].height*0.985;
            }
            else if(flag2!=-1){
                if(texto[flag2].tam>12){
                    texto[flag2].tam=parseInt(texto[flag2].tam)-2;
                    cargarWidth(flag2);
                }

            }    
        }
//        renderMeme();
//        renderEmoji();
        render();
    }
};

var tend = function(event){
    document.body.removeEventListener('touchmove', move(event)); 
};

//--------------sirve para descargar la imagen del canvas------------------
/*e.downloadLink.onclick = function () {
	var zip = new JSZip();
	//var fd = new FormData(get("form"));
    var i = zip.folder("images");
  	var blob = dataURItoBlob(e.c.toDataURL("image/jpeg", 1.0));
    i.file("img.png", blob , {base64: true});
    zip.generateAsync({type:"blob"}).then(function(content){
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
};*/

var dataURItoBlob = function(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};

var girar = function(){
    var pos = get("pos").value;
    if((img[pos].grados+15)<360){
       img[pos].grados+=15; 
    }
    else{
        img[pos].grados=0;
    }
    
    renderMeme();
};

var eventos = function (id){
  if(get(id)!=null){
      get(id).onmousedown = function(event){
          mdown(event,id);
      };
      get(id).onmousemove = function(event){
          mmove(event,id);
      };
      get(id).onmouseup = function(event){
          mup(event);
      };
      
      get(id).ontouchstart = function(event){
          tstart(event,id);
      };
      get(id).ontouchmove = function(event){
          tmove(event,id);
      };
      get(id).ontouchend = function(event){
          tend(event);
      };
      get(id).ondblclick = function(event){
          dclick(event,id);
      };
  }  
};

var asignarHijoC = function (padre,id,ancho,alto,x,y){
    var hijo;
    hijo = document.createElement("canvas");
    hijo.setAttribute("id",id);
    hijo.setAttribute("class","canvas2");
    hijo.width=ancho;
    hijo.height=alto;
//    hijo.style.top=y;
//    hijo.style.left=x;
    hijo.setAttribute("style","top: "+y+"px; left: "+x+"px;");
    padre.appendChild(hijo);
};

var modificarCanvas = function (id,ancho,alto,x,y){
    var canvas = get(id);
    canvas.width=ancho;
    canvas.height=alto;
    canvas.removeAttribute("style");
    canvas.setAttribute("style","top: "+y+"px; left: "+x+"px;");
    asignarWH(id);
    
    
};

var asignarHijoP = function (padre,ancho,alto,cantidad,modelo,src){
    var hijo;
    hijo = document.createElement("img");
    hijo.width=ancho;
    hijo.height=alto;
    hijo.src=src;
    hijo.setAttribute("onclick","organizarCanvas("+cantidad+","+modelo+")");
    padre.appendChild(hijo);
};

var asignarAtras = function (padre,click){
    var hijo;
    hijo = document.createElement("img");
    hijo.width=40;
    hijo.height=40;
    hijo.src="img/iconos/ICO_atras.jpg";
    hijo.setAttribute("onclick",click);
    padre.appendChild(hijo);
};

var renderTexto = function (){
    texto.forEach(function (item){
        var x = item.x1,y=item.y1,x1=item.x2,y1=item.y2,can=[];
        can=validarCan(x,x1,y,y1);
        can.forEach(function (ite){
            var xy=[];
            //renderUnMeme(ite);
            xy = toCanvasXY(item.x,item.y,ite);
            ctxt = get(ite).getContext("2d");
            ctxt.textAlign = item.alin;
            ctxt.lineWidth=2;
            ctxt.font = "bold " + item.tam + "pt "+item.letra;
            ctxt.fillStyle=item.color;
            var con = item.texto.split("\n").length;
            if(con==1){
                ctxt.fillText(item.texto,xy[0],xy[1]);
                //ctxt.strokeText(texto[i].texto,texto[i].x,texto[i].y); 
            }
            if(con>1){
                var z = item.texto.split("\n");
                var hei=item.height/con;
                var sum=0;
                for(var j=0;j<con;j++){
                    ctxt.fillText(z[j],xy[0],xy[1]+sum);
                   // ctxt.strokeText(z[j],texto[i].x,texto[i].y+sum);
                    sum=parseInt(sum)+parseInt(hei);
                }           
            }
        });
    });
    if(marco!=null){
        renderMarco();
    }
};

var renderTextoXCanvas = function (id){
    texto.forEach(function (item){
        var x = item.x1,y=item.y1,x1=item.x2,y1=item.y2,can=[];
        can=validarCan(x,x1,y,y1);
        can.forEach(function (ite){
            if(ite==id){
                var xy=[];
                //renderUnMeme(ite);
                xy = toCanvasXY(item.x,item.y,ite);
                ctxt = get(ite).getContext("2d");
                ctxt.textAlign = item.alin;
                ctxt.lineWidth=2;
                ctxt.font = "bold " + item.tam + "pt "+item.letra;
                ctxt.fillStyle=item.color;
                var con = item.texto.split("\n").length;
                if(con==1){
                    ctxt.fillText(item.texto,xy[0],xy[1]);
                    //ctxt.strokeText(texto[i].texto,texto[i].x,texto[i].y); 
                }
                if(con>1){
                    var z = item.texto.split("\n");
                    var hei=item.height/con;
                    var sum=0;
                    for(var j=0;j<con;j++){
                        ctxt.fillText(z[j],xy[0],xy[1]+sum);
                       // ctxt.strokeText(z[j],texto[i].x,texto[i].y+sum);
                        sum=parseInt(sum)+parseInt(hei);
                    }           
                }
            }
        });
    });
    if(marco!=null){
        renderMarco();
    }
};

var organizarCanvas = function (cantidad,modelo){
    
    var padre = get("canvas"),ancho,alto;
    
    if(modelo==1){
        ancho=Math.round(padre.clientWidth/cantidad);
        alto=400;
        
        for (var i = 0; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,ancho*i,0);
            
            
        }//cirre for (var i = 0; i<cantidad;i++)
    }// cierre if(modelo==1)
    
    if(modelo==2){
        ancho=padre.clientWidth;
        alto=Math.round(padre.clientHeight/cantidad);
        for (var i = 0; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,0,alto*i);
        }//cirre for (var i = 0; i<cantidad;i++)
    }//cierre if(modelo==2)
    
    if( (cantidad>=3 && cantidad<=6) && modelo==3){
        ancho=padre.clientWidth;
        alto=Math.round(padre.clientHeight/2);
        modificarCanvas("c0",ancho,alto,0,0);
        
        ancho=Math.round(padre.clientWidth/(cantidad-1));
        for (var i = 1; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,ancho*(i-1),alto);
        }//cirre for (var i = 0; i<cantidad;i++)
    }// cierre if( (cantidad==3 || cantidad==5) && modelo==3)
    
    if((cantidad>=3 && cantidad<=6) && modelo==4){
        ancho=padre.clientWidth;
        alto=Math.round(padre.clientHeight/2);
        modificarCanvas("c0",ancho,alto,0,alto);
        
        ancho=Math.round(padre.clientWidth/(cantidad-1));
        for (var i = 1; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,ancho*(i-1),0);
            
        }//cirre for (var i = 0; i<cantidad;i++)
    }
    if(cantidad==3 && modelo==5){
        
        ancho=Math.round(padre.clientWidth/2);
        alto=padre.clientHeight;
        modificarCanvas("c0",ancho,alto,0,0);
        
        alto=Math.round(padre.clientHeight/2);
        for (var i = 1; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,ancho,alto*(i-1));
        }//cirre for (var i = 0; i<cantidad;i++)
    }//cierre if(cantidad==3 && modelo==5)
    
    if(cantidad==3 && modelo==6){
        ancho=Math.round(padre.clientWidth/2);
        alto=padre.clientHeight;
        modificarCanvas("c0",ancho,alto,ancho,0);
        
        alto=Math.round(padre.clientHeight/2);
        for (var i = 1; i<cantidad;i++){
            modificarCanvas("c"+i,ancho,alto,0,alto*(i-1));
        }//cirre for (var i = 0; i<cantidad;i++)
    }//cierre if(cantidad==3 && modelo==6)
    
    if(cantidad == 4 && modelo==5){
        ancho=padre.clientWidth;
        alto=Math.round(padre.clientHeight/2);
        var i=0;
            
        modificarCanvas("c"+i,ancho*0.65,alto,0,0);
        i++;
        modificarCanvas("c"+i,ancho*0.35,alto,ancho*0.65,0);
        i++;
        modificarCanvas("c"+i,ancho*0.35,alto,0,alto);
        i++;
        modificarCanvas("c"+i,ancho*0.65,alto,ancho*0.35,alto);

        
    }// cierre if(cantidad == 4 && modelo==5)
    
    if(cantidad == 4 && modelo==6){
        ancho=padre.clientWidth;
        alto=Math.round(padre.clientHeight/3);
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho/2,alto,0,alto);
        modificarCanvas("c2",ancho/2,alto,ancho/2,alto);
        modificarCanvas("c3",ancho,alto,0,alto*2);
        
        
    }//cierre if(cantidad == 4 && modelo==6)
    if(cantidad == 4 && modelo==7){
        ancho=padre.clientWidth;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho/2,alto,0,0);
        modificarCanvas("c1",ancho/2,alto,ancho/2,0);
        modificarCanvas("c2",ancho,alto,0,alto);
        modificarCanvas("c3",ancho,alto,0,Math.floor(alto*2));
    }
    if(cantidad == 4 && modelo==8){
        ancho=padre.clientWidth;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,0,alto);
        modificarCanvas("c2",ancho/2,alto,0,Math.floor(alto*2));
        modificarCanvas("c3",ancho/2,alto,ancho/2,Math.floor(alto*2));
    }
    if(cantidad == 4 && modelo==9){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho*2,alto,0,0);
        modificarCanvas("c1",ancho,alto*2,0,Math.floor(alto));
        modificarCanvas("c2",ancho,alto,ancho,Math.floor(alto));
        modificarCanvas("c3",ancho,alto,ancho,Math.floor(alto*2));
        
    }
    if(cantidad == 4 && modelo==10){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho*2,alto,0,0);
        modificarCanvas("c1",ancho,alto*2,ancho,Math.floor(alto));
        modificarCanvas("c2",ancho,alto,0,Math.floor(alto));
        modificarCanvas("c3",ancho,alto,0,Math.floor(alto*2));
    }
    if(cantidad == 4 && modelo==11){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto*2,0,0);
        modificarCanvas("c1",ancho,alto*2,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho*2,0);
        modificarCanvas("c3",ancho,alto,ancho*2,alto);
    }
    if(cantidad == 4 && modelo==12){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,0,alto);
        modificarCanvas("c2",ancho,alto*2,ancho,0);
        modificarCanvas("c3",ancho,alto*2,ancho*2,0);
    }
    if(cantidad == 4 && modelo==13){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto*2,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho,alto);
        modificarCanvas("c3",ancho,alto*2,ancho*2,0);
    }
    if(cantidad == 5 && modelo==5){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,0,alto);
        modificarCanvas("c2",ancho,alto*2,ancho,0);
        modificarCanvas("c3",ancho,alto,ancho*2,0);
        modificarCanvas("c4",ancho,alto,ancho*2,alto);
    }
    if(cantidad == 5 && modelo==6){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,0,alto-1);
        modificarCanvas("c3",ancho,alto,ancho,alto-1);
        modificarCanvas("c4",ancho*2,alto,0,alto*2-1);
    }
    if(cantidad == 5 && modelo==7){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,0,alto);
        modificarCanvas("c3",ancho,alto,ancho,alto);
        modificarCanvas("c4",ancho,alto*2,ancho*2,0);
    }
    if(cantidad == 5 && modelo==8){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho*2,alto,0,0);
        modificarCanvas("c1",ancho,alto,0,alto-1);
        modificarCanvas("c2",ancho,alto,ancho,alto-1);
        modificarCanvas("c3",ancho,alto,0,alto*2-1);
        modificarCanvas("c4",ancho,alto,ancho,alto*2-1);
    }
    if(cantidad == 5 && modelo==9){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/2;
        modificarCanvas("c0",ancho,alto*2,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho*2,0);
        modificarCanvas("c3",ancho,alto,ancho,alto);
        modificarCanvas("c4",ancho,alto,ancho*2,alto);
    }
    if(cantidad == 5 && modelo==10){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/4;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,0,alto);
        modificarCanvas("c2",ancho,alto,0,alto*2);
        modificarCanvas("c3",ancho,alto,0,alto*3);
        modificarCanvas("c4",ancho,alto*4,ancho,0);
    }
    if(cantidad == 5 && modelo==11){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/4;
        modificarCanvas("c0",ancho,alto*4,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho,alto);
        modificarCanvas("c3",ancho,alto,ancho,alto*2);
        modificarCanvas("c4",ancho,alto,ancho,alto*3);
    }
    if(cantidad == 5 && modelo==12){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho*2,alto,0,alto-1);
        modificarCanvas("c3",ancho,alto,0,alto*2-2);
        modificarCanvas("c4",ancho,alto,ancho,alto*2-2);
    }
    if(cantidad == 6 && modelo==5){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto/2,ancho,0);
        modificarCanvas("c2",ancho,alto/2,ancho,alto/2);
        modificarCanvas("c3",ancho,alto/3,ancho*2,0);
        modificarCanvas("c4",ancho,alto/3,ancho*2,alto/3-1);
        modificarCanvas("c5",ancho,alto/3+1,ancho*2,(alto/3)*2-1);
    }
    if(cantidad == 6 && modelo==6){
        ancho=padre.clientWidth/2;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto+1,0,alto-1);
        modificarCanvas("c3",ancho,alto+1,ancho,alto-1);
        modificarCanvas("c4",ancho,alto+1,0,alto*2-1);
        modificarCanvas("c5",ancho,alto+1,ancho,alto*2-1);
    }
    if(cantidad == 6 && modelo==7){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho*2,0);
        modificarCanvas("c3",ancho*2,alto*2+1,0,alto-1);
        modificarCanvas("c4",ancho,alto+1,ancho*2,alto-1);
        modificarCanvas("c5",ancho,alto,ancho*2,alto*2);
    }
    if(cantidad == 6 && modelo==8){
        ancho=padre.clientWidth;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho/2,alto+1,0,alto-1);
        modificarCanvas("c2",ancho/2,alto+1,ancho/2,alto-1);
        modificarCanvas("c3",ancho/3,alto,0,alto*2);
        modificarCanvas("c4",ancho/3,alto,ancho/3,alto*2);
        modificarCanvas("c5",ancho/3,alto,(ancho/3)*2,alto*2);
    }
    if(cantidad == 6 && modelo==9){
        ancho=padre.clientWidth;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho/3,alto,0,0);
        modificarCanvas("c1",ancho/3,alto,ancho/3,0);
        modificarCanvas("c2",ancho/3,alto,(ancho/3)*2,0);
        modificarCanvas("c3",ancho/2,alto+1,0,alto-1);
        modificarCanvas("c4",ancho/2,alto+1,ancho/2,alto-1);
        modificarCanvas("c5",ancho,alto,0,alto*2);
    }
    if(cantidad == 6 && modelo==10){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto,ancho,0);
        modificarCanvas("c2",ancho,alto,ancho*2,0);
        modificarCanvas("c3",ancho,alto+1,0,alto-1);
        modificarCanvas("c4",ancho,alto,0,alto*2);
        modificarCanvas("c5",ancho*2,alto*2+1,ancho,alto-1);
    }
    if(cantidad == 6 && modelo==11){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho*2,alto*2,0,0);
        modificarCanvas("c1",ancho,alto,ancho*2,0);
        modificarCanvas("c2",ancho,alto+1,ancho*2,alto-1);
        modificarCanvas("c3",ancho,alto,0,alto*2);
        modificarCanvas("c4",ancho,alto,ancho,alto*2);
        modificarCanvas("c5",ancho,alto,ancho*2,alto*2);
    }
    if(cantidad == 6 && modelo==12){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight/3;
        modificarCanvas("c0",ancho,alto,0,0);
        modificarCanvas("c1",ancho,alto+1,0,alto-1);
        modificarCanvas("c2",ancho,alto,0,alto*2);
        modificarCanvas("c3",ancho*2,alto*2,ancho,0);
        modificarCanvas("c4",ancho,alto,ancho,alto*2);
        modificarCanvas("c5",ancho,alto,ancho*2,alto*2);
    }
    if(cantidad == 6 && modelo==13){
        ancho=padre.clientWidth/3;
        alto=padre.clientHeight;
        modificarCanvas("c0",ancho,alto/3,0,0);
        modificarCanvas("c1",ancho,alto/3+1,0,alto/3-1);
        modificarCanvas("c2",ancho,alto/3,0,(alto/3)*2);
        modificarCanvas("c3",ancho,alto/2,ancho,0);
        modificarCanvas("c4",ancho,alto/2,ancho,alto/2);
        modificarCanvas("c5",ancho,alto,ancho*2,0);
    }
    render();

};

var asignarInput = function (cantidad){
    for(var i=0;i<cantidad;i++){
        get("c"+i).setAttribute("onclick","activarInput(this.id)");
    }
};

var plantillas = function (cantidad){
    var padre = get("tab-1"),hijo,color;
    padre.innerHTML="";
    asignarAtras(padre,"plantillasIni("+cantidad+")");
    if(cantidad == 1){
        for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
    if(cantidad == 2){
       for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
    if(cantidad == 3){
        for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
    if(cantidad == 4){
        for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
    if(cantidad == 5){
        for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
    if(cantidad == 6){
        for(var i = 1; i<=modelos[cantidad-1];i++){
            asignarHijoP(padre,40,40,cantidad,i,"img/plantilla/P"+cantidad+"-"+i+".svg");
        }
    }
};

var plantillasIni = function (num){
    var padre = get("tab-1"),hijo;
    padre.innerHTML="";
    for(var i=1;i<=6;i++){
    hijo = document.createElement("img");
    hijo.width=40;
    hijo.height=40;
    hijo.src="img/plantilla/P"+i+"-1.svg";
    if(i!=num){
        hijo.setAttribute("onclick","crearCanvas("+i+",1)");
    }
    else{
        hijo.setAttribute("onclick","plantillas("+i+")");
    }
    hijo.style.margin="2.5px";
    padre.appendChild(hijo);
    }
};

var crearCanvas = function (cantidad,modelo){
    var cant = cantCanvas();
    if(cant!=cantidad){
        if(img.length>0){
            get("modif").removeAttribute("onclick");
            get("modif").setAttribute("onclick","nuevoCanvas("+cantidad+","+modelo+")");
            get("info2").style.display="block";
        }
        else{
            nuevoCanvas(cantidad,modelo);
        }
    }
    else{
        organizarCanvas(cantidad,modelo);
    }
//    plantillas(cantidad);
    
};

var cantCanvas = function (){
    for(var i=0;i<=6;i++){
       if(get("c"+i)==null){
           return i;
       } 
    }
};

var nuevoCanvas= function (cantidad,modelo){
    borrartodo();
    for(var i=0;i<cantidad;i++){
        asignarHijoC(get("canvas"),"c"+i,0,0,0,0);
    }
    organizarCanvas(cantidad,modelo);
    asignarInput(cantidad);
    get("info2").style.display="none";
};

var renderEmoji = function (){
    
    emoji.forEach(function (item){
        var x=item.x, y=item.y, x1=item.x+item.width, y1=item.y+item.height,can=[];
        
            can=validarCan(x,x1,y,y1);
            can.forEach(function (ite){
                var xy=[];
                //renderUnMeme(ite,"emoji");
                xy = toCanvasXY(item.x,item.y,ite);
                ctxt = get(ite).getContext("2d");
                ctxt.drawImage(item.image, xy[0], xy[1],item.width,item.height); 
            });
    });
};

var renderEmojiXCanvas = function (id){
    emoji.forEach(function (item){
            var x=item.x, y=item.y, x1=item.x+item.width, y1=item.y+item.height,can=[];
            can=validarCan(x,x1,y,y1);
            can.forEach(function (ite){
                if(ite==id){
                   var xy=[];
                    renderUnMeme(ite);
                    xy = toCanvasXY(item.x,item.y,ite);
                    ctxt = get(ite).getContext("2d");
                    ctxt.drawImage(item.image, xy[0], xy[1],item.width,item.height); 
                }
            });
    });
};

var toCanvasXY = function (x,y,id){
    var xy=[],xyCan=[];
    xyCan=canvasXY(id);
    xy.push(x-xyCan[0]);
    xy.push(y-xyCan[1]);
    return xy;
};

var canvasXY = function (id){
    var x,x1,y,y1,xy=[];
    if(get(id)!=null){
            x=get(id).getBoundingClientRect().left-get("canvas").getBoundingClientRect().left;
            x1=x+get(id).width;
            y=get(id).getBoundingClientRect().top-get("canvas").getBoundingClientRect().top;
            y1=y+get(id).height;
            xy.push(x);
            xy.push(y);
            xy.push(x1);
            xy.push(y1);
        }
    return xy;
};

var validarCan = function (xx,xx1,yy,yy1){
    var can=[],xy=[];
    
    for(var i=0;i<6;i++){
        if(get("c"+i)!=null){
            xy=canvasXY("c"+i);
            if(validarInter(xy[0],xy[2],xy[1],xy[3],xx,xx1,yy,yy1)){
                can.push("c"+i);
            }  
        }
    }

    return can;
};

var x = function (x,x1,y,y1,v,v1,z,z1){
    
    if(x<=v+(v1/2) && x1>=v+(v1/2) && y<=z+(z1/2) && y1>=z+(z1/2)){
        return true;
    }
    
    if(x<=v && x1>=v && y<=z && y1>=z){
        return true;
    }
    
    if(x<=v && x1>=v && y<=z1 && y1>=z1){
        return true;
    }
    
    if(x<=v1 && x1>=v1 && y<=z && y1>=z){
        return true;
    }
    
    if(x<=v1 && x1>=v1 && y<=z1 && y1>=z1){
        return true;
    }
    
    if(v<=x+(x1/2) && v1>=x+(x1/2) && z<=y+(y1/2) && z1>=y+(y1/2)){
        return true;
    }
    
    if(v<=x && v1>=x && z<=y && z1>=y){
        return true;
    }
    
    if(v<=x && v1>=x && z<=y1 && z1>=y1){
        return true;
    }
    
    if(v<=x1 && v1>=x1 && z<=y && z1>=y){
        return true;
    }
    
    if(v<=x1 && v1>=x1 && z<=y  && z1>=y1){
        return true;
    }
    
    return false;
};

var incluiremoji = function (src){
    if(restri()){
    var pos = emoji.length;
        if(pos<6){
            emoji.push(new Foto());
            emoji[pos].image.src=src;
            emoji[pos].x=5;
            emoji[pos].y=5;
            emoji[pos].width=100;
            emoji[pos].height=100;
            renderEmoji(); 
        }
    } 
};

var cargarMarco = function (src){
    if(val()){
    marco=new Foto();
    marco.image.src=src;
    marco.image.onload = function (){
    marco.x=0;
    marco.y=0;
    marco.width=get("canvas").clientWidth;
    marco.height=get("canvas").clientHeight;
        render();
    renderMarco();
    };
    }
};

var eliminarMarco = function (){
    marco=null;
    render();
    renderMarco();
};

var renderMarco= function (){
    var x=marco.x, y=marco.y, x1=marco.x+marco.width, y1=marco.y+marco.height,can=[];
        
            can=validarCan(x,x1,y,y1);
            can.forEach(function (ite){
                var xy=[];
                //renderUnMeme(ite);
                xy = toCanvasXY(marco.x,marco.y,ite);
                ctxt = get(ite).getContext("2d");
                ctxt.drawImage(marco.image, xy[0], xy[1],marco.width,marco.height); 
            });
};

var render = function (){
    renderMeme();
    if(emoji!=null){
        renderEmoji();
    }
    if(texto!=null){
        renderTexto();
    }
    if (marco!=null){
        renderMarco();
    }
};

var cargarFiltro = function (id,fil){
    
    if(restri()){
        get("cargando").style.display="block";
        if(fil=="bw"){
            filtroBW("c0");
        }
        if(fil=="invert"){
            filtroInvert("c0");
        }
        if(fil=="sepia"){
            filtroSepia("c0");
        }
        if(fil=="contrast"){
            filtroContrast("c0");
        }
    }
        

};

var restri = function (){
    for(var i=0;i<6;i++){
        if(get("c"+i)!=null){
            if(img[i]==null){
                return false;
            }
        }
    }
    return true;
};

var filtroBW = function (id){
    var i,str,w,h;
    str = id.split("");
    i=str[1];
    
    filtro[i] = new Image();
    w=get(id).width;
    h=get(id).height;
    get(id).width=img[i].width;
    get(id).height=img[i].height;
    ctxt = get(id).getContext("2d");
    ctxt.clearRect(0, 0, img[i].width, img[i].height);
    ctxt.drawImage(img[i].image, 0, 0,img[i].width,img[i].height);
    var datos=ctxt.getImageData(0,0,img[i].width,img[i].height);
    for(var j = 0; j< (datos.width*datos.height); j++){
            var promedio = Math.round((datos.data[j*4]
                    +datos.data[j*4+1]
                    +datos.data[j*4+2])/3);
            datos.data[j*4]=promedio;
            datos.data[j*4+1]=promedio;
            datos.data[j*4+2]=promedio;
    }
    ctxt.putImageData(datos,0,0);
    filtro[i].src=get(id).toDataURL();
    filtro[i].onload = function () {
        img[i].filtro= true;
        get(id).width=w;
        get(id).height=h;
        i++;
        for(i;i<=6;i++){
            if(get("c"+i)!=null){
                filtroBW("c"+i);
                i=7;
            }
        }
        if(i==7){
           render();
           get("cargando").style.display="none";
        }
        
    };
};

var filtroInvert = function (id){
    var i,str,w,h;
    str = id.split("");
    i=str[1];
    filtro[i] = new Image();
    w=get(id).width;
    h=get(id).height;
    get(id).width=img[i].width;
    get(id).height=img[i].height;
    ctxt = get(id).getContext("2d");
    ctxt.clearRect(0, 0, img[i].width, img[i].height);
    ctxt.drawImage(img[i].image, 0, 0,img[i].width,img[i].height);
    var datos=ctxt.getImageData(0,0,img[i].width,img[i].height);
    
    for (var j = 0; j< (datos.width*datos.height); j++) {
        var r = datos.data[ j * 4 ];
        var g = datos.data[ j * 4 + 1 ];
        var b = datos.data[ j * 4 + 2 ];
 
        datos.data[ j * 4 ] = 255 - r;
        datos.data[ j * 4 + 1 ] = 255 - g;
        datos.data[ j * 4 + 2 ] = 255 - b;
    }
    
    ctxt.putImageData(datos,0,0);
    filtro[i].src=get(id).toDataURL();
    filtro[i].onload = function () {
        img[i].filtro= true;
        get(id).width=w;
        get(id).height=h;
        i++;
        for(i;i<=6;i++){
            if(get("c"+i)!=null){
                filtroInvert("c"+i);
                i=7;
            }
        }
        if(i==7){
           render();
           get("cargando").style.display="none";
        }
    };
};

var filtroSepia = function (id){
    var i,str,w,h;
    str = id.split("");
    i=str[1];
    filtro[i] = new Image();
    w=get(id).width;
    h=get(id).height;
    get(id).width=img[i].width;
    get(id).height=img[i].height;
    ctxt = get(id).getContext("2d");
    ctxt.clearRect(0, 0, img[i].width, img[i].height);
    ctxt.drawImage(img[i].image, 0, 0,img[i].width,img[i].height);
    var datos=ctxt.getImageData(0,0,img[i].width,img[i].height);
    
    for (var j = 0; j< (datos.width*datos.height); j++) {
        var r = datos.data[ j * 4 ];
        var g = datos.data[ j * 4 + 1 ];
        var b = datos.data[ j * 4 + 2 ];
 
        datos.data[ j * 4 ] = 255 - r;
        datos.data[ j * 4 + 1 ] = 255 - g;
        datos.data[ j * 4 + 2 ] = 255 - b;
 
        datos.data[ j * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        datos.data[ j * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        datos.data[ j * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    
    ctxt.putImageData(datos,0,0);
    filtro[i].src=get(id).toDataURL();
    filtro[i].onload = function () {
        img[i].filtro= true;
        get(id).width=w;
        get(id).height=h;
        i++;
        for(i;i<=6;i++){
            if(get("c"+i)!=null){
                filtroSepia("c"+i);
                i=7;
            }
        }
        if(i==7){
           render();
           get("cargando").style.display="none";
        }
    };
};

var filtroContrast = function (id){
    var i,str,w,h;
    str = id.split("");
    i=str[1];
    filtro[i] = new Image();
    w=get(id).width;
    h=get(id).height;
    get(id).width=img[i].width;
    get(id).height=img[i].height;
    ctxt = get(id).getContext("2d");
    ctxt.clearRect(0, 0, img[i].width, img[i].height);
    ctxt.drawImage(img[i].image, 0, 0,img[i].width,img[i].height);
    var datos=ctxt.getImageData(0,0,img[i].width,img[i].height);
    
    var contrast=100;
    
    var factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );
    
    for (var j = 0; j< (datos.width*datos.height); j++) {
        var r = datos.data[ j * 4 ];
        var g = datos.data[ j * 4 + 1 ];
        var b = datos.data[ j * 4 + 2 ];
 
        datos.data[ j * 4 ] = factor * ( r - 128 ) + 128;
        datos.data[ j * 4 + 1 ] = factor * ( g - 128 ) + 128;
        datos.data[ j * 4 + 2 ] = factor * ( b - 128 ) + 128;
    }
    
    ctxt.putImageData(datos,0,0);
    filtro[i].src=get(id).toDataURL();
    filtro[i].onload = function () {
        img[i].filtro= true;
        get(id).width=w;
        get(id).height=h;
        i++;
        for(i;i<=6;i++){
            if(get("c"+i)!=null){
                filtroContrast("c"+i);
                i=7;
            }
        }
        if(i==7){
           render();
           get("cargando").style.display="none";
        }
    };
};

var eliminarFiltro = function (){
  img.forEach(function (item){
      item.filtro=false;
  });  
    render();
};

var dataURItoBlob = function(dataURI,ext) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/'+ext});
};

var validarInter = function (x,x1,y,y1,v,v1,z,z1){
    if( (v1<x) || v>x1 ){
        return false;
    }
    else if((z1<y) || (z>y1)){
        return false;
    }
    else if( (x1<v) || x>v1 ){
        return false;
    }
    else if((y1<z) || (y>z1)){
        return false;
    }
    return true;
};

var guardar = function (){
    get("cargando").style.display="block";
    var padre = get("canvas");
    var hijo,datos,x=[],y=[];
    
    hijo = document.createElement("canvas");
    hijo.setAttribute("id","c6");
    hijo.setAttribute("class","canvas2");
    hijo.width=padre.clientWidth;
    hijo.height=padre.clientHeight;
    hijo.setAttribute("style","top: 0px; left: 0px;");
    padre.appendChild(hijo);
    var ctxtC = get("c6").getContext("2d");
    for(var i=0 ; i <=5 ; i++){
        if(get("c"+i)!=null){
        ctxt = get("c"+i).getContext("2d");
        datos=ctxt.getImageData(0,0,get("c"+i).width,get("c"+i).height);
        x=get("c"+i).style.left.split("px");
        y=get("c"+i).style.top.split("px");
        ctxtC.putImageData(datos,x[0],y[0]);
        get("c"+i).style.display="none";
        }
    }
    var image = get("image");
    var ima = new Image();
    ima.id="ima";
    ima.setAttribute("alt","");
    image.appendChild(ima);
    ima.src=get("c6").toDataURL("image/jpeg", 1.0);
    
    ima.onload = function (){
        get("step2").style.display="none";
        get("step3").style.display="block";
        get("cargando").style.display="none";
    };
    
    
    
};

 var val = function (){
     var i=0;
   do{
        if(img[i]==null){
            return false;
        }
       i++;
   }while(get("c"+i)!=null);
   return true;
 };
 
 var categoria = function (list,site){
     list.forEach(function (item){
         get("s"+item).style.display="none";
     });
     get("s"+site).style.display="block";
 };
 
         var add = function (){
    var s = get("sites"); 
    var c=get("s"+s.value);
    if(get("c"+s.value+c.value)==null){
    var select = document.createElement("select"),li = document.createElement("li"), 
            div = document.createElement("div"),label=document.createElement("label"),
            option=document.createElement("option"),div2;
    
    div.setAttribute("class","col-6 pr10");
    label.setAttribute("class","input-label");
//    select.id="ss"+s.value;
   
    option.value=s.value;
    s.childNodes.forEach(function(item){
        if(item.value==s.value){
            option.innerHTML=item.innerHTML;
        }
    });
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);
    li.appendChild(div);
    
    select = document.createElement("select"); 
            div = document.createElement("div");label=document.createElement("label");
            option=document.createElement("option");
    
    div.setAttribute("class","col-6 pl10");
    label.setAttribute("class","input-label");
//    select.id="c"+c.value;
 li.id="c"+s.value+c.value;
    option.value=c.value;
    select.setAttribute("name","cate-"+c.value);
    c.childNodes.forEach(function(item){
        if(item.value==c.value){
            option.innerHTML=item.innerHTML;
        }
    });
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);
    li.appendChild(div);
    div=document.createElement("div");
    div.setAttribute("class","remove-button");
    div.setAttribute("onclick","remove("+s.value+c.value+")");
    div.innerHTML="-";
    li.appendChild(div);
    get("datos").appendChild(li);
    get("flag").value+=1;
}
 };
 
   var remove = function (c){
    var ca=get("c"+c);
    ca.parentNode.removeChild(ca);
    get("flag").value-=1;
 };

 var editar = function (){
    get("cargando").style.display="block";
    get("ima").parentNode.removeChild(get("ima"));
    for(var i=0 ; i <=5 ; i++){
         if(get("c"+i)!=null){
         get("c"+i).style.display="block";
         }
    }
    get("c6").parentNode.removeChild(get("c6"));
    get("step2").style.display="block";
    get("step3").style.display="none";
    get("cargando").style.display="none";
 };
 
var enviar = function (event){
    event.preventDefault();
    if(get("titulo").value!="" && get("titulo").value!=null){
    if(get("flag").value>0){
        get("cargando2").style.display="block";
        var fd = new FormData(get("form"));
        get("titulo").value.replace("ñ","&#241;");
        get("titulo").value.replace("Ñ","&#209;");
        var titulo="",des="",i=0,aux;
        aux=get("titulo").value;
        for(i=0;i<get("titulo").value.length;i++){
            if(titulo!=""){
            titulo=titulo+","+aux.charCodeAt(i);
            }else{
                titulo=aux.charCodeAt(i);
            }
        }
        aux=get("descripcion").value;
        for(i=0;i<get("descripcion").value.length;i++){
            if(des!=""){
            des=des+","+aux.charCodeAt(i); 
            }
            else{
                des=aux.charCodeAt(i);
            }
        }
        var blob = dataURItoBlob(get("c6").toDataURL("image/jpeg", 1.0),"jpeg");
        fd.append("imagen", blob,get("titulo").value+".jpeg");
        fd.append("titulo2", titulo);
        fd.append("desc", des);
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                get("cargando2").style.display="none";
                get("cont").innerHTML=this.responseText;
                get("resp").style.display="block";
            }
            if(this.readyState == 4 && this.status != 200){
                get("cargando2").style.display="none";
                alertify.log("Error: "+ this.status+"\n"+this.responseText);
            }
        };
        xhr.open('POST','salvar.jsp',true);
        xhr.send(fd);
    }
    else{
        alertify.log("Debe asignar al menos un site y categoria");
    }
    }
    else{
        alertify.log("Debe asignar un titulo");
    }
};

var dataURItoBlob = function(dataURI,ext) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/'+ext});
};

var reload = function (){
    location.reload();
};

var valCategoria = function (flag){
    if(flag==0){
        get("info").style.display="block";
    }
};