'use strict';
// model part
var data = {
	current: 0,
	adminMode: false,
	photoGal: [{
			name: 'Chester #1',
			count: 0,
			url: 'images/ches1.png'
		},{
			name: 'Chester #2',
			count: 0,
			url: 'images/ches2.png'
		},{
			name: 'Chester #3',
			count: 0,
			url: 'images/ches3.png'
		},{
			name: 'Chester #4',
			count: 0,
			url: 'images/ches4.png'
		},{
			name: 'Chester #5',
			count: 0,
			url: 'images/ches5.png'
		}]
};

// view part view1
var view1 = {
	init: function() {
		var unList = document.getElementById('uList');
		var photos = octopus.getPhotos();
		for(var i=0, len=photos.length; i<len; i++) {
			var li = document.createElement('li');
			li.innerHTML='<img src="'+photos[i].url+'">';
			li.addEventListener('click', (function(icopy){
				return function(){
					octopus.setCurrent(icopy);
					view2.render(photos[icopy]);
				};
			})(i));
			unList.appendChild(li);
		}
	}
};
// view part view2
var view2 = {
	init: function() {
		this.curP = octopus.getPhotos();
		this.details=document.getElementById('details');
		this.render();
		var clickObj = document.getElementById('clickObj');
		clickObj.addEventListener('click', function(){
			view2.curP[octopus.getCurrent()].count++;
			view2.render();
		});
		var admin=document.getElementById('administor');
		admin.addEventListener('click', function(){
			octopus.setAdmin(true);
			view2.render();
		});
		var cancel=document.getElementById('cancel');
		cancel.addEventListener('click', function(){
			octopus.setAdmin(false);
			view2.render();
		});
		var save=document.getElementById('save');
		var name=document.getElementById('name');
		var url=document.getElementById('url');
		var clicknum=document.getElementById('clicknum');
		save.addEventListener('click', function(){
			octopus.setPhoto(name.value, url.value, clicknum.value);
			name.value='';
			url.value='';
			clicknum.value='';
			octopus.setAdmin(false);
			view2.render();
		});
	},
	render: function() {
		var header = document.getElementById('contHeader');
		var imgSrc = document.getElementById('clickObj');
		var result = document.getElementById('result');
		var photo=octopus.getPhotos()[octopus.getCurrent()];
		header.innerHTML=photo.name;
		imgSrc.src=photo.url;
		if(photo.count===0)
			result.innerHTML='click the photo.';
		else
			result.innerHTML='the photo has been clicked '+photo.count+' times.';
		if(octopus.getAdmin()===false)
			this.details.style.display='none';
		else
			this.details.style.display='block';

	}
}

// octopus part
var octopus = {
	getCurrent: function(){
		return data.current;
	},
	setCurrent: function(num){
		data.current = num;
	},
	getPhotos: function(){
		return data.photoGal;
	},
	getAdmin: function(){
		return data.adminMode;
	},
	setAdmin: function(mode){
		data.adminMode=mode;
	},
	setPhoto: function(n, u, c){
		if(n!=='')
			data.photoGal[data.current].name=n;
		if(c!=='')
			data.photoGal[data.current].count=parseInt(c);
		if(u!=='')
			data.photoGal[data.current].url=u;
	},
	init: function(){
		
		view1.init();
		view2.init();
	},
	
};
octopus.init();

