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
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return value.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
});