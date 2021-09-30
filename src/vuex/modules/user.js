import Vue from 'vue'
import ElementUI from "element-ui";
import i18n from '../../lang/index'
import crypto from 'crypto';
import {router} from '../../main.js'
import { destroySession, afterLogin, updateSession } from '@/api/session'

const state = {
  token: null, // 토큰
  user_id: null, // 토큰안에 있는 user_id
  sesn_id: null, // 토큰안에 있는 sesn_id
  autoLogin: false, //로그인시 로그인유지 체크
  beforePageUrl: null, //로그인 후 이동할 페이지 경로
  langKind: 'KR',
  autoOrdTerms: null, // 자동감시주문 이용약관 동의 여부
  login: {
    // 로그인 프로세스시 사용
    email: '', //로그인 입력 이메일
    pwd: '', //로그인 입력 pwd
    secType: '', //pre로그인 후 인증구분
    user_id: '', //pre로그인 후 user_id
  },
  registration: {
    // 회원가입 프로세스시 사용
    userId:'',
    userGrpId:'',
    switchIp:'',
    userNm: '', //회원가입 직후 받은 회원명
    authCi: '', //간편로그인시 CI 정보 저장
    mobileNo: '', //간편로그인시 모바일번호 저장
 
    user_mail: '',
    iput_pass: '',
    iput_pass2: '',
    use_terms1: 1,
    use_terms2: 1,
    use_terms3: 0,
    prv_info_proc: false,
    event_noti: false,
    mobileVerified: false,
    secured: false,  
  },

  //계좌생성정보 
  userAccCreationInfo: {    
      user_nm:'',  
      user_brth_day:'',
      kovex_yn: '',
      unit_code: '',      
      event_noti: '',  // 0.미동의,1.동의
      auth_gen_dt: '',
      user_eng_nm: '',
      user_eng_surnm: '',
      dmst_liv_tp: '',  // 01국내 : 02국외
      home_pst_no: '',  //거주정보 우편번호
      home_addr:'',
      home_addr_dtl:'',
      home_area_code:'',
      home_phon_no1:'',
      home_phon_no2:'',
      home_phon_no:'',
      job_tp:'',
      job_kind:'',
      job_position:'',
      ofc_nm:'',
      ofc_dept_nm:'',
      ofc_pst_no:'',
      ofc_addr:'',
      ofc_addr_dtl:'',
      ofc_area_code:'',
      ofc_phon_no1:'',
      ofc_phon_no2:'',
      ofc_phon_no:'',
      fund_src_tp:'',
      fund_src_etc:'',//한글20자
      trd_purp_cd:'',
      trd_purp_etc:'', //한글20자
      bact_auth_tp:'',  //계좌인증구분[0.미등록,1.등록]
      user_id:'',
      user_grp_id:'',
      switch_ip:'',
  },
  //1원인증
  oneWonCert: {    
     bankCd:'',
     bankNm: '',
     accountNumber:'', 
     depositerNmText:'',
  },
  //정보편집용
  myInfo:{
    //자택정보
    user_eng_nm: '',
    user_eng_surnm: '',
    home_pst_no: '',  
    home_addr:'',
    home_addr_dtl:'',
    home_area_code:'',
    home_phon_no1:'',
    home_phon_no2:'',
    home_phon_no:'',
    //직장정보
    job_tp:'',
    job_kind:'',
    job_position_code:'',
    ofc_nm:'',
    ofc_dept_nm:'',
    ofc_pst_no:'',
    ofc_addr:'',
    ofc_addr_dtl:'',
    ofc_area_code:'',
    ofc_phon_no1:'',
    ofc_phon_no2:'',
    ofc_phon_no:'',
    //자금정보
    fund_src_tp:'',
    fund_src_etc:'',
    trd_purp_cd:'',
    trd_purp_etc:'', 
  },
  
  registered: {
    // 회원가입 완료화면
    user_mail: ''
  },
  mobileVertification: {
    // 휴대폰인증
    auth_ci: '',
    auth_di: '',
    auth_mobl_no: '',
    mobl_corp: '',
    user_nm: '',
    user_brth_day: '',
    user_gend: '',
    user_forn_tp: ''
  },
  newSecurePin: {
    //보안비밀번호 등록
    secu_pass: '',
    secu_pass2: ''
  },
  newGoogleOtp: {
    //구글OTP 등록
    user_id: '',
    iput_otp: ''
  },
  passwordFind: {
    user_mail: ''
  },
  accountFind: {
    auth_di: ''
  },
  mypage: {
    auth_mobl_no: null,
    event_noti: null,
    user_mail: null,
    user_nm: null,
    user_pass: null,
    mobl_auth_tp: null,
    secu_auth_tp: null,
    bact_auth_tp: null,
    fail_secu_cont: null,
  },
  noti: {
    login_mail_tp: '0',
    login_sms_tp: '0',
    cntr_mail_tp: '0',
    cntr_sms_tp: '0',
    dpwd_mail_tp: '0',
    dpwd_sms_tp: '0',
    event_mail_tp: '0',
    event_sms_tp: '0',
    event_noti_tp: '0'
  },
  bankAccount: {
    code: '',
    bank: '',
    account: ''
  },
  security: {},
  
  mySymbolList: [],
  bookmarkList: [],
  loginHistory: [],

  notiSettingList: [],
  isLogin: false,
  postNoFrom:'',//우편번호 API 호출하는 곳
  termFrom:''  //약관동의 호출하는 곳 구분
}

const getters = {
  getAutoLogin: state => state.autoLogin,
  isLoggedIn: state => !!state.token,
  getUserId: state => state.user_id,
  getSesnId: state => state.sesn_id, 
  getAuthCi: state => state.auth_ci,
  getAutoOrdTerms: state => state.autoOrdTerms,
  getLangKind: state => state.langKind,
  getLogin: state => state.login,
  // userInfo: state => state.me,
  notiSetting: state => state.noti,
  // secureType: state => state.me.secType,
  bankInfo: state => state.bankAccount,
  mySymbols: state => state.mySymbolList,
  myBookmarks: state => state.bookmarkList,
  loginHistory: state => state.loginHistory,
  getNotiSettingList: state => state.notiSettingList,
  getBact_auth_tp: state => state.mypage.bact_auth_tp
}

const mutations = {
  setAutoLogin: (state, autoLogin) => {
    state.autoLogin = autoLogin
  },
  setToken: (state, token) => {
    state.token = token
  },
  setUserId: (state, user_id) => {
    state.user_id = user_id
  },
  setSesnId: (state, sesn_id) => {
    state.sesn_id = sesn_id
  },
  setAuthCi: (state, auth_ci) => {
    state.auth_ci = auth_ci
  },
  setAutoOrdTerms: (state, autoOrdTerms) => {
    state.autoOrdTerms = autoOrdTerms
  },
  setLogin: (state, login) => {
    state.login = login
    if(!state.user){
        state.user = {}
    }
    state.user.login = login
  },
  setLangKind: (state, langKind) => {
    window.localStorage.setItem('langKind', langKind)
    state.langKind = langKind        
  },
  setBeforePageUrl: (state, pageUrl) => {
    state.beforePageUrl = pageUrl
  },
  setRegistration: (state, registration) => {
    state.registration = registration
  },
  setMobileVertification: (state, mobileVertification) => {
    state.mobileVertification = mobileVertification
  },
  setNewSecurePin: (state, newSecurePin) => {
    state.newSecurePin = newSecurePin
  },
  setNewGoogleOtp: (state, newGoogleOtp) => {
    state.newGoogleOtp = newGoogleOtp
  },
  setAccountFind: (state, accountFind) => {
    state.accountFind = accountFind
  },
  // setMe: (state, me) => {
  //     state.me = me
  // },
  // mergeMe: (state, part) => {
  //     state.me = Obj.assign(state.me, part)
  // },
  setNoti: (state, noti) => {
    state.noti = noti
  },
  setBankAccount: (state, acc) => {
    state.bankAccount = acc
  },
  setSecurity: (state, sec) => {
    state.security = sec
  },
  setMySymbolList: (state, list) => {
    state.mySymbolList = list
  },
  setBookmarkList: (state, list) => {
    state.bookmarkList = list
  },
  setLoginHistory: (state, list) => {
    state.loginHistory = list
  },
  setNotiSettingList: (state, list) => {
    state.notiSettingList = list
  }
}

