
module.exports = class Calc {
    constructor(__GET) {
        let __class = this;
        __class.container = document.getElementById('calc');

        __class.result = document.getElementById('result');
        __class.result.style.display = 'none';

        let selects = document.querySelectorAll('[data-calc_city]');
        let btnChange = document.querySelector('[data-calc_change]');
        btnChange.style.display = 'none';
        let input = document.querySelector('[data-calc_weight]');
        let btnCalc = document.querySelector('[data-calc_btn]');
        let btnBack = document.querySelector('[data-calc_btnBack]');
        let resultInfoCity = document.querySelector('[data-calc_infoCity]');
        let resultInfoWeight = document.querySelector('[data-calc_infoWeight]');
        let resultPrice = document.querySelector('[data-calc_price]');

        let hiddenInputWeight = document.querySelector('[data-calc_hiddenInputWeight]');
        let hiddenInputPrice = document.querySelector('[data-calc_hiddenInputPrice]');
        let hiddenInputInfo = document.querySelector('[data-calc_hiddenInputInfo]');

        __class.selectsArray = [];

        selects.forEach(function(item, i) {
            let data = item.dataset.calc_city;
            __class.selectsArray[i] = __class.getCityArray(data);

            if (__GET['group']) {
                __class.multyland = __GET['group'].split('-');
                if (__class.multyland.length > 2) {
                    // __class.multyland[0] = __class.multyland[0];

                    let newMultyLand = '';
                    
                    for (let w = 1; w <= __class.multyland.length; w++) {
                        if (__class.multyland[w] != undefined) {
                            if (newMultyLand != '') {
                                newMultyLand = newMultyLand + '-' + __class.multyland[w];
                            } else {
                                newMultyLand = __class.multyland[w];
                            }
                        }
                    }

                    __class.multyland[1] = newMultyLand;
                }
                
                __class.fillSelect(__class.selectsArray[i], item, false, false, __class.multyland[i]);
            } else {
                __class.fillSelect(__class.selectsArray[i], item, false, false);
            } 
            
            if (item.options.selectedIndex != 0) {
                btnChange.style.display = 'block';
            }
        })

        selects[0].onchange = (e) => {
            if (e.target.selectedIndex != 0 && !__class.selectsArray[0][e.target.selectedIndex - 1].option) {
                __class.fillSelect(__class.selectsArray[0], selects[0], e.target.selectedIndex - 1);
                __class.fillSelect(__class.selectsArray[1], selects[1], e.target.selectedIndex, true);
            } else {
                __class.fillSelect(__class.selectsArray[0], selects[0], e.target.selectedIndex - 1, true);
                __class.fillSelect(__class.selectsArray[1], selects[1], e.target.selectedIndex);
            } 

            btnChange.style.display = 'block';
        }

        selects[1].onchange = (e) => {
            if (e.target.selectedIndex != 0 && !__class.selectsArray[1][e.target.selectedIndex - 1].option) {
                __class.fillSelect(__class.selectsArray[1], selects[1], e.target.selectedIndex - 1);
                __class.fillSelect(__class.selectsArray[0], selects[0], e.target.selectedIndex, true);
            } else {
                __class.fillSelect(__class.selectsArray[1], selects[1], e.target.selectedIndex - 1, true);
                __class.fillSelect(__class.selectsArray[0], selects[0], e.target.selectedIndex);
            } 

            btnChange.style.display = 'block';
        }

        btnChange.onclick = (e) => {
            let selectOneSelectedIndex = selects[0].options.selectedIndex;
            let selectTwoSelectedIndex = selects[1].options.selectedIndex;
            let selectOneIndex = selects[0].options[selectOneSelectedIndex].dataset.index;
            let selectTwoIndex = selects[1].options[selectTwoSelectedIndex].dataset.index;

            if (selectTwoSelectedIndex != 0 && __class.selectsArray[1][selectTwoIndex].option) {
                __class.fillSelect(__class.selectsArray[1], selects[0], selectTwoSelectedIndex, true);
            } else {
                __class.fillSelect(__class.selectsArray[1], selects[0], selectTwoSelectedIndex - 1);
            }

            if (selectOneSelectedIndex != 0 && __class.selectsArray[0][selectOneIndex].option) {
                __class.fillSelect(__class.selectsArray[0], selects[1], selectOneSelectedIndex, true);
            } else {
                __class.fillSelect(__class.selectsArray[0], selects[1], selectOneSelectedIndex - 1);
            }
        }

        btnCalc.onclick = (e) => {
            let selectOneSelectedIndex = selects[0].options.selectedIndex;
            let selectTwoSelectedIndex = selects[1].options.selectedIndex;
            let selectOneIndex = selects[0].options[selectOneSelectedIndex].dataset.index;
            let selectTwoIndex = selects[1].options[selectTwoSelectedIndex].dataset.index;

            let weight = input.value;

            if (selectOneSelectedIndex != 0 && selectTwoSelectedIndex != 0 && weight >= 30) {
                let priceOne = __class.selectsArray[0][selectOneIndex].price;
                let priceTwo = __class.selectsArray[0][selectTwoIndex].price;

                let price = weight * (priceOne + priceTwo);
                resultPrice.innerHTML = price + ' руб.';

                resultInfoCity.innerHTML = selects[0].options[selectOneSelectedIndex].value + '-' + selects[1].options[selectTwoSelectedIndex].value;
                resultInfoWeight.innerHTML = weight + ' кг.';

                hiddenInputWeight.value = weight + ' кг.';
                hiddenInputPrice.value = price + ' руб.';
                hiddenInputInfo.value = selects[0].options[selectOneSelectedIndex].value + '-' + selects[1].options[selectTwoSelectedIndex].value;

                __class.container.style.display = 'none';
                __class.result.style.display = 'flex';
            }
        }

        btnBack.onclick = (e) => {
            __class.container.style.display = 'flex';
            __class.result.style.display = 'none';
        }
    }

    getCityArray(str) {
        var sitysArr = [];
        var citys = str.split(';');

        citys.forEach(function(item, i, arr) {
            var city = item.split('=');
            if (city[0]) {
                sitysArr[i] = [];
                sitysArr[i]['city'] = city[0];
                sitysArr[i]['price'] = city[1];
                sitysArr[i]['option'] = city[2];
            }
        });

        return sitysArr;
    }

    fillSelect(obj, elem, selected = false, single = false, multyland = false) {
        elem.innerHTML='';

        let opt = document.createElement('option');
            opt.value = 0;
            opt.innerHTML = 'Выберите город';
            elem.appendChild(opt);

        obj.forEach(function(item, i) {

            if (!single) {
                var opt = document.createElement('option');
                    opt.dataset.index = i;
                    opt.value = item.city;
                    opt.innerHTML = item.city;
                    if (selected == i && selected != false) {
                        opt.selected = 'selected';
                    }
                    if (multyland && encodeURI(item.city) == multyland.toUpperCase()) {
                        opt.selected = 'selected';
                    }
                    elem.appendChild(opt);
            } else {
                if (item.option) {
                    var opt = document.createElement('option');
                        opt.dataset.index = i;
                        opt.value = item.city;
                        opt.innerHTML = item.city;
                        opt.selected = 'selected';
                        elem.appendChild(opt);
                }
            }
        });
    }
};