/*
    var selectTab = document.querySelectorAll('.tabMenu');

    for (i=0; i<selectTab.length; i++)
    selectTab[i].addEventListener('click', function(){
        for(j=0; j<selectTab.length; j++){
            selectTab[j].classList.remove('active'); 
        }
        this.classList.add('active');
    });
*/

Kakao.init('2acb96084c5027e607fe4bff49a7e65a');
Kakao.isInitialized();

function kakaoLogin(){
    Kakao.Auth.login({
        success:function(response){
            Kakao.API.request({
                url:'/v2/user/me',
                success:function(response){
                    console.log(response);
                    // document.getElementById('user').innerText =
                    //     response.Kakao_account.profile.nickname;
                }
            })
        }
    })
}

function kakaoLogout(){

}