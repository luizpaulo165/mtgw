import Vue from 'vue'

Vue.filter('money', function (value, prefix) {
    if (value) {
        const rvalue = value < 100 ? (`000${value}`).slice(-3) : `${value}`;

        let number = (rvalue)
            .replace(/(\d{2})$/, ',$1')
            .split(',');

        number[0] = number[0].split(/(?=(?:...)*$)/).join('.');
        return (prefix) ? `${ prefix }  ${ number.join(',') }` : number.join(',');
    } else if (value === 0) {
        return (prefix) ? `${ prefix }  0,00` : '0,00';
    }

    return null;
});


Vue.filter('filterUrl', function (value) {
    var urlify = function(a){return a.toLowerCase().replace(/[^/a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '')};
    
    return urlify(value);
});