import config from "../../containers/config";
export default class APIService {
    constructor() {
        this.domain = config.API_URL; // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    async login(username, password) {
        const grant_type = "password";
        const url = `${encodeURIComponent("grant_type")}=${encodeURIComponent(grant_type)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/token`, {
            method: 'POST',
            'Content-Type': 'application/x-www-form-urlencoded',
            body: url

        }).then(res => {
            this.setToken(res) // Setting the token in localStorage
            // console.log(res.access_token);
            return Promise.resolve(res);
        })
    }
   
    async signup(username, email, password, confirmPassword, pfPicture) {
        //const grant_type="password";
        let profilePicture = pfPicture.base64;
        //    await this.getBase64(pfPicture,(result) => {
        //         profilePicture = result;
        //    });
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/user/createuser`, {
            method: 'POST',

            body: JSON.stringify({

                username,
                email,
                password,
                profilePicture

            })
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        if (this.getToken()) {
            const token = this.getToken().access_token
            return !!token
        }
        // GEtting token from localstorage
        return false;
        // handwaiving here
    }

    isTokenExpired(token) {
        return true;
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', JSON.stringify(idToken))
    }

    getToken() {

        // Retrieves the user token from localStorage
        if (localStorage.length > 0) {
            return localStorage.getItem('id_token') ? JSON.parse(localStorage.getItem('id_token')) : localStorage.getItem('id_token');
        }
        return null;
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    async getProfile() {
        // Using jwt-decode npm package to decode the token
        // return decode(this.getToken());
        const userid = this.getToken().user_id;
        return this.fetch(`${this.domain}/user/getuser?userid=${encodeURIComponent(userid)}`, {
            method: 'GET'
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }
    async getpostProfile(userid) {
        // Using jwt-decode npm package to decode the token
        // return decode(this.getToken());
       
        return this.fetch(`${this.domain}/user/getuser?userid=${encodeURIComponent(userid)}`, {
            method: 'GET'
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'bearer ' + this.getToken().access_token
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    getUserFeed() {
        let userid = this.getToken().user_id;
        return this.fetch(`${this.domain}/post/GetPostList?userId=${encodeURIComponent(userid)}`, {
            method: 'GET'
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    async addUserPost(description, pfPicture) {

        let picture = pfPicture.base64;
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/post/UploadPost`, {
            method: 'POST',

            body: JSON.stringify({

                description,
                picture

            })
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })

    }

    async getFollowerList() {
        let userid = this.getToken().user_id;
        return this.fetch(`${this.domain}/user/GetFollowerList?userId=${encodeURIComponent(userid)}`, {
            method: 'GET'
        }).then(res => {
            console.log(res)
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }


    async unFollow(userId) {
        //  let userid=  this.getToken().user_id;
        return this.fetch(`${this.domain}/user/unfollow?userid=${encodeURIComponent(userId)}`, {
            method: 'GET'
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })

    }
    async Follow(userId) {
        //  let userid=  this.getToken().user_id;
        return this.fetch(`${this.domain}/user/follow?userid=${encodeURIComponent(userId)}`, {
            method: 'GET'
        }).then(res => {
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })

    }
    async SearchFriends(searchtext) {
        //  let userid=  this.getToken().user_id;
        return this.fetch(`${this.domain}/user/searchusersbytext?text=${encodeURIComponent(searchtext)}`, {
            method: 'GET'
        }).then(res => {
            console.log(res)
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })

    }
}
