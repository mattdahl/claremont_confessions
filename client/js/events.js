Template.header.events = {
	'click span#present_submit_dialog': function (event, template) {
		$('#submit_dialog').show();
	},
	'click span#latest': function (event, template) {
		Session.set('current_page', 'latest');
		$(template.find('#latest')).css('font-size', '22px');
		$(template.find('#top')).css('font-size', '18px');
		$(template.find('#starred')).css('font-size', '18px');
	},
	'click span#top': function (event, template) {
		Session.set('current_page', 'top');
		$(template.find('#latest')).css('font-size', '18px');
		$(template.find('#top')).css('font-size', '22px');
		$(template.find('#starred')).css('font-size', '18px');
	},
	'click span#starred': function (event, template) {
		Session.set('current_page', 'starred');
		$(template.find('#latest')).css('font-size', '18px');
		$(template.find('#top')).css('font-size', '18px');
		$(template.find('#starred')).css('font-size', '22px');
	}
};

Template.submit_dialog.events = {
	'click div.submit': function (event, template) {
		Posts.insert({
			post_number: Posts.find().count() + 1,
			body: template.find('#submission_body').value,
			is_approved: false,
			was_liked_by: [],
			likes: 0,
			timestamp: (new Date()).toString().substring(0, 21),
			comments: [],
			content_warnings: []
		});

		$('#submit_dialog').hide();

		template.find('#submission_body').value = '';
	}
};

Template.post.events = {
	'click div.like': function (event, template) {
		if (!_.contains(this.was_liked_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$push: {was_liked_by: Meteor.user()._id},
				$inc: {likes: 1}
			});
		}
	},
	'click div.unlike': function (event, template) {
		if (_.contains(this.was_liked_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$pull: {was_liked_by: Meteor.user()._id},
				$inc: {likes: -1}
			});
		}
	},
	'click div.comment': function (event, template) {
		if (!template.find('.comment_input').value.length) {
			alert('You must post a comment!');
			return false;
		}

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