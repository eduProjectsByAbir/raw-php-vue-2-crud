var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: []
	},

	mounted: function(){
		console.log("mounted");
	},

	methods: {

	}
});