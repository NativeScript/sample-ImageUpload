var Observable = require("data/observable").Observable;
var mainViewModel = require("./main-page").mainViewModel; 

var imageSource = require("image-source");
var fs = require("file-system");

function navigatedTo(args) {
    var page = args.object;
    console.log(args.context);
    var selectedImage = args.context;
    
    page.bindingContext = new Observable({
        name: selectedImage.imageName,
        image: null // This will generate get/set for image that notify on property changes
    });
    
    selectedImage.getImage({ maxWidth: 600, maxHeight: 800}).then(function(imageSource) {
        console.log("Retrieved image: " + imageSource);
        page.bindingContext.image = imageSource;
    }).catch(function(e) {
        console.log("Error: " + e);
        console.log(e.stack);
    });
    
    
    
    // var current = mainViewModel.get('selectedItem');
    
    // console.log(current.uri);
    // console.log(current.fileUri);
    // console.log(current.imageName);
}

exports.navigatedTo = navigatedTo;