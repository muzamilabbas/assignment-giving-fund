function donationWidget(){
    this.mainContainer= '.donation-widget',
    this.priceInput= '.price-input',
    this.donorCount= '.donor-count',
    this.mainContainer= '.donation-widget',
    this.donationSymbol= '.donation-symbol',
    this.donationRemaining= '.donation-remaining',
    this.progressBar= '.progress-bar',
    this.daysRemaining= '.days-remaining'
}

function bindData(data,donationObject){
    $(donationObject.mainContainer).find(donationObject.donorCount).text(data.donorCount);
    $(donationObject.mainContainer).find(donationObject.donationSymbol).text(data.donationSymbol);
    var donationRemaining = data.budget - data.donationCollected;
    $(donationObject.mainContainer).find(donationObject.donationRemaining).text(data.budget - data.donationCollected);
    $(donationObject.mainContainer).find(donationObject.priceInput).attr('max',donationRemaining);
    
    $(donationObject.mainContainer).find(donationObject.progressBar).css('width',((data.donationCollected / data.budget ) * 100)+'%');
    $(donationObject.mainContainer).find(donationObject.progressBar).css('width',((data.donationCollected / data.budget ) * 100)+'%');
    var start = moment(new Date(data.lastDate), "YYYY-MM-DD");
    var end = moment(new Date(), "YYYY-MM-DD");
    $(donationObject.mainContainer).find(donationObject.daysRemaining).text(Math.round(moment.duration(start.diff(end)).asDays()));
}

function saveData(data){
    localStorage.setItem('donation',JSON.stringify(data));
}
function getData(){
    return JSON.parse(localStorage.getItem('donation'));
}

$(document).ready(function(){
    var defaultData = {
        "budget":300,
        "donationSymbol": "$",
        "donorCount": 42,
        "donationCollected": 150,
        "lastDate":"03/20/2019"
    };
    var donationObject = new donationWidget();
    var data = getData();
    if(!localStorage.getItem('donation')){
        saveData(defaultData);
        data = getData();
        bindData(data,donationObject);

    }
    else{
        bindData(data,donationObject);
    }

    $('#donation-form').on('submit',function(){
        if($(donationObject.mainContainer).find(donationObject.priceInput).val() > 0){
            data.donorCount = data.donorCount + 1;
            data.donationCollected = (+$(donationObject.mainContainer).find(donationObject.priceInput).val()) + (+data.donationCollected);
            saveData(data);
            bindData(data,donationObject);
            console.log(getData());
        }
        else{
            alert('Please enter some amount');
        }
    })

    
})