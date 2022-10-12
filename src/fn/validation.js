var Valid = {
    form: (formId) => {
        var count = 0;
        var elements = document.getElementById(formId).querySelectorAll("[required]");
        Valid.clear();

        for (var i = 0, len = elements.length; i < len; ++i) {
            if (elements[i].value != '') continue;
            var span = document.createElement('span'),
                msg = elements[i].getAttribute('data-msg');
            if (msg == null) msg = 'กรุณาป้อนข้อมูลช่องนี้';
            span.className = 'invalid-feedback'
            span.innerHTML = msg;
            elements[i].classList.add("is-invalid");
            elements[i].parentElement.appendChild(span);
            count++;
        }

        var results = (count > 0) ? false : true;

        return results;
    },

    clear: () => {
        var block = document.getElementsByClassName("invalid-feedback");
        for (var i = 0, len = block.length; i < len; i++) {
            block[0].remove();
        }

        var invalid = document.getElementsByClassName("is-invalid");
        for (var i = 0, len = invalid.length; i < len; i++) {
            invalid[0].classList.remove("is-invalid");
        }
    },

    show: (name, msg) => {
        var element = document.getElementsByName(name)[0]
        if(element != undefined){
            var span = document.createElement('span')
            if (msg == null) msg = 'กรุณาป้อนข้อมูลช่องนี้'
            if(!element.className.match(/is-invalid/g)){
                element.classList.add("is-invalid")
            }
            if(element.nextSibling != null){
                element.nextSibling.remove()
            }
            span.className = 'invalid-feedback'
            span.innerHTML = msg;
            element.parentElement.appendChild(span)
        }
    }

}
