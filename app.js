var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
	},

	mounted: function(){
		console.log("mounted");
		this.getAllUsers();
	},

	methods: {
		getAllUsers: function () {
			axios.get("http://localhost/vuephp/api.php?action=read")
				.then(function (response) {
					// console.log(response);
					if (response.data.error) {
						app.errorMessage = response.data.error;
					} else {
						app.users = response.data.users;
					}
				});
		}
	}
});