Synergistic Management Solutions Inc

Product Owner: Scott Schwartz
Scrum Master: Diandra Ryan-Mas
Development Team: Diana Lee, Kang Lee, Nick Poling 

HTTP ENDPOINTS

*already built* 

POST: /signup
data from client: {
	username:
	password:
}
reply from server: {
	username:
	password:
	_id:
}

POST: /signin
data from client: {
	username:
	password:
}
reply from server: {
	username:
	password:
	_id:
}

*intended*

GET: /users/+username+
note: when you go to your own profile page
reply from server: {
	username:
	profile: {
		email:
		about:
		interests:
	} 
}

GET: /users
note: when you go to the listing for other users
reply from server: {
	users: [{
		username:
		profile: {
			email:
			about:
			interests:
		} 
	},
	etc.		
	]
}