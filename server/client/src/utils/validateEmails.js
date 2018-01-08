// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default(recipients) => {
	const invalidEmails = recipients
								  .split(',')
								  .map(email => email.trim())
								  .filter(email => !re.test(email));

	if(invalidEmails[invalidEmails.length-1] === "" || 
		recipients.substr(recipients.length-1) === ",") {

		return `Please do not submit trailing commas in your Recipient List`;

	}	

	if(invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;

};