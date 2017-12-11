var Observable = require("data/observable").Observable;
var fromObject = require("data/observable").fromObject;
var ObservableArray = require("data/observable-array").ObservableArray;

function createViewModel() {
    var viewModel = new Observable();

    viewModel.items = new ObservableArray([]);

    return viewModel;
}

exports.createViewModel = createViewModel;