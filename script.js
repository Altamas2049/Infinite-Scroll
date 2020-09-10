const imageContainer = document.getElementById('image-Container');
const loader = document.getElementById('loader')
let ready =false;
let imagesLoaded=0;
let totalImages=0;

//PhotosArray 
let photosArray=[];


// UNsplash API 
const count=10;
const apikey='dm9XpAqDL_TgVStxC2vICRrprnie3aOU64GotTsrwKA';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded=== totalImages){
    ready=true;
    loader.hidden=true;
  }
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }


//Create Element for links & Photos , ADD to DOM
function displayPhotos(){
  imagesLoaded=0;
  totalImages= photosArray.length;
    //Run function forEach object in photosArray
    photosArray.forEach((photo)=>{
        // Create <a> to link to unsplash
    const item = document.createElement('a');
        // item.setAttributes('href', photo.links.html);
        //item.setAttributes('target','_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
     //img.setAttributes('src',photo.urls.regular);
        //img.setAttributes('alt',photo.alt_description);
        //img.setAttributes('title',photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listner , check when each is finished loading
    img.addEventListener('load',imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get Photos from Unsplash API
 async function getPhotos(){
     try{
        const response =await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
     }catch(error){
        //Catch Error
     }
 }

 //Check to see if Scrolling near bottom of page, load More Photos
 window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
      //console.log('window.innerHeight:', window.innerHeight);
      //console.log('window.scrollY:',window.scrollY);
      //console.log('window.innerHeight+scrollY', window.scrollY+window.innerHeight);
      //console.log('document.body.offsetHeight-1000',document.body.offsetHeight-1000);
      getPhotos();
      ready=false;
    }
 });

//onLoad
 getPhotos();






