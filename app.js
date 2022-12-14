var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {
			username: "",
			email: "",
			mobile: ""
		},
		clickedUser: {},
	},

	mounted: function () {
		console.log("mounted");
		this.getAllUsers();
	},

	methods: {
		getAllUsers: function () {
			axios.get("http://localhost/vuephp/api.php?action=read")
				.then(function (response) {
					if (response.data.error) {
						app.errorMessage = response.data.error;
					} else {
						app.users = response.data.users;
					}
				});
		},
		saveUser: function () {
			var formData = app.toFormData(app.newUser);
			app.newUser = {
				username: "",
				email: "",
				mobile: ""
			},
				axios.post("http://localhost/vuephp/api.php?action=create", formData)
					.then(function (response) {
						if (response.data.error) {
							app.errorMessage = response.data.error;
						} else {
							app.getAllUsers();
							app.successMessage = response.data.message;
						}
					});
		},
		selectUser(user) {
			app.clickedUser = user;
		},
		updateUser: function () {
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuephp/api.php?action=update", formData)
				.then(function (response) {
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.error;
					} else {
						app.getAllUsers();
						app.successMessage = response.data.message;
					}
				});
		},
		deleteUser: function () {
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuephp/api.php?action=delete", formData)
				.then(function (response) {
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.error;
					} else {
						app.getAllUsers();
						app.successMessage = response.data.message;
					}
				});
		},
		toFormData: function (obj) {
			var form_data = new FormData();
			for (var key in obj) {
				form_data.append(key, obj[key]);
			}
			return form_data;
		},
		clearMessage: function () {
			app.errorMessage = "";
			app.successMessage = "";
		}
	}
});