Template.header.events = {
	'click span#present_submit_dialog': function (event, template) {
		$('#submit_dialog').show();
	}
};

Template.submit_dialog.events = {
	'click div.submit': function (event, template) {
		Posts.insert({
			post_number: Posts.find().count() + 1,
			body: template.find('#submission_body').value,
			is_approved: false,
			was_liked_by: [],
			timestamp: (new Date()).toString().substring(0, 21),
			comments: [],
			content_warnings: []
		});

		$('#submit_dialog').hide();

		template.find('#submission_body').value = false;
	}
};

Template.post.events = {
	'click div.comment': function (event, template) {
		var new_comment = {
			body: template.find('.comment_input').value,
			timestamp: (new Date()).toString().substring(0, 21),
			user_id: Meteor.user()._id,
			username: Meteor.user().profile.name
		};

		Posts.update(this._id, {$push: {comments: new_comment}});

		template.find('.comment_input').value = '';
	}
};