
// import test1 from '../../src/ActionGlobal/module-global'
// let rn = require('../../src/ActionGlobal/module-global')
// var request = require("request");
const Fnc = {
    formatPrice(number, decimal = 0) {
        var number = (number != undefined && number != "") ? number : 0
        number = Intl.NumberFormat('en-US', { currency: 'USD', minimumFractionDigits: parseInt(decimal), maximumFractionDigits: parseInt(decimal), }).format(parseFloat(number))
        return number
    },

    getYearList(endYear = (new Date()).getFullYear(), startYear = 2019) {
        var yearList = []
        for (var i = startYear; i <= endYear; i++) {
            yearList.unshift({ year: i })
        }
        return yearList
    },

    ckvalue(value,type=null) {
        if(type=="file"){
            try {
               if(value.name)  return true
            } catch (error) {
                return false
            }
        }
        else
        switch (value) {
          case undefined:
            return false;
          case null:
            return false;
          case NaN:
            return false;
          case "":
            return false;
          default:
            if(typeof value == "object"){
              if(value  instanceof Date) {
                return true
              }
              else if (Object.entries(value).length > 0) { return true; }
              else { 
                return false;
              }
            }
            else  { return true }
        }
      },
      ckvalue2(){
          return "ckvalue2"
      },
    login_user(username="",password="",url="/summit/",myreact,home,step1,step2){
        // console.log(home,'home');
        // console.log(step1);
        // console.log(step2,'step2');
        var formData = new FormData();
        if(this.ckvalue(username) && this.ckvalue(password)){
            let url_step1 = step1
            //  process.env.URL_STEP1 
            // "https://summit.justplaybase.com/apis-www-app-v01/projects-step-1/login" 
            fetch(url_step1,{
                method:'POST',
                headers: {
                    'Content-Type':'application/json;charset=utf-8'
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            })
            .then((value) => value.json())
            .then((value) => { 
                // console.log("TRUE");
                if(value.statusCode==200) {
                        let arr = ["Login","loginpassword","loginotp","package","register",
                                    "verify-email","activate","forget-password","forget-password-sent",
                                    "new-password","newpassword","login"
                        ]
                        let last = window.location.href.split("/")
                        last = last[last.length-1]
                        // console.log(window.location.href,'window.location.href');
                        // console.log(last,'last'); 
                        if(arr.indexOf(last) >=0 ){
                            // console.log("true");
                            myreact.setState({ck_el:true});
                        }
                        else {
                            // console.log("else");
                            fetch(step2,{
                                method:'POST',
                                headers: {
                                    'Content-Type':'application/json;charset=utf-8',
                                    Authorization: 'Bearer '+localStorage.getItem('token')
                                },
                                // body:{}
                            }).then((value)=>{
                                if(value.status==401){
                                    // window.location.href= "/login"
                                    window.location.href= "/summit/login"
                                }
                                else {
                                    myreact.setState({ck_el:true});
                                }
                            }).catch((e)=>{
                                // window.location.href= "/login"
                                window.location.href= "/summit/login"
                            })
                            
                        }    
                    // if(myreact!=undefined)
                    // if(myreact.state.ck_el == false) {
                    //     myreact.setState({ck_el:true});
                    // }   
                }
                else if(value.statusCode!=200){
                    if(url==null) url = "/summit/"
                    if(url!= "" && url !=null && url !='undefined'){
                        // localStorage.removeItem("username");
                        // localStorage.removeItem("password");
                        // let redirect_home = home
                        // "https://www.justplaybase.com/summit/" 
                        window.location =  home
                        // console.log(home,'home');
                    }
                    return false
                }
                else{
                    window.location =  home
                }
            }).catch(function(error){});   
        }
        else{
            // console.log("FALSE");
            // console.log(username);
            // console.log(password);
            // console.log("else");
            window.location = home 
            // "https://www.justplaybase.com/summit/"
        }
   },

    formatDateTime(date, type = 'asc') {
        if (date != "" && date != undefined) {
            date = new Date(date.replace(/-/g, "/"))
        } else {
            date = new Date()
        }
        var dd = date.getDate()
        var mm = date.getMonth() + 1
        var yy = date.getFullYear()
        var hh = date.getHours()
        var MM = date.getMinutes()
        var ss = date.getSeconds()
        if (dd < 10) dd = "0" + dd
        if (mm < 10) mm = "0" + mm
        if (hh < 10) hh = "0" + hh
        if (MM < 10) MM = "0" + MM
        if (ss < 10) ss = "0" + ss
        if (type == 'asc') {
            return dd + "/" + mm + "/" + yy + " " + hh + ":" + MM + ":" + ss
        } else {
            return yy + "-" + mm + "-" + dd + " " + hh + ":" + MM + ":" + ss
        }
    },

    // convertDecodeUrl(data) {
    //     if (typeof data == 'object') {
    //         for (var key in data) {
    //             if (data.hasOwnProperty(key)) {
    //                 data[key] = this.convertDecodeUrl(data[key])
    //             }
    //         }
    //         return data
    //     } else {
    //         return decodeURIComponent(data)
    //     }
    // },

    formatDate(date, language = "TH") {
        const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const monthNamesTH = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
        date = new Date(date)
        var dd = date.getDate()
        var mm = date.getMonth()
        var yy = date.getFullYear()
        var monthText = (language == "TH") ? monthNamesTH[mm] : monthNamesEN[mm]
        return monthText + " " + dd + ", " + yy
    },

    getActiveTime(startDate, language = "TH", endDate = new Date()) {
        startDate = new Date(startDate)
        var diffTime = Math.abs(endDate - startDate)
        var diffSecond = Math.ceil(diffTime / 1000)

        if (diffSecond < 60) {
            return diffSecond + (language == "TH" ? " วินาที ที่ผ่านมา" : " Seconds Ago")
        } else if (diffSecond < 3600) {
            return Math.ceil(diffSecond / 60) + (language == "TH" ? " นาที ที่ผ่านมา" : " Minutes Ago")
        } else if (diffSecond < 68400) {
            return Math.ceil(diffSecond / 3600) + (language == "TH" ? " ชั่วโมง ที่ผ่านมา" : " Hours Ago")
        } else if (diffSecond < 2052000) {
            return Math.ceil(diffSecond / 68400) + (language == "TH" ? " วัน ที่ผ่านมา" : " Days Ago")
        } else if (diffSecond < 24624000) {
            return Math.ceil(diffSecond / 2052000) + (language == "TH" ? " เดือน ที่ผ่านมา" : " Months Ago")
        } else {
            return Math.ceil(diffSecond / 24624000) + (language == "TH" ? " ปี ที่ผ่านมา" : " Years Ago")
        }
    },

    detectDevice(getReture = "os.name") {
        var module = {
            options: [],
            header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
            dataos: [
                { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
                { name: 'Windows', value: 'Win', version: 'NT' },
                { name: 'iPhone', value: 'iPhone', version: 'OS' },
                { name: 'iPad', value: 'iPad', version: 'OS' },
                { name: 'Kindle', value: 'Silk', version: 'Silk' },
                { name: 'Android', value: 'Android', version: 'Android' },
                { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
                { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
                { name: 'Macintosh', value: 'Mac', version: 'OS X' },
                { name: 'Linux', value: 'Linux', version: 'rv' },
                { name: 'Palm', value: 'Palm', version: 'PalmOS' }
            ],
            databrowser: [
                { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
                { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
                { name: 'Safari', value: 'Safari', version: 'Version' },
                { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
                { name: 'Opera', value: 'Opera', version: 'Opera' },
                { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
                { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
            ],
            init: function () {
                var agent = this.header.join(' '),
                    os = this.matchItem(agent, this.dataos),
                    browser = this.matchItem(agent, this.databrowser);
                return { os: os, browser: browser };
            },
            matchItem: function (string, data) {
                var i = 0,
                    j = 0,
                    html = '',
                    regex,
                    regexv,
                    match,
                    matches,
                    version;

                for (i = 0; i < data.length; i += 1) {
                    regex = new RegExp(data[i].value, 'i');
                    match = regex.test(string);
                    if (match) {
                        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                        matches = string.match(regexv);
                        version = '';
                        if (matches) { if (matches[1]) { matches = matches[1]; } }
                        if (matches) {
                            matches = matches.split(/[._]+/);
                            for (j = 0; j < matches.length; j += 1) {
                                if (j === 0) {
                                    version += matches[j] + '.';
                                } else {
                                    version += matches[j];
                                }
                            }
                        } else {
                            version = '0';
                        }
                        return {
                            name: data[i].name,
                            version: parseFloat(version)
                        };
                    }
                }
                return { name: 'unknown', version: 0 };
            }
        };

        var e = module.init();

        if (getReture == "os.name") {
            return e.os.name
        } else if (getReture == "os.version") {
            return e.os.version
        } else if (getReture == "browser.name") {
            return e.browser.name
        } else if (getReture == "browser.version") {
            return e.browser.version
        } else if (getReture == "navigator.userAgent") {
            return navigator.userAgent
        } else if (getReture == "navigator.appVersion") {
            return navigator.appVersion
        } else if (getReture == "navigator.platform") {
            return navigator.platform
        } else if (getReture == "navigator.vendor") {
            return navigator.vendor
        } else {
            return ''
        }
    },

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (function () {
                return function (e) {
                    resolve(window.btoa(e.target.result))
                }
            })(file)
            reader.onerror = error => reject(error)
        })
    },

    loadingScreen(msg = "กำหลังโหลด...") {
        var loadingScreen = document.getElementById(`loadingScreen`)
        if (loadingScreen != null) {
            document.body.classList.remove(`modal-open`)
            loadingScreen.parentNode.removeChild(loadingScreen)
        } else {
            document.body.className = "modal-open"
            var div = document.createElement('div')
            div.id = "loadingScreen"
            div.className = "modal-backdrop fade show"
            div.innerHTML = `<div class="justify-content-center row mx-0"><div class="col-auto margin-login text-center">
                            <div class="spinner-grow text-white" role="status"><span class="sr-only">Loading...</span></div>
                            <div class="spinner-grow text-white" role="status"><span class="sr-only">Loading...</span></div>
                            <div class="spinner-grow text-white" role="status"><span class="sr-only">Loading...</span></div>
                            <div class="spinner-grow text-white" role="status"><span class="sr-only">Loading...</span></div>
                            <div class="spinner-grow text-white" role="status"><span class="sr-only">Loading...</span></div>
                            <p class="col-auto text-white">${msg}</p>
                            </div></div>`
            document.body.appendChild(div)
        }
    },

    formatTrim(data) {
        for (var key in data) {
            if (Array.isArray(data[key])) {
                data[key] = Fnc.formatTrim(data[key])
            } else {
                for (var k in data[key]) {
                    if (Array.isArray(data[key][k])) {
                        data[key][k] = Fnc.formatTrim(data[key][k])
                    } else {
                        data[key][k] = data[key][k].trim()
                        data[key][k] = data[key][k].replace(/"/g, '″')
                    }
                }
            }
        }
        return data
    },
}