const actions = {
  // 자동감시주문 이용동의
  agreeAutoOrdTerms: ({ commit, state, getters, dispatch }, payload) => {
    console.log('자동감시주문 이용동의 시작', payload)
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName('ac170',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_id'] = getters.getUserId
          block['terms_kind'] = '03'
          block['use_terms'] = payload['useTerms']
        },
        queryData => {
          if (!queryData) {
            console.log('자동감시주문 이용동의 실패')
            let errorData = window.sessionStorage.getItem('lastErrorData')
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac170') {
                reject(errorData)
              }
              if(errorData.errCode === '49108') { // 이미 동의상태인 경우
                commit('setAutoOrdTerms', payload['useTerms'])        
              }
            }
          } else {
            let res = queryData.getBlockData('OutBlock1')[0]
            console.log('자동감시주문 이용동의 성공', res)
            commit('setAutoOrdTerms', payload['useTerms'])
            resolve(res) //리턴   
          }
        }
      )
    })
  },

  
  
  // PRE 로그인 (ac515 -> ac518)
  preLogin: ({ commit, state, getters, dispatch }, payload) => {
    // TR : ASIS : ac515, TOBE : ac518
    return new Promise((resolve, reject) => {
      //인증휴대폰CI , auth_ci      , auth_ci       , char  , 88;    
      Vue.prototype.$socket.sendProcessByName('ac518',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]        
          block['auth_ci'] = payload['auth_ci']
        },
        queryData => 
        {  
          if (!queryData) 
          {
            console.log('preLogin fail1')
            /** error 처리 S **/
            let errorData = window.sessionStorage.getItem('lastErrorData')
            if (errorData !== null) 
            {
                errorData = JSON.parse(errorData)                 
                if (errorData.errCode === '40312') 
                {                                      
                    //일치하는 회원정보가 없습니다.
                    Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                    });
                } 
                else {
                    console.log('errorData.errCode:' + errorData.errCode)   
                    Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                      confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                      callback: action => {
                        reject(errorData) ;
                        return;
                      }
                    })                  
                }
              
              reject(errorData)    
            }
            return;
          }
          let res = queryData.getBlockData('OutBlock1')[0]

          // 계정ID		, user_id		, user_id		, char  , 10;
          // 지점코드    , unit_code     , unit_code     , char  ,  5;
			    // 계정그룹ID	, user_grp_id	, user_grp_id	, char  ,  2;
		  	  // L4스위치 IP	, switch_ip		, switch_ip		, char  , 16;
          
          let login = {          
            user_id: res.user_id,    
            unitCode: res.unit_code,
            userGrpId: res.user_grp_id,
            switchIp: res.switch_ip,
          }
          commit('setLogin', login)
          commit('setAutoLogin', payload['autoLogin'])
          commit('setUnitcode', res.unit_code)
          //prelogin 후 로그인시 헤더값에 채우기 위한 아이디
          //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {                        
          //if(afc.isDevice){
          //if(false){
          if (false && afc.isIE && location.hostname === "localhost") {
            window.localStorage.setItem('user_id', res.user_id)                                         
            window.localStorage.setItem('loginType', 1);
          }
        //  commit('setNewGoogleOtp', {user_id: res.user_id, iput_otp: ''})
          //로그인세션

          //헤더에 저장 ac194이후에는 모든 쿼리 실행시 헤더에 user_id, unit_code 들고다녀야 함
          window.loginObj['user_id'] = res.user_id
          window.loginObj['unit_code'] = res.unit_code
          window.loginObj['auth_ci'] = payload['auth_ci']

          console.log('loginObj:' + JSON.stringify( window.loginObj))
          
          if (afc.isDevice) {                        
            dispatch('setLangKind', {lang_kind : state.langKind, user_id : res.user_id})                        
          }

          //암호화
          var cipher = crypto.createCipheriv('aes-256-cbc', "kovexlogin!@#$%^kovexlogin!@#$%^", '1234567890abcdef');
          var enc = cipher.update(JSON.stringify(login),"utf8", "hex");
          enc += cipher.final("hex");                    
          window.localStorage.setItem('_login', enc);
          
          resolve(res) //리턴
        }
      )
    })
  },

  // PRE 로그인
  old_preLogin: ({ commit, state, getters, dispatch }, payload) => {
    // TR : ASIS : ac204, kv6300 -> TOBE : ac515
    return new Promise((resolve, reject) => {
      let encPassword = payload['password']
      Vue.prototype.$socket.sendProcessByName('ac515',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_mail'] = payload['email']
          block['iput_pass'] = encPassword
        },
        queryData => {
          if (!queryData) {
            console.log('preLogin 실패')
            /** error 처리 S **/
            let errorData = window.sessionStorage.getItem('lastErrorData')
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac515' && errorData.errCode == '40095')
              {
                errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5, errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5).length -1)
                var vali_dtm = errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5)
                vali_dtm = vali_dtm.substr(0, vali_dtm.length -1)
                
                // alert(i18n.t('signup.d026', [payload['email'], vali_dtm]));
                Vue.prototype.$alert(i18n.t('signup.d026', [payload['email'], vali_dtm]), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                })
                return;
              } else {
                if (!['40702','40500','40312','41027'].includes(errorData.errCode)) {
                  // alert(errorData.errMsg);
                  Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                    confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                    callback: action => {
                      reject(errorData) ;
                      return;
                    }
                  })
                }
              }
              reject(errorData)    
            }
            return;
          }
          let res = queryData.getBlockData('OutBlock1')[0]
          
          let login = {
            email: payload['email'],
            pwd: encPassword,
            user_id: res.user_id,
            secType: res.secu_auth_tp
          }
          commit('setLogin', login)
          commit('setAutoLogin', payload['autoLogin'])

          //prelogin 후 로그인시 헤더값에 채우기 위한 아이디
          //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {                        
          //if(afc.isDevice){
          //if(false){
          if (false && afc.isIE && location.hostname === "localhost") {
            window.localStorage.setItem('user_id', res.user_id)                        
            window.localStorage.setItem('loginType', 1);
          }
          commit('setNewGoogleOtp', {user_id: res.user_id, iput_otp: ''})
          window.loginObj['user_id'] = res.user_id
          
          if (afc.isDevice) {                        
            dispatch('setLangKind', {lang_kind : payload['langkind'], user_id : res.user_id})                        
          }

          //암호화
          var cipher = crypto.createCipheriv('aes-256-cbc', "kovexlogin!@#$%^kovexlogin!@#$%^", '1234567890abcdef');
          var enc = cipher.update(JSON.stringify(login),"utf8", "hex");
          enc += cipher.final("hex");                    
          window.localStorage.setItem('_login', enc);
          
          resolve(res) //리턴
        }
      )
    })
  },

  //마이키핀 통한 실제 로그인
  login: ({ commit, rootState, state, dispatch }, payload) => { 
    // TR TOBE : ac194
    return new Promise((resolve, reject) => {     
      Vue.prototype.$socket.sendProcessByName('ac194',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_id'] =    payload['user_id'] 
          block['auth_mobl_no'] =   payload['auth_mobl_no'] 
          console.log(block);
        },
        queryData => {
          if (!queryData) {
            let errorData = window.sessionStorage.getItem('lastErrorData')
            let errMsg = ""
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac194') {
              
                errMsg = i18n.t('sys_err.' + errorData.errCode)

                Vue.prototype.$alert(errMsg, '', {
                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                  callback: action => {
                    reject(errorData);                                    
                  }
                })
              }
            }
            return;
          }
          
          // 실제 로그인 처리
          let res = queryData.getBlockData('OutBlock1')[0]
          console.log(res) //{계정ID,세션ID,자동로그인키값}
          let imsiToken = JSON.stringify(res) // @TODO 로그인 : token 값 어디서 받아오는지?

          // 계정ID               , user_id        , user_id        , char , 10;
          // 기존휴대폰번호       , db_mobl_no     , db_mobl_no     , char , 11; // 원장에있는번호
          // 휴대폰갱신여부       , auth_mobl_yn   , auth_mobl_yn   , char ,  1; // Y.갱신필요 N.갱신불필요
          // 고객확인잔여일수     , user_day_cnt   , user_day_cnt   , long , 10;
          // 세션ID               , sesn_id        , sesn_id        , char , 50;
          // 자동로그인키값       , auto_key       , auto_key       , char , 72;
          // 자동감시주문약관동의 , auto_ord_terms , auto_ord_terms , char ,  1; // 0.미동의1.동의

          // login처리
          // local일 경우 임의처리
          //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {
          //if(afc.isDevice){
          //if(false){

          var excuteLogin = function(){
            window.loginObj['token'] = imsiToken;

            commit('setLangKind', state.langKind);
            commit('setToken', imsiToken);
            commit('setUserId', res.user_id);   
            commit('setSesnId', res.sesn_id);        
            commit('setUnitcode',window.loginObj['unit_code']);   
            commit('setAuthCi', window.loginObj['auth_ci']);        

            //login 후 호출
            //dispatch('myInfo',{user_id:res.user_id})
            dispatch('fetchBookmarkedSymbols');            

            //device 일 경우 phone에서 uuid를 얻어오는 부분 - push
            //alert("===알림설정 푸쉬키 등록===");
            // alert("isSystemWebview:"+afc.isSystemWebview);
            // alert("isAndDevice:"+(afc.isAndroid && afc.andVer<1000));
            // alert("isIosDevice:"+(afc.isIos && afc.iosVer<1000));
            if (afc.isDevice) {
              PushManager.getPushToken(function(resp) {
                console.log("### token :", resp.TOKEN);
                // alert("디바이스 토큰 : " + resp.TOKEN)
                window.localStorage.setItem('dev_ihrt_value', resp.TOKEN);

                const tmpDate = new Date();
                const tmpMonth = (tmpDate.getMonth() + 1) < 10 ? '0' + (tmpDate.getMonth() + 1) : '' + (tmpDate.getMonth() + 1)
        
                const tmpPayload = {
                    id              : res.user_id,
                    op_gb           : '1',
                    date            : tmpDate.getFullYear() + tmpMonth + tmpDate.getDate(),
                    time            : tmpDate.getHours().toString() + tmpDate.getMinutes() + tmpDate.getSeconds(),
                    os_div          : window.localStorage.getItem('os_div'),
                    dev_ihrt_value  : window.localStorage.getItem('dev_ihrt_value') // 디바이스 토큰,
                }
                
                console.log("tmpPayload:"+JSON.stringify(tmpPayload))

                // 모바일 앱 일경우
                if (tmpPayload['os_div'] == '') {
                    // alert("테스트용(삭제예정) : 안드로이드 or IOS가 아닙니다.")
                } else if (tmpPayload['dev_ihrt_value'] == '') {
                    // alert("디바이스 토큰 정보가 없습니다.")
                } else {
                    dispatch('reqNotiPush', tmpPayload)
                }
              });
              var isPush = false;
              var callback = function(param) {
                afc.clearPref()
                if (param != "") {
                  commit('setCurrentSymbol', param);
                  sessionStorage.setItem('currentSymbol', param);
                  
                  router.push({name: 'mOrder'})
                  isPush = true;
                }
              }
              
              //device push로 알림을 통해 로그인할 경우 해당 알림의 currentSymbol에 해당하는 주문 페이지로 이동처리.
              afc.getPref(callback)
              if(isPush) return;
            }
            //device 일 경우 phone에서 uuid를 얻어오는 부분 end

            resolve(res) //리턴
          }

          if (false && afc.isIE && location.hostname === "localhost") {
            var token = {
                "user_id"  : window.loginObj.user_id,
                "sesn_id"  : window.loginObj.sesn_id
            };
            window.localStorage.setItem('token', JSON.stringify(token))
            // window.localStorage.setItem('langKind', state.langKind)                        
            window.localStorage.setItem('loginType', 2);

            excuteLogin();
          // local이 아닌 경우
          } else {
            var autoLogin = false;
            if(state.autoLogin){
              autoLogin = state.autoLogin;
            }
            afterLogin({
              userId: res.user_id,
              sessionId: res.sesn_id,
              autoKey: res.auto_key,
              autoLogin: autoLogin.toString(),
              langKind: state.langKind,
              unitCode: window.loginObj['unit_code'],
              authCi: window.loginObj['auth_ci']
            }).then(res => {
              console.log('afterLogin success::res ==>',res)
			  // 2021.07.28 by lyk - res.body 오류 발생으로 excuteLogin 실행이 안되어 주석처리 함
              // console.log('afterLogin success::res.body ==>',res.body)
              excuteLogin();
            });
          }
        }
      )
    }) //promise
  },

  // OTP or 보안비밀번호 입력 실제 로그인
  old_login: ({ commit, rootState, state, dispatch }, payload) => { 
    // TR TOBE : AC130
    return new Promise((resolve, reject) => {
      let encPassword = state.login.pwd;
      Vue.prototype.$socket.sendProcessByName('ac130',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_mail'] = state.login.email
          block['iput_pass'] = encPassword
          block['iput_secu_pass'] = payload['iput_secu_pass']
          block['lang_kind'] = state.langKind
          console.log(block);
        },
        queryData => {
          if (!queryData) {
            let errorData = window.sessionStorage.getItem('lastErrorData')
            let errMsg = ""
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac130') {
                if (errorData.errCode == '40095') {
                  errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5, errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5).length -1)
                  var vali_dtm = errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5)
                  vali_dtm = vali_dtm.substr(0, vali_dtm.length -1)

                  if (new Date(vali_dtm) < new Date()) {
                    if (payload['check_email']) {
                      reject(errorData);
                      return;
                    }
                  }
                  // alert(i18n.t('signup.d026', [state.login.email, vali_dtm]));
                  // reject(errorData);

                  Vue.prototype.$alert(i18n.t('signup.d026', [state.login.email, vali_dtm]), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                    callback: action => {
                      reject(errorData);                                    
                      return;
                    }
                  })
                  return;
                } else if (errorData.errCode == '40705') {
                  errMsg = i18n.t('login.b009')
                } else if (errorData.errCode == '40712') {
                  errMsg = i18n.t('login.b008')
                } else {
                  errMsg = i18n.t('sys_err.' + errorData.errCode)
                }

                Vue.prototype.$alert(errMsg, '', {
                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                  callback: action => {
                    reject(errorData);                                    
                  }
                })
              }
            }
            return;
          }
          
          // 실제 로그인 처리
          let res = queryData.getBlockData('OutBlock1')[0]
          console.log(res) //{계정ID,세션ID,자동로그인키값}
          let imsiToken = JSON.stringify(res) // @TODO 로그인 : token 값 어디서 받아오는지?

          // login처리
          // local일 경우 임의처리
          //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {
          //if(afc.isDevice){
          //if(false){

          var excuteLogin = function(){
            window.loginObj['token'] = imsiToken;

            commit('setLangKind', state.langKind);
            commit('setToken', imsiToken);
            commit('setUserId', res.user_id);
            commit('setSesnId', res.sesn_id);
            commit('setAutoOrdTerms', res.auto_ord_terms);

            //login 후 호출
            //dispatch('myInfo',{user_id:res.user_id})
            dispatch('fetchBookmarkedSymbols');
            res['temp_use_tp'] = '0';

            //device 일 경우 phone에서 uuid를 얻어오는 부분 - push
            //alert("===알림설정 푸쉬키 등록===");
            // alert("isSystemWebview:"+afc.isSystemWebview);
            // alert("isAndDevice:"+(afc.isAndroid && afc.andVer<1000));
            // alert("isIosDevice:"+(afc.isIos && afc.iosVer<1000));
            if (afc.isDevice) {
              PushManager.getPushToken(function(resp) {
                console.log("### token :", resp.TOKEN);
                // alert("디바이스 토큰 : " + resp.TOKEN)
                window.localStorage.setItem('dev_ihrt_value', resp.TOKEN);

                const tmpDate = new Date();
                const tmpMonth = (tmpDate.getMonth() + 1) < 10 ? '0' + (tmpDate.getMonth() + 1) : '' + (tmpDate.getMonth() + 1)
        
                const tmpPayload = {
                    id              : res.user_id,
                    op_gb           : '1',
                    date            : tmpDate.getFullYear() + tmpMonth + tmpDate.getDate(),
                    time            : tmpDate.getHours().toString() + tmpDate.getMinutes() + tmpDate.getSeconds(),
                    os_div          : window.localStorage.getItem('os_div'),
                    dev_ihrt_value  : window.localStorage.getItem('dev_ihrt_value') // 디바이스 토큰,
                }

                // 모바일 앱 일경우
                if (tmpPayload['os_div'] == '') {
                    // alert("테스트용(삭제예정) : 안드로이드 or IOS가 아닙니다.")
                } else if (tmpPayload['dev_ihrt_value'] == '') {
                    // alert("디바이스 토큰 정보가 없습니다.")
                } else {
                    dispatch('reqNotiPush', tmpPayload)
                }
              });
              var isPush = false;
              var callback = function(param) {
                afc.clearPref()
                if (param != "") {
                  commit('setCurrentSymbol', param);
                  sessionStorage.setItem('currentSymbol', param);
                  
                  router.push({name: 'mOrder'})
                  isPush = true;
                }
              }
              
              //device push로 알림을 통해 로그인할 경우 해당 알림의 currentSymbol에 해당하는 주문 페이지로 이동처리.
              afc.getPref(callback)
              if(isPush) return;
            }
            //device 일 경우 phone에서 uuid를 얻어오는 부분 end

            resolve(res) //리턴
          }

          if (false && afc.isIE && location.hostname === "localhost") {
            var token = {
                "user_id"  : window.loginObj.user_id,
                "sesn_id"  : window.loginObj.sesn_id
            };
            window.localStorage.setItem('token', JSON.stringify(token))
            // window.localStorage.setItem('langKind', state.langKind)                        
            window.localStorage.setItem('loginType', 2);

            excuteLogin();
          // local이 아닌 경우
          } else {
            var autoLogin = false;
            if(state.autoLogin){
              autoLogin = state.autoLogin;
            }
            afterLogin({
              userId: res.user_id,
              sessionId: res.sesn_id,
              autoKey: res.auto_key,
              autoLogin: autoLogin.toString(),
              langKind: state.langKind
            }).then(res => {
              console.log('afterLogin success::res ==>',res)
              console.log('afterLogin success::res.body ==>',res.body)
              excuteLogin();
            });
          }
        }
      )
    }) //promise
  },
  //로그아웃
  logout: ({ commit, state, dispatch }, param) => {   
    if(!param){
        param = {};
    }
    // TR : ASIS : ac111, kv6140 -> TOBE : AC131
    return new Promise((resolve, reject) => {
      if (state.token === null) {
        console.log('user_id or sesn_id state is null')
        //logout처리
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user_id')
        window.localStorage.setItem('loginType', 0);
        commit('setToken', null)
        commit('setUserId', null)
        commit('setSesnId', null)
        commit('setAutoOrdTerms', null)
        commit('setMySymbolList', null)
      } else {
        let tokenData = JSON.parse(state.token)

        //let tokenData = JSON.parse(state.token)
        console.log('logout input sesn_id:' + tokenData.sesn_id)
        Vue.prototype.$socket.sendProcessByName('ac131',
          queryData => {
            let block = queryData.getBlockData('InBlock1')[0]
            block['user_id'] = tokenData.user_id
            block['sesn_id'] = tokenData.sesn_id
          },
          queryData => {
            // logout처리
            window.loginObj = {}

            // local일 경우 임의처리
            //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {
            //if(afc.isDevice){
            //if(false){
            if (false && afc.isIE && location.hostname === "localhost") {
              window.localStorage.removeItem('token')
              window.localStorage.removeItem('user_id')

              console.log(res)
              window.localStorage.removeItem('_login')
      
              window.localStorage.setItem('loginYN','N');
              
              commit('setToken', null)
              commit('setUserId', null)
              commit('setAutoOrdTerms', null)
              commit('setMySymbolList', null)
              commit('setAutoLogin', null)

              if (!queryData) console.log('logout 실패')

              // 로그아웃 되었습니다.    
              // alert(i18n.t('login.h012'));
                  
              Vue.prototype.$alert(i18n.t('login.h012'), '', {
                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                  callback: action => {

                      // mysecurity
                      
                      if(afc.isPC){
                          router.push({name: 'main'});
                      }else{
                          if(afc.isDevice){
                              router.push({name: 'mLogin'});
                          }else{
                              router.push({name: 'mMain'});
                          }
                      }

                      resolve(queryData);
                  }
              })
             
            // local이 아닌 경우
            } else {
              destroySession({
                userId: tokenData.user_id
              }).then((res) => {
                console.log(res)
                window.localStorage.removeItem('_login');
        
                window.localStorage.setItem('loginYN','N');
                
                commit('setToken', null);
                commit('setUserId', null);
                commit('setSesnId', null);
                commit('setAutoOrdTerms', null);
                commit('setMySymbolList', null);
                commit('setAutoLogin', null);

                if (!queryData) console.log('logout 실패');

                // 로그아웃 되었습니다
                // alert(i18n.t('login.h012'));

                if (param.pass) {
                  resolve(queryData);
                } else {
                  Vue.prototype.$alert(i18n.t('login.h012'), '', {
                    confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                    callback: action => {
                      if(afc.isDevice){
                          router.push({name: 'mLogin'});
                      } else {
                          router.push({path: '/'});
                      }
                      
                      // if(afc.isPC){
                      //     router.push({name: 'main'});
                      // }else{
                      //     if(afc.isDevice){
                      //         router.push({name: 'mLogin'});
                      //     }else{
                      //         router.push({name: 'mMain'});
                      //     }
                      // }

                      resolve(queryData);
                    }
                  })
                }
              });
            }
            
            window.localStorage.removeItem('_login');
            window.localStorage.setItem('loginYN','N');
            
            commit('setToken', null);
            commit('setUserId', null);
            commit('setSesnId', null);
            commit('setAutoOrdTerms', null);
            commit('setMySymbolList', null);
            commit('setAutoLogin', null);

            if (!queryData) console.log('logout 실패');

            // if(state.logoutAlert == "on"){
            //     // 로그아웃 되었습니다.    
            //     alert(i18n.t('login.h012'));
            //     state.logutAlert = '';

            //     if(afc.isPC){
            //         router.push({name: 'main'});
            //     }else{
            //         if(afc.isDevice){
            //             router.push({name: 'mLogin'});
            //         }else{
            //             router.push({name: 'mMain'});
            //         }
            //     }
            // }

            // state.logutAlert = '';

            resolve(queryData);
          }
        )
      }
    }) //promise
  },
  //회원가입요청처리
  registrationDemand: ({ commit, state }, payload) => {
      // TR : TOBE : AC133
      return new Promise((resolve, reject) => {
          //promise 라서 화면에서 입력한 데이터 payload 로 들고옴
          let registrationObj = payload['registration']
          let mobileVertificationObj = payload['mobileVertification']
          let encPassword = new UnikeyAIR().sha256AndBase64(registrationObj.iput_pass)
          console.log('---------------------------------')
          console.log('user_mail:' + registrationObj.user_mail)
          console.log('iput_pass:' + encPassword)
          console.log('use_terms:' + (registrationObj.use_terms ? '1' : '0'))
          console.log('prv_info_proc:' + (registrationObj.prv_info_proc ? '1' : '0'))
          console.log('event_noti:' + (registrationObj.event_noti ? '1' : '0'))
          console.log('auth_ci:' + mobileVertificationObj.auth_ci)
          console.log('auth_di:' + mobileVertificationObj.auth_di)
          console.log('auth_mobl_no:' + mobileVertificationObj.auth_mobl_no)
          console.log('mobl_corp:' + mobileVertificationObj.mobl_corp)
          console.log('user_nm:' + mobileVertificationObj.user_nm)
          console.log('user_brth_day:' + mobileVertificationObj.user_brth_day)
          console.log('user_gend:' + mobileVertificationObj.user_gend)
          console.log('user_forn_tp:' + mobileVertificationObj.user_forn_tp)
          console.log('---------------------------------')

          Vue.prototype.$socket.sendProcessByName('ac133',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_mail'] = registrationObj.user_mail
                  block['iput_pass'] = encPassword
                  block['use_terms'] = registrationObj.use_terms ? '1' : '0'
                  block['prv_info_proc'] = registrationObj.prv_info_proc ? '1' : '0'
                  block['event_noti'] = registrationObj.event_noti ? '1' : '0'
                  block['auth_ci'] = mobileVertificationObj.auth_ci
                  block['auth_di'] = mobileVertificationObj.auth_di
                  block['auth_mobl_no'] = mobileVertificationObj.auth_mobl_no
                  block['mobl_corp'] = mobileVertificationObj.mobl_corp
                  block['user_nm'] = mobileVertificationObj.user_nm
                  block['user_brth_day'] = mobileVertificationObj.user_brth_day
                  block['user_gend'] = mobileVertificationObj.user_gend
                  block['user_forn_tp'] = mobileVertificationObj.user_forn_tp
                  block['lang_kind'] = state.langKind
              },
              queryData => {
                  if (!queryData) {
                      console.log('registration 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac133' && errorData.errCode == '40095'){
                              errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5, errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5).length -1)
                              var vali_dtm = errorData.errMsg.substr(errorData.errMsg.indexOf("유효시간:")+5)
                              vali_dtm = vali_dtm.substr(0, vali_dtm.length -1)
                              
                              // alert(i18n.t('signup.d026', [registrationObj.user_mail, vali_dtm]));

                              Vue.prototype.$alert(i18n.t('signup.d026', [registrationObj.user_mail, vali_dtm]), '', {
                                  dangerouslyUseHTMLString: true,
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                      reject(errorData);
                                  }
                              })
                          }else{
                              // alert(errorData.errMsg);
                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                      reject(errorData);
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  //prelogin 후 로그인시 헤더값에 채우기 위한 아이디
                  //if (afc.isDevice || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("192.168.1.") >= 0 || location.hostname.indexOf("local") >= 0) {
                  //if(afc.isDevice){
                  //if(false){
                  if (false && afc.isIE && location.hostname === "localhost") {
                      // window.localStorage.setItem('token', res.user_id)
                      window.localStorage.setItem('user_id', res.user_id)
                  }
                  commit('setNewGoogleOtp', {user_id: res.user_id, iput_otp: ''})
                  window.loginObj['user_id'] = res.user_id
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  // 회원가입(인증 이메일 발송)
  registration: ({ commit, state, dispatch }, payload) => {
      // TR : TOBE : AC138
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac138',
              queryData => {
                  console.log('ac138 input auth_di:' + payload)
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['auth_di'] = payload
                  block['lang_kind'] = state.langKind
              },
              queryData => {
                  if (!queryData) {
                      console.log('registration email send 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac138') {
                              // alert(errorData.errMsg)
                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }

                  //완료화면에서 이메일
                  state.registered.user_mail = state.registration.user_mail

                  //회원가입 관련 상태 초기화
                  dispatch('resetRegistration')
                  dispatch('resetMobileVertification')
                  commit('setNewSecurePin', null)
                  commit('setNewGoogleOtp', null)

                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  // 구글 OTP정보등록신청
  otpInfomCall: ({ commit, state }, payload) => {
      //TR : AC107
      return new Promise((resolve, reject) => {
          console.log('otpInfomCall user_id:' + state.newGoogleOtp.user_id)
          Vue.prototype.$socket.sendProcessByName('ac107',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = state.newGoogleOtp.user_id
                  //block['otp_tp'] = '2'
              },
              queryData => {
                  if (!queryData) {
                      console.log('otpInfomCall 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac107') {
                              // alert(errorData.errMsg)
                              
                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }

                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  // 구글 OTP정보등록확인
  otpInfoSave: ({ commit, state }, payload) => {
      //TR : AC108
      return new Promise((resolve, reject) => {
          console.log('otpInfoSave user_id:' + state.newGoogleOtp.user_id)
          console.log('otpInfoSave iput_otp:' + payload['iput_otp'])

          Vue.prototype.$socket.sendProcessByName('ac108',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = state.newGoogleOtp.user_id
                  block['iput_otp'] = payload['iput_otp']
              },
              queryData => {
                  if (!queryData) {
                      console.log('otpInfoSave 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)

                          if (errorData.trName === 'ac108') {
                              // alert(errorData.errMsg);
                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }

                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  // 보안비밀번호 등록
  newSecurePin: ({ commit, state }, payload) => {
      // TR : TOBE : AC118
      return new Promise((resolve, reject) => {
          let newSecurePinObj = payload['newSecurePin']
          let encPassword = new UnikeyAIR().sha256AndBase64(newSecurePinObj.secu_pass)
          console.log('ac118 input user_id:' + newSecurePinObj.user_id)
          console.log('ac118 input secu_pass:' + encPassword)
          Vue.prototype.$socket.sendProcessByName('ac118',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = newSecurePinObj.user_id
                  block['secu_pass'] = encPassword
              },
              queryData => {
                  if (!queryData) {
                      console.log('newSecurePin 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac118') {
                              // alert(errorData.errMsg)

                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //로그인 비밀번호 변경
  passwordchange: ({ commit, state }, payload) => {

      // TR : AC105
      return new Promise((resolve, reject) => {
          let encPasswordNow = payload['user_pass_now']
          let encPasswordNew = payload['user_pass_new']

          Vue.prototype.$socket.sendProcessByName('ac105',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = payload['user_id']
                  block['user_pass_now'] = encPasswordNow
                  block['user_pass_new'] = encPasswordNew
                  state.login.pwd = encPasswordNew
              },
              queryData => {
                  if (!queryData) {
                      console.log('passwordchange 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac105') //alert(errorData.errMsg)
                          reject(errorData)
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //휴대폰번호 변경
  editMobileVertification: ({ commit, state }, payload) => {
      // TR : TOBE : AC145
      return new Promise((resolve, reject) => {
          //promise 라서 화면에서 입력한 데이터 payload 로 들고옴
          let mobileVertificationObj = payload['mobileVertification']
          console.log('---------------------------------')
          console.log('user_id:' + payload['user_id'])
          console.log('auth_di:' + mobileVertificationObj.auth_di)
          console.log('af_auth_mobl_no:' + mobileVertificationObj.auth_mobl_no)
          console.log('mobl_corp:' + mobileVertificationObj.mobl_corp)
          console.log('user_nm:' + mobileVertificationObj.user_nm)
          console.log('user_brth_day:' + mobileVertificationObj.user_brth_day)
          console.log('user_gend:' + mobileVertificationObj.user_gend)
          console.log('user_forn_tp:' + mobileVertificationObj.user_forn_tp)
          console.log('---------------------------------')

          Vue.prototype.$socket.sendProcessByName('ac145',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = payload['user_id']
                  block['auth_di'] = mobileVertificationObj.auth_di
                  block['af_auth_mobl_no'] = mobileVertificationObj.auth_mobl_no
                  block['mobl_corp'] = mobileVertificationObj.mobl_corp
                  block['user_nm'] = mobileVertificationObj.user_nm
                  block['user_brth_day'] = mobileVertificationObj.user_brth_day
                  block['user_gend'] = mobileVertificationObj.user_gend
                  block['user_forn_tp'] = mobileVertificationObj.user_forn_tp
              },
              queryData => {
                  if (!queryData) {
                      console.log('editMobileVertification 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac145') {
                              reject(errorData)
                              //alert(errorData.errMsg);
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  resolve(res)
              }
          )
      }) //promise
  },
  //아이디찾기
  accountFind: ({ commit, state }, payload) => {
      // TR : AC516
      return new Promise((resolve, reject) => {
          console.log(state.accountFind.auth_di)
          Vue.prototype.$socket.sendProcessByName('ac516',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['auth_di'] = state.accountFind.auth_di
              },
              queryData => {
                  if (!queryData) {
                      console.log('accountFind 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac516') {
                              if(errorData.errCode == '40312'){
                                  // 일치하는 회원정보가 없습니다.
                                  // alert(i18n.t('login.h013'))
                                  
                                  Vue.prototype.$alert(i18n.t('login.h013'), '', {
                                      confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                      callback: action => {
                                          
                                      }
                                  })
                              }else{
                                  // alert(errorData.errMsg)

                                  Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                      confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                      callback: action => {
                                          
                                      }
                                  })
                              }
                          } 
                      }
                      /** error 처리 E **/
                      return
                  }

                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //비밀번호찾기 : 임시비밀번호발급
  passwordFind: ({ commit, state }, payload) => {
      // TR : AC114
      return new Promise((resolve, reject) => {
          // console.log(state.passwordFind.user_mail)
          Vue.prototype.$socket.sendProcessByName('ac114',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_mail'] = payload['user_mail']//state.passwordFind.user_mail
                  block['auth_di'] = payload['auth_di']
              },
              queryData => {
                  if (!queryData) {
                      console.log('passwordfind 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac114') reject(errorData) //alert(errorData.errMsg)
                      }
                      /** error 처리 E **/
                      return
                  }

                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(JSON.stringify(res))
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //새 비밀번호 등록(비밀번호 초기화)
  newPassword: ({ commit, state }, payload) => {
      // TR : AC127
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac127',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_mail'] = payload['user_mail']
                  block['iput_pass'] = payload['iput_pass']
                  block['user_id'] = payload['user_id']
                  block['auth_otp_no'] = payload['auth_otp_no']
              },
              queryData => {
                  if (!queryData) {
                      console.log('newPassword 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac127') {
                              // alert(errorData.errMsg)
                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
              }
          )
      }) //promise
  },
  //계좌만들기 시도시 
  getUserIdForAccCreation: ({ commit, state }, payload) => {
    // TR : AC519
    return new Promise((resolve, reject) => {
        console.log('getUserIdForAccCreation user_id:' + payload['auth_ci'])
        Vue.prototype.$socket.sendProcessByName('ac519',
            queryData => {
                let block = queryData.getBlockData('InBlock1')[0]
                block['auth_ci'] = payload['auth_ci']
            },
            queryData => {
                if (!queryData) {
                    console.log('계좌만들기용 ID 조회 실패')
                    return
                }
                let res = queryData.getBlockData('OutBlock1')[0]
                console.log(res)

                //계좌만들기 상태세팅
                state.userAccCreationInfo = res

                resolve(res) //리턴
            }
        )
    }) //promise
  },
  //마이페이지 > 회원정보 조회
  myInfo: ({ commit, state }, payload) => {
    // TR : AC503 -> ac506
    return new Promise((resolve, reject) => {
        console.log('mypage input user_id:' + payload['user_id'])
        Vue.prototype.$socket.sendProcessByName('ac506',
            queryData => {
                let block = queryData.getBlockData('InBlock1')[0]
                block['user_id'] = payload['user_id']
            },
            queryData => {
                if (!queryData) {
                    console.log('myInfo 실패')
                    return
                }
                let res = queryData.getBlockData('OutBlock1')[0]
                console.log(res)

                //마이페이지 상태세팅
                state.mypage = res

                resolve(res) //리턴
            }
        )
    }) //promise
  },
  //마이페이지 > 회원정보 조회
  myInfo2: ({ commit, state }, payload) => {
      // TR : AC503
      return new Promise((resolve, reject) => {
          console.log('mypage input user_id:' + payload['user_id'])
          Vue.prototype.$socket.sendProcessByName('ac503',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = payload['user_id']
              },
              queryData => {
                  if (!queryData) {
                      console.log('myInfo 실패')
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(res)

                  //마이페이지 상태세팅
                  state.mypage = res

                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //회원탈퇴 sms발송요청
  sendSmsCert: ({commit,state,getters},payload) => {
      // TR : AC166
      return new Promise((resolve, reject) => {
          console.log('sendSmsCert input user_id:' + getters.getUserId)
          Vue.prototype.$socket.sendProcessByName('ac166',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = getters.getUserId
                  block['auth_kind'] = payload['auth_kind']// 01:회원탈퇴 02:API KEY 발급신청\
              },
              queryData => {
                  if (!queryData) {
                      console.log('sendSmsCert 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac166') {
                              // alert(errorData.errMsg)

                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(res)
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //회원탈퇴 sms확인
  sendSmsCertConfirm: ({commit,state,getters},payload) => {
      // TR : ac167
      return new Promise((resolve, reject) => {
          console.log('sendSmsCert input user_id:' + getters.getUserId)
          Vue.prototype.$socket.sendProcessByName('ac167',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = getters.getUserId
                  block['auth_kind'] = '01'
                  block['auth_no'] = payload['sms_auth_no']
              },
              queryData => {
                  if (!queryData) {
                      console.log('sendSmsCertConfirm 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac167') reject(errorData) // alert(errorData.errMsg)
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(res)
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  //마이페이지 > 회원탈퇴
  unregistration: ({ commit, state, getters }, payload) => {
    // TR : AC126
    return new Promise((resolve, reject) => {
      console.log('unregistration input user_id:' + getters.getUserId)
      Vue.prototype.$socket.sendProcessByName('ac126',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_id'] = getters.getUserId
          block['pri_info_yn'] = payload.pri_info_yn
        },
        queryData => {
          if (!queryData) {
            console.log('unregistration 실패')
            /** error 처리 S **/
            let errorData = window.sessionStorage.getItem('lastErrorData')
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac126') {
                // alert(errorData.errMsg)
                Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                })
              }
            }
            /** error 처리 E **/
            return
          }
          let res = queryData.getBlockData('OutBlock1')[0]
          console.log(res)
          resolve(res) //리턴
        }
      )
    }) //promise
  },
  //인증 초기화
  securityReset: ({commit,state},payload) => {
      // TR : AC112
      return new Promise((resolve, reject) => {
          //인증종류 char(2) : 21.보안번호, 23.OTP
          if(payload['auth_kind'] === '1'){//보안비밀번호
              payload['auth_kind'] = '21'
          }
          if(payload['auth_kind'] === '3'){//OTP
              payload['auth_kind'] = '23'
          }
          console.log('securityReset input user_id:' + payload['user_id'])
          console.log('securityReset input auth_kind:' + payload['auth_kind'])
          Vue.prototype.$socket.sendProcessByName('ac112',
              queryData => {
                  let block = queryData.getBlockData('InBlock1')[0]
                  block['user_id'] = payload['user_id']
                  block['auth_kind'] = payload['auth_kind']
              },
              queryData => {
                  if (!queryData) {
                      console.log('securityReset 실패')
                      /** error 처리 S **/
                      let errorData = window.sessionStorage.getItem('lastErrorData')
                      if (errorData !== null) {
                          errorData = JSON.parse(errorData)
                          if (errorData.trName === 'ac112') {
                              // alert(errorData.errMsg)

                              Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
                                  confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
                                  callback: action => {
                                      
                                  }
                              })
                          }
                      }
                      /** error 처리 E **/
                      return
                  }
                  let res = queryData.getBlockData('OutBlock1')[0]
                  console.log(res)
                  resolve(res) //리턴
              }
          )
      }) //promise
  },
  resetRegistration({ commit }) {
      commit('setRegistration', {
          // 회원가입 프로세스시 사용
          user_mail: '',
          iput_pass: '',
          iput_pass2: '',
          use_terms: false,
          prv_info_proc: false,
          event_noti: false,
          mobileVerified: false,
          secured: false
      })
  },
  //휴대폰인증정보 초기화
  resetMobileVertification({ commit }) {
      commit('setMobileVertification', {
          auth_ci: '',
          auth_di: '',
          auth_mobl_no: '',
          mobl_corp: '',
          user_nm: '',
          user_brth_day: '',
          user_gend: '',
          user_forn_tp: ''
      })
  },
  fetchLoginHistory({ commit, getters }) {
      // ac520 로그인 내역 조회
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac520', (queryData) => {
              let ib = queryData.getBlockData('InBlock1')[0]
              ib['user_id'] = getters.getUserId
              ib['req_cnt'] = '30'
          }, (queryData) => {
              if (!queryData) {
                  console.log('로그인 내역 조회 실패')
                  return
              }
              let res = queryData.getBlockData('OutBlock2')
              commit('setLoginHistory', res)
              resolve(res)
          })
      })
  },
  bookmarkSymbol({ commit, getters }, payload) {
      // 관심종목 북마크 추가/삭제
      // TR : d0004
      return new Promise((resolve, reject) => {

          Vue.prototype.$socket.sendProcessByName('d0004', (queryData) => {

              let ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['account_id'] = getters.getUserId
              ib1['grp_no'] = 0
              ib1['in_cnt'] = 1

              let ib2 = queryData.getBlockData('InBlock2')
              ib2.push({
                  symbol: payload['symbol'],
                  blnk_memo_yn: 1,
                  bmrk_yn: 1,
                  save_del_div: payload['flag']
              })

          }, (queryData) => {
              if (!queryData) {
                  console.log('즐겨찾기 추가/삭제 실패')
                  return
              }
              var array = []

              for (var data of queryData.getBlockData('OutBlock2')) {
                  array.push({ symbol : data['symbol'] })
              }
              commit('setMySymbolList', array)
          })
      })
  },
  fetchBookmarkedSymbols({ commit, getters }) {
      // 관심종목 북마크 목록
      // TR : d0003
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('d0003', (queryData) => {
              let ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['account_id'] = getters.getUserId
              ib1['grp_no'] = 0

          }, (queryData) => {
              if (!queryData) {
                  console.log('즐겨찾기 목록 조회 실패')
                  return
              }
              var array = []
              for (var data of queryData.getBlockData('OutBlock2')) {
                  array.push({ symbol : data['symbol'] })
              }
              commit('setMySymbolList', array)
          })
      })
  },
  fetchBookmarkList({ commit, getters }) {
      // 관심종목 북마크 종목 시세
      // TR : i0018

      if (getters.mySymbols.length < 1) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('i0018', (queryData) => {
              let ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['symbolcnt'] = getters.mySymbols.length.toString()
              ib1['qry_div'] = '4'
              ib1['paycurrcode'] = '99999'
              ib1['excode'] = '001'

              let ib2 = queryData.getBlockData('InBlock2')                
              ib2.push.apply(ib2, getters.mySymbols)
          }, (queryData) => {
              if (!queryData) {
                  console.log('관심종목 북마크 종목 시세 조회 실패')
                  return
              }
              let res = queryData.getBlockData('OutBlock2')
              commit('setBookmarkList', res)
              resolve(res)
          })
      })
  },
  fetchAssetChange: ({commit, rootGetters}, payload) => {
      // 잔고변동
      // TR : RB02
      
      const user_id = rootGetters.getUserId;
      Vue.prototype.$socket.unregisterReal('RB02', [user_id], 'user');
      Vue.prototype.$socket.registerReal('RB02',  'key_user_id', [user_id], 'user', (queryData) => {
          const resObj = queryData.getBlockData('OutBlock1')[0];

          if (typeof payload['callback'] == 'function') payload['callback'](resObj); 
      })
  },
  fetchNotiSetting({commit, getters}) {
      // 공통설정(알림정보)조회
      // TR : ac505

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac505', (queryData) => {
              let ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
          }, (queryData) => {
              if (!queryData) {
                  console.log('공통설정(알림정보)조회 실패')
                  return
              }
              let res =  queryData.getBlockData('OutBlock1')[0]
              commit('setNoti', res)
              resolve(res)
          })
      })
  },
  updateNotiSetting({commit, getters}, params) {
      // 공통설정_알림정보 변경
      // TR : ac104

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac104', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1 = Object.assign(ib1, params)
          }, (queryData) => {
              if (!queryData) {
                  console.log('공통설정_알림정보 변경 실패')
                  return
              }
              let res =  queryData.getBlockData('OutBlock1')[0]
              commit('setNoti', params)
          })
      })
  },
  requestSmsCodeForAPIKey({ getters }) {
      // API 이용 SMS발송요청 : ac166

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac166', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1['auth_kind'] = '02'
          }, (queryData) => {
              if (!queryData) {
                  console.log('API 이용 SMS발송요청 실패')
                  return
              }
              let res = queryData.getBlockData('OutBlock1')[0]
              resolve(res)
          })
      })
  },
  verifySmsCodeForAPIKey({ getters }, params) {
      // API 이용 SMS확인 : ac167

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac167', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1['auth_kind'] = '02'
              ib1['auth_no'] = params['auth_no']
          }, (queryData) => {
              if (!queryData) {
                  console.log('API 이용 SMS확인 실패')
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'ac167') {
                          reject(errorData);
                      }
                  }
                  return
              }
              let res = queryData.getBlockData('OutBlock1')[0]
              resolve(res)
          })
      })
  },
  applyRestAPIKey({ getters }, params) {
      // api키 발급 : ac161

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac161', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1['use_terms'] = 'Y'
              ib1 = Object.assign(ib1, params)
          }, (queryData) => {
              if (!queryData) {
                  console.log('api키 발급 실패')
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'ac161') {
                          reject(errorData);
                      }
                  }
                  return
              }
              let res = queryData.getBlockData('OutBlock1')[0]
              resolve(res)
          })
      })
  },
  closeRestAPIKey({ getters }, params) {
      // API KEY 삭제처리 : ac163

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac163', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1['connect_key'] = params['connect_key']
          }, (queryData) => {
              if (!queryData) {
                  console.log('API KEY 삭제처리 실패')
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'ac163') {
                          reject(errorData);
                      }
                  }
                  return
              }
              let res = queryData.getBlockData('OutBlock1')[0]
              resolve(res)
          })
      })
  },
  fetchRestAPIKeys({ getters }) {
      // API KEY List 조회 : ac531

      if (!getters.getUserId) { return }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac531', (queryData) => {
              var ib1 = queryData.getBlockData('InBlock1')[0]
              ib1['user_id'] = getters.getUserId
              ib1['req_cnt'] = '30'
          }, (queryData) => {
              if (!queryData) {
                  console.log('API KEY List 조회 실패')
                  return
              }
              let list = queryData.getBlockData('OutBlock2')
              resolve(list)
          })
      })
  },
  setNotiSetting({getters, dispatch}, payload) {
      // 알림설정 ( (지정가/등락/거래량)조건 설정or삭제 )

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('f0020', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]
              block['UserID'] = getters.getUserId
              block = Object.assign(block, payload)
              console.log("f0020_input:"+JSON.stringify(block))          
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림설정(f0020) 처리 실패')
                  /** error 처리 S **/
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'f0020') // alert(errorData.errMsg)
                      reject(errorData)
                  }
                  /** error 처리 E **/
                  return
              }

              resolve(queryData.getBlockData('OutBlock1')[0])
          })
      })
  },
  
  reqNotiPush({getters, dispatch}, payload) {
      //약관동의/해지/정보갱신

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('f0001', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]     
              // block['id'] = getters.getUserId        
              // block['op_gb'] = payload['op_gb']
              // block['date'] = payload['date']
              // block['time'] = payload['time']
              // block['os_div'] = payload['os_div']  
              // block['dev_ihrt_value'] = payload['dev_ihrt_value']              
              block = Object.assign(block, payload)
              console.log("f0001_input:"+JSON.stringify(block))           
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림 push 등록 (f0001) 처리 실패')
                  /** error 처리 S **/
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'f0001') // alert(errorData.errMsg)
                      reject(errorData)
                  }
                  /** error 처리 E **/
                  return
              }
          })
      })
  },
  getNotiSettingList({getters, commit}) { 
      // 알림설정 목록 조회
      
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('f0021', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]
              block['UserID'] = getters.getUserId
              block['MFlag'] = (afc.isDevice)? 'M' : 'W';   // 조회구분 1 'M':MTS 조회 'W':WTS 조회          
              console.log("f0021_input:"+JSON.stringify(block))          
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림설정 목록 조회(f0021) 처리 실패')
                  /** error 처리 S **/
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'f0021') // alert(errorData.errMsg)
                      reject(errorData)
                  }
                  /** error 처리 E **/
                  return
              }
              commit("setNotiSettingList", queryData.getBlockData('OutBlock2'))
              resolve(queryData.getBlockData('OutBlock2'))
          })
      })
  },
  fetchNotiSettingHistory({ getters, commit}, param) {
      // 알림 내역 조회 (f0022)

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('f0022', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]
              block['UserID'] = getters.getUserId
              block['JobFlag'] = param && param['Code'] ? 'C' : 'A'
              block['Code'] = param && param['Code'] ? param['Code'] : null
              block['NextFlag'] = param && param['NextKey'] ? 'N' : 'F'
              block['NextKey'] = param && param['NextKey'] ? param['NextKey'] : '99999999999999'
              console.log("f0022_input:"+JSON.stringify(block))      
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림 내역 조회 (f0022) 처리 실패')
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'f0022')
                      reject(errorData)
                  }
                  return
              }
              let res = queryData.getBlockData('OutBlock1')[0]
              let list = queryData.getBlockData('OutBlock2')
              resolve({ res, list })
          })
      })
  },
  setLangKind({getters, commit}, payload) { 
      // 사용자 언어 설정
      
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac169', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]
              block['user_id'] = payload['user_id'] ? payload['user_id'] : getters.getUserId
              block['lang_kind'] = payload['lang_kind']
              console.log('ac169_input:' + JSON.stringify(block))
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림설정 목록 조회(ac169) 처리 실패')
                  /** error 처리 S **/
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'ac169') // alert(errorData.errMsg)
                      reject(errorData)
                  }
                  /** error 처리 E **/
                  return
              }
              
              commit("setLangKind", payload['lang_kind'])
              updateSession({
                  userId: payload['user_id'] ? payload['user_id'] : getters.getUserId,
                  langKind: payload['lang_kind']
              }).then(obj => {
                  console.log(obj)
              });
              resolve(queryData.getBlockData('OutBlock1')[0])
          })
      })
  },
  setLangKind({getters, commit}, payload) { 
      // 사용자 언어 설정
      
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('ac169', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0]
              block['user_id'] = payload['user_id'] ? payload['user_id'] : getters.getUserId
              block['lang_kind'] = payload['lang_kind']
          }, (queryData) => {
              if (!queryData) {
                  console.log('알림설정 목록 조회(ac169) 처리 실패')
                  /** error 처리 S **/
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if (errorData !== null) {
                      errorData = JSON.parse(errorData)
                      if (errorData.trName === 'ac169') // alert(errorData.errMsg)
                      reject(errorData)
                  }
                  /** error 처리 E **/
                  return
              }
              
              commit("setLangKind", payload['lang_kind'])
              updateSession({
                  userId: payload['user_id'] ? payload['user_id'] : getters.getUserId,
                  langKind: payload['lang_kind']
              }).then(obj => {
                  console.log(obj)
              });
              resolve(queryData.getBlockData('OutBlock1')[0])
          })
      })
  },
  //계정 잠금(휴면상태 전환)
  getDormancyInfo: ({ commit, rootState, state }) => { 
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName('ac536', (queryData) => {
        var block = queryData.getBlockData('InBlock1')[0]
        block['user_id'] = state.user.login.user_id;
      }, (queryData) => {
        if (queryData) {
          resolve(queryData.getBlockData('OutBlock1')[0]);
        } else {
          const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
          if (errorData.trName == "ac536") {
            Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
              confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
              callback: function() {
                reject(errorData);
              }
            });
          }
        }
      })
    })
  },
  // 휴면계정 해지
  requestDormancy: ({ commit, rootState, state }, payload) => { 
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName('ac172', (queryData) => {
        var block = queryData.getBlockData('InBlock1')[0]
        block['user_id'] = state.user.login.user_id;
        block['auth_di'] = payload['auth_di'];
      }, (queryData) => {
        if (queryData) {
          resolve(queryData.getBlockData('OutBlock1')[0]);
        } else {
          const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
          if (errorData.trName == "ac172") {
            Vue.prototype.$alert(i18n.t('sys_err.' + errorData.errCode), '', {
              confirmButtonText: i18n.t('sys_err.a001'), /*확인*/
              callback: function() {
                reject(errorData);
              }
            });
          }
        }
      })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
