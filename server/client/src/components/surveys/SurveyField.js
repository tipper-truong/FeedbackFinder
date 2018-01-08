// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label }) => {
	// {...input} == onBlur{input.OnBlur} onChange={input.onChange}
  	// Adds all the event listeners from props
  return (
    <div>
      <label>{label}</label>
      <input {...input}/>
    </div>
  );
};