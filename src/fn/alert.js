const Alert = {

    showMsg(msg = "", style = "success", timeOut = 1000) {
        //Create and show alert
        var div = document.createElement('div');
        div.id = "alertShowMsg";
        div.className = `alert alert-${style} alert-dismissible fade show`;
        div.style.position = "fixed";
        div.style.top = "20px";
        div.style.zIndex = "1060";
        div.style.left = "50%";
        div.style.transform = "translate(-50%)";
        div.style.minWidth = (window.screen.availWidth < 576) ? "90%" : "600px";
        div.style.opacity = 1;
        div.innerHTML = `${msg}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
        document.body.appendChild(div);

        //Timeout remove and animation
        setTimeout(function () {
            var fadeOut = setInterval(function () {
                if (div.style.opacity > 0) {
                    div.style.opacity -= 0.1;
                } else {
                    if (document.getElementById('alertShowMsg') != null) {
                        div.parentNode.removeChild(div);
                    }
                    clearInterval(fadeOut);
                }
            }, 100);
        }, timeOut);
    },

    confirmOk(callBcak){
        callBcak()
    },

    confirmDialog(title="ยืนยันการทำรายการ",detail="คุณต้องการทำรายการต่อหรือไม่ ?",callBcak=null, btn = {submit:'ยืนยัน',cancle:'ยกเลิก'}) {
        //Add class and style in body
        document.body.className = `modal-open`;
        document.body.style.paddingRight = `17px`;
        
        //Create backdrop
        var backdrop = document.createElement('div');
        backdrop.id = `modalBackdrop`;
        backdrop.className = `modal-backdrop fade`;
        document.body.appendChild(backdrop);

        //Create modal
        var div = document.createElement('div');
        div.id = "confirmDialog";
        div.className = "modal fade";
        div.tabIndex = "-1";
        div.style.display = "block";
        div.style.paddingRight = `17px`;
        div.innerHTML = `<div class="modal-dialog" role="document">`+
                            `<div class="modal-content">`+
                                `<div class="modal-header">`+
                                    `<h5 class="modal-title" ><b>${title}</b></h5>`+
                                    `<button type="button" class="close" aria-label="Close" onClick="Alert.closeModel()">`+
                                        `<span aria-hidden="true">&times;</span>`+
                                    `</button>`+
                                `</div>`+
                                `<div class="modal-body">`+
                                    `<div class="form-group">`+
                                        `<span>${detail}</span>`+
                                    `</div>`+
                                `</div>`+
                                `<div class="modal-footer">`+
                                    `<button type="button" class="btn btn-danger" onClick="Alert.closeModel()">${btn.cancle}</button>`+
                                    `<button type="button" class="btn btn-primary" id="confirmOk">${btn.submit}</button>`+
                                `</div>`+
                            `</div>`+
                        `</div>`;
        document.body.appendChild(div);

        //Add call back func
        document.getElementById(`confirmOk`).onclick = function () { 
            Alert.closeModel();
            if(callBcak != null && callBcak != undefined){
                callBcak();
            }    
        };

        //Show backdrop and modal
        setTimeout(function () {
            backdrop.classList.add(`show`);
            div.classList.add(`show`);
        },200);
    },

    closeModel(){
        var div = document.getElementById(`confirmDialog`);
        div.classList.remove(`show`);
        setTimeout(function () {
            var backdrop = document.getElementById(`modalBackdrop`);
            backdrop.classList.remove(`show`);
            document.body.classList.remove(`modal-open`);
            document.body.removeAttribute("style");
            setTimeout(function () {
                div.parentNode.removeChild(div);
                backdrop.parentNode.removeChild(backdrop);
            }, 200);
        }, 200);
    }
}
