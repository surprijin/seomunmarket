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
document.getElementById('logout').style.display = 'none';

function kakaoLogin(){
    Kakao.Auth.login({
        success:function(response){
            Kakao.API.request({
                url:'/v2/user/me',
                success:function(response){
                    console.log(response);
                    document.getElementById('user').innerText =
                        response.kakao_account.profile.nickname + '님';
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('loginbtn').style.display = 'none';
                    document.getElementById('joinbtn').style.display = 'none';
                    document.getElementById('logout').style.display = 'block';
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                }
            })
        }
    })
}

function kakaoLogout(){
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url:'/v1/user/unlink',
            success:function(response){
                console.log(response);
                document.getElementById('user').style.display = 'none';
                document.getElementById('login').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                document.getElementById('loginbtn').style.display = 'block';
                document.getElementById('loginbtn').style.marginRight = '20px';
                document.getElementById('joinbtn').style.display = 'block';
                alert('로그아웃 되었습니다.');
            }
        })
        Kakao.Auth.setAccessToken(undefined);
      }

}