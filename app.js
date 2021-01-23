var validators = function(option){
    // Lấy form cần kiểm tra
    var formCheck = document.querySelector(option.form);
    // Kiểm tra  form
    if(formCheck){
        // Duyệt qua từng quy tắc
        option.rules.forEach(function(rule){
            // lấy input cần kiểm tra
            var inputElement = document.querySelector(rule.selector);
            // lấy hàm cha của input cần kiểm tra
            var inputElementParent = inputElement.parentElement;
            // Lấy ra element thông báo
            var messsage = document.querySelector(`${rule.selector} + span`);
            // Hàm kiểm tra khi blur ra ngoài input
            inputElement.addEventListener('blur',function(){
                // Add text vào element thông báo
                messsage.innerText = rule.test(inputElement.value);
                // Kiểm tra quy tắc
                if( !messsage.innerText){
                    inputElementParent.classList.add('valid');
                    inputElementParent.classList.remove('invalid')
                }
                else {
                    inputElementParent.classList.add('invalid');
                    inputElementParent.classList.remove('valid')
                }
            })
            // Khi click vào input bị lỗi => loại bỏ hiệu ứng invalid
            inputElement.addEventListener('click',function(){
                if(messsage.innerText){
                    inputElementParent.classList.remove('invalid');
                }
            })
        })
    }
}
// quy tắc đối với user name
validators.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? '' : 'Vui lòng nhập lại.';
        }
    }
}
// quy tắc đối với email
validators.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value)  ? '':'Vui lòng nhập lại.';
        }
    }
}
// quy tắc đối với password
validators.isPassWord = function(selector,minLength){
    return{
        selector: selector,
        test: function(value){
            return value.length >= minLength ? '' : `Vui lòng nhập tối tiểu ${minLength} kí tự.`; 
        }
    }
}
// kiểm tra lại password
validators.isCheckPassword= function(selector, getPassword){
    return{
        selector: selector,
        test: function(value){
            return (value === getPassword()&& value>0) ? '' : 'Bạn đã nhập sai.'; 
        }
    }
}





