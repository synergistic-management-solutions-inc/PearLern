Synergistic Management Solutions Inc

Product Owner: Scott Schwartz
Scrum Master: Diandra Ryan-Mas
Development Team: Diana Lee, Kang Lee, Nick Poling 


HTTP ENDPOINTS

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

GET: /users/+username+
note: when you go to your own profile page
reply from server: {
	email:
	about:
	interests: []
} 

GET: /users
note: when you go to the listing for other users
reply from server: {
	users: [{
		username:
		email:
		about:
		interests: []
	},
	etc.		
	]
}

POST: /users/+username+
note: for submitting profile info
			If the user hasn't filled out a field, send an empty string. If you leave
			off the key all together, my code will most definitely break 
data from client: {
	email:
	about:
	interests: []
}

reply from server: {
	email:
	about:
	interests: []
}