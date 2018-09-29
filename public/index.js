const API_URL = "http://localhost:8888";

let ACCESS_TOKEN = undefined;
/* To run this file on a server, we are using httpster. 
Type `httpster index.html -p 5000` in your console to start the server. */

let webAuth = new auth0.WebAuth({
  domain: 'eisson.auth0.com',
  clientID: 'M66vAVLbBW0LfvI5CykQP95IdtH5p6f4',
  responseType: 'token',
  audience:'eisson-demo',
  scope: '',
  redirectUri: window.location.href
});

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
	fetch(`${API_URL}/resource`).then(resp => {
		return resp.text() ;
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

secretBtn.addEventListener("click", (event) => {
	let headers = {};
	if (ACCESS_TOKEN) {
		headers = {
			"Authorization": `Bearer ${ACCESS_TOKEN}`
		};
	}
	fetch(`${API_URL}/resource/secret`, { headers }).then(resp => {
		UIUpdate.updateCat(resp.status);
		return resp.text();
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

logoutBtn.addEventListener("click", (event) => {
	ACCESS_TOKEN = undefined;
	UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
	webAuth.authorize();
});

parseHash = () => {

  webAuth.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken) {
      window.location.hash = '';
      ACCESS_TOKEN = authResult.accessToken;
      UIUpdate.loggedIn();
    }
  });
};

window.addEventListener("DOMContentLoaded", parseHash);