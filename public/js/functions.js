let commonLogin = (when, data) => {
        let url, redirect;

        if(when == "login"){
            url = "/user/login"
            redirect = "/user/profile"
        } else if(when == "register"){
            url = "/user/register"
            redirect = "/user/login"
        }

        $.ajax({
            url: url,
            data: data,
            dataType: "JSON",
            method: "POST",
            success: (data) => {
                if(data.mssg){
                    data.mssg.reverse()
                    for(let elem of data.mssg){
                        $('.errors').html("<span class='err_mssg'>" +elem+ "</span><br>")
                        console.clear()
                        console.log(elem)
                    }
                    $('.errors').show()
                } else {
                    $('.errors').hide()
                }
                if(data.success){
                    location.href = redirect
                }
            }
        })

    }

module.exports = {
    commonLogin
}