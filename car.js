//variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();
// console.log("hello how r you");
//eventlisteners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        //create the <option> for the years

        html.displayYears();
    });
    //when th form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        //read the values from the form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        console.log(make);
        console.log(year);
        //read the radio button
        const level = document.querySelector('input[name="level"]:checked').value;
        //check that all the fields have something
        if (make === '' || year === '' || level === '') {
            html.displayError('all the fields are necessary');
        } else {
            // console.log('alright');
            //clear the preview quotes: 
            const prevResult = document.querySelector('#result div');
            if (prevResult != null) {
                prevResult.remove();
            }
            //make the quotation
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);
            //print the result from HTMLUI();
            html.showResult(price, insurance);

        }
    });

}

//objectPosition: 

//everything written related to the quotaion in the calculatin of insurance
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;

}
//calculate the price for current qutataion
Insurance.prototype.calculateQuotation = function(insurance) {
    let price;
    const base = 2000;

    //get the make
    const make = insurance.make;
    /*
    1 = america 15%
    2 = asian 5%
    3 = European 35% 
     */
    switch (make) {
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
            // console.log(price);

    }
    //getting the year
    const year = insurance.year;
    // console.log(year);
    const difference = this.getYearDifference(year);
    //get the years difference
    console.log(difference);
    //each year the cost of the insurance i s going to be cheaper
    price = price - ((difference * 3) * price) / 100;
    console.log(price);

    //check the level of protection
    const level = insurance.level;
    price = this.calculateLevel(price, level);
    return price;
}
Insurance.prototype.calculateLevel = function(price, level) {
        /* basic insurance is going to increase the value by 20 %  and the complete insurance is going to be increase the value by 50 % 
         */
        console.log(level);
        if (level === 'basic') {
            price = price * 1.30;

        } else {
            price = price * 1.50;
        }
        return price;
    }
    //return the difference between year
Insurance.prototype.getYearDifference = function(year) {
        return new Date().getFullYear() - year;
    }
    //add the value on the basis of level
Insurance.prototype.getLevel = function(level) {

}

function HTMLUI() {}
//displays the latest  20 years 
HTMLUI.prototype.displayYears = function() {
        //max and min years
        const max = new Date().getFullYear(), //getFullyear is the function in javaScript who will return the local time of the year
            min = max - 20;
        //generate the list of 20 years 
        const selectYears = document.getElementById('year');
        //print the values
        for (let i = max; i >= min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYears.appendChild(option);

        }
    }
    //prints the error
HTMLUI.prototype.displayError = function(message) {
        //create <div>
        const div = document.createElement('div');
        div.classList = 'error';
        //insert the message
        div.innerHTML = `< p > ${message} < /p>`;
        form.insertBefore(div, document.querySelector('.form-group'));
        //remove the error
    }
    //print there result in the HTML
HTMLUI.prototype.showResult = function(price, insurance) {
    //print the result
    const result = document.getElementById('result');
    //create a div with the result
    const div = document.createElement('div');
    let make = insurance.make;
    // console.log(make);
    switch (make) {
        case '1':
            make = 'America';
            break;
        case '2':
            make = 'Asian';
            break;
        case '1':
            make = 'European';
            break;

    }
    //insert this into the HTML
    div.innerHTML = `
    <p class="header">Summary</p>
    <p>Make: ${make}</p>
    <p>year:${insurance.year}</p>
    <p> level: ${insurance.level}</p>  
    <p class="total">Total:$ ${price}</p>`;
    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';
    setTimeout(function() {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 3000);


